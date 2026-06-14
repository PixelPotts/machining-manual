export class ThreeDRenderer {
  constructor(container) {
    this.container = container;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.stockMesh = null;
    this.eventMarkers = [];
    this.fixtureMeshes = [];
    this.toolMesh = null;
    this.lastStock = null;
    this.lastEvents = [];
    
    // Animation system
    this.animation = {
      isPlaying: false,
      currentStep: 0,
      maxSteps: 0,
      speed: 1.0, // 1x speed
      lastUpdate: 0,
      toolPath: [],
      toolPositions: [],
      stockSnapshots: [],
      gcode: '',
      gcodeLines: [],
      currentLine: 0,
      originalStock: null, // Uncut stock state
      currentStockData: null, // Progressive cutting state
      geometryUpdateCounter: 0,
      updatesBetweenGeometry: 2 // Update geometry every N cutting steps for performance
    };
    
    this.init();
  }

  init() {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x080a0e);

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(5, 5, 5);

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // Controls setup
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 50;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    this.scene.add(directionalLight);

    // Grid helper - positioned at machine table level
    const gridHelper = new THREE.GridHelper(10, 20, 0x444444, 0x222222);
    gridHelper.position.y = -1.0; // Place at typical machine table level
    this.scene.add(gridHelper);

    // Debug hotkey setup (Ctrl+Shift+D)
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        this.generateDebugOutput();
      }
      // Animation controls
      if (e.key === ' ') { // Spacebar to play/pause
        e.preventDefault();
        this.toggleAnimation();
      }
      if (e.key === 'r' || e.key === 'R') { // R to reset
        this.resetAnimation();
      }
    });

    // Start render loop
    this.animate();

    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  createStockGeometry(stock) {
    if (!stock) return null;

    const geometry = new THREE.PlaneGeometry(
      stock.maxX - stock.minX,
      stock.maxY - stock.minY,
      stock.nx - 1,
      stock.ny - 1
    );

    // Update vertices based on height data
    const vertices = geometry.attributes.position.array;
    for (let i = 0; i < stock.ny; i++) {
      for (let j = 0; j < stock.nx; j++) {
        const heightIndex = i * stock.nx + j;
        const vertexIndex = (i * stock.nx + j) * 3 + 2; // Z component
        vertices[vertexIndex] = stock.heights[heightIndex] - stock.bottomZ;
      }
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();

    return geometry;
  }

  createStockMaterial() {
    return new THREE.MeshLambertMaterial({
      color: 0x8899bb,
      wireframe: false,
      side: THREE.DoubleSide
    });
  }

  createFixtureGeometry(fixture) {
    const width = fixture.maxX - fixture.minX;
    const depth = fixture.maxY - fixture.minY;  // Y becomes depth
    const height = fixture.maxZ - fixture.minZ; // Z becomes height
    
    const geometry = new THREE.BoxGeometry(width, depth, height);
    const material = new THREE.MeshLambertMaterial({
      color: 0xff6b35,
      transparent: true,
      opacity: 0.7
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      (fixture.minX + fixture.maxX) / 2,  // X position
      (fixture.minZ + fixture.maxZ) / 2,  // Z becomes Y (vertical)
      (fixture.minY + fixture.maxY) / 2   // Y becomes Z (depth)
    );
    
    return mesh;
  }

  createEventMarker(event) {
    const geometry = new THREE.SphereGeometry(0.05, 16, 12);
    const color = event.severity === 'fail' ? 0xff3b30 : 0xffcc00;
    const material = new THREE.MeshLambertMaterial({ color });
    
    const mesh = new THREE.Mesh(geometry, material);
    if (event.position) {
      mesh.position.set(
        Number(event.position.x),           // X position
        Number(event.position.z) || 0,     // Z becomes Y (vertical)
        Number(event.position.y)           // Y becomes Z (depth)
      );
    }
    
    return mesh;
  }

  createToolMesh() {
    console.log('[ANIMATION DEBUG] createToolMesh called');
    
    // Create a simple end mill representation
    const group = new THREE.Group();
    
    // Tool cutting edge (cylinder) - simplified end mill
    const cuttingGeometry = new THREE.CylinderGeometry(0.125, 0.125, 0.5, 12);
    const cuttingMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xcccccc,
      transparent: true,
      opacity: 0.8
    });
    const cuttingMesh = new THREE.Mesh(cuttingGeometry, cuttingMaterial);
    cuttingMesh.position.y = 0.25;
    group.add(cuttingMesh);
    
    // Start tool at safe position
    group.position.set(0, 3, 0);
    group.visible = false;
    
    console.log('[ANIMATION DEBUG] Tool mesh created', {
      position: group.position,
      visible: group.visible,
      childrenCount: group.children.length
    });
    
    return group;
  }

  updateStock(stock) {
    // Remove existing stock mesh
    if (this.stockMesh) {
      this.scene.remove(this.stockMesh);
      this.stockMesh.geometry.dispose();
      this.stockMesh.material.dispose();
    }

    if (!stock) return;

    // Use current animation stock data if available, otherwise use provided stock
    const displayStock = this.animation.currentStockData || stock;

    // Create new stock mesh
    const geometry = this.createStockGeometry(displayStock);
    const material = this.createStockMaterial();
    this.stockMesh = new THREE.Mesh(geometry, material);
    
    // Position the stock mesh properly on the machine bed
    this.stockMesh.position.set(
      (stock.minX + stock.maxX) / 2,
      stock.bottomZ,
      (stock.minY + stock.maxY) / 2
    );
    this.stockMesh.rotation.x = -Math.PI / 2; // Rotate to lay flat (XY plane)
    this.stockMesh.receiveShadow = true;
    this.stockMesh.castShadow = true;
    
    this.scene.add(this.stockMesh);

    // Update camera to focus on stock with proper perspective
    const center = new THREE.Vector3(
      (stock.minX + stock.maxX) / 2,
      (stock.topZ + stock.bottomZ) / 2,
      (stock.minY + stock.maxY) / 2
    );
    this.controls.target.copy(center);
    
    const size = Math.max(
      stock.maxX - stock.minX,
      stock.maxY - stock.minY,
      Math.abs(stock.topZ - stock.bottomZ)
    );
    const distance = size * 3;
    
    // Position camera at a good angle for machining visualization
    this.camera.position.set(
      center.x + distance * 0.7,
      center.y + distance * 0.8,
      center.z + distance * 0.7
    );
    this.controls.update();
  }

  // Animation methods
  setupAnimation(result, gcode = '') {
    console.log('[ANIMATION DEBUG] setupAnimation called', {
      result: !!result,
      gcode: gcode ? `${gcode.length} chars` : 'empty',
      currentlyPlaying: this.animation.isPlaying,
      toolMeshExists: !!this.toolMesh,
      stackTrace: new Error().stack.split('\n').slice(1, 4)
    });
    
    if (!result) {
      console.log('[ANIMATION DEBUG] No result provided, skipping setup');
      return;
    }
    
    // Store original uncut stock state
    if (result.stock) {
      this.animation.originalStock = this.createUncutStock(result.stock);
      this.animation.currentStockData = this.copyStockData(this.animation.originalStock);
      console.log('[ANIMATION DEBUG] Created uncut stock state');
    }
    
    this.animation.toolPath = result.toolPath || [];
    this.animation.toolPositions = this.generateToolPositions(result.toolPath);
    this.animation.maxSteps = this.animation.toolPositions.length;
    this.animation.currentStep = 0;
    this.animation.stockSnapshots = result.stockSnapshots || [];
    this.animation.gcode = gcode;
    this.animation.gcodeLines = gcode.split('\n').map((line, index) => ({
      number: index + 1,
      text: line.trim(),
      originalLine: line
    }));
    this.animation.currentLine = 0;
    
    console.log('[ANIMATION DEBUG] Animation data prepared', {
      toolPath: this.animation.toolPath.length,
      toolPositions: this.animation.toolPositions.length,
      gcodeLines: this.animation.gcodeLines.length,
      maxSteps: this.animation.maxSteps
    });
    
    // Create tool mesh if it doesn't exist
    if (!this.toolMesh) {
      console.log('[ANIMATION DEBUG] Creating new tool mesh');
      this.toolMesh = this.createToolMesh();
      this.scene.add(this.toolMesh);
    } else {
      console.log('[ANIMATION DEBUG] Tool mesh already exists, reusing');
    }
    
    this.resetAnimation();
  }

  createUncutStock(finalStock) {
    // Create uncut stock by setting all heights to topZ
    const uncutStock = JSON.parse(JSON.stringify(finalStock));
    const topZ = finalStock.topZ;
    
    // Fill all height values with the top level (uncut state)
    uncutStock.heights = new Float32Array(finalStock.heights.length);
    uncutStock.heights.fill(topZ);
    
    console.log('[ANIMATION DEBUG] Created uncut stock', {
      originalHeights: finalStock.heights.length,
      topZ: topZ,
      bottomZ: finalStock.bottomZ,
      uncutHeight: topZ
    });
    
    return uncutStock;
  }

  copyStockData(stock) {
    const copy = JSON.parse(JSON.stringify(stock));
    copy.heights = new Float32Array(stock.heights);
    return copy;
  }

  simulateCutting(toolPos, toolRadius = 0.125) {
    if (!this.animation.currentStockData || !toolPos) return;
    
    const stock = this.animation.currentStockData;
    const cellSize = stock.cell;
    const nx = stock.nx;
    const ny = stock.ny;
    
    // Convert 3D position back to CNC coordinates
    const cncX = toolPos.x;
    const cncY = toolPos.z; // 3D Z becomes CNC Y
    const cncZ = toolPos.y; // 3D Y becomes CNC Z
    
    // Only cut if tool is below stock surface
    if (cncZ >= stock.topZ) return;
    
    // Calculate affected dexel indices with higher precision
    const centerI = (cncX - stock.minX) / cellSize;
    const centerJ = (cncY - stock.minY) / cellSize;
    const radiusCells = toolRadius / cellSize;
    
    // Much higher resolution cutting - check more cells
    const searchRadius = Math.ceil(radiusCells * 1.5); // 50% larger search area
    
    for (let di = -searchRadius; di <= searchRadius; di++) {
      for (let dj = -searchRadius; dj <= searchRadius; dj++) {
        const i = Math.floor(centerI + di);
        const j = Math.floor(centerJ + dj);
        
        if (i >= 0 && i < nx && j >= 0 && j < ny) {
          // Calculate actual distance from tool center to dexel center
          const dexelX = stock.minX + (i + 0.5) * cellSize;
          const dexelY = stock.minY + (j + 0.5) * cellSize;
          const distance = Math.sqrt(
            Math.pow(dexelX - cncX, 2) + 
            Math.pow(dexelY - cncY, 2)
          );
          
          if (distance <= toolRadius) {
            const heightIndex = j * nx + i;
            // Progressive cutting with smooth blending at tool edges
            const cutDepth = cncZ;
            const edgeFactor = Math.max(0, 1 - (distance / toolRadius));
            const blendedCutDepth = cncZ + (stock.heights[heightIndex] - cncZ) * (1 - edgeFactor * 0.1);
            
            stock.heights[heightIndex] = Math.min(stock.heights[heightIndex], blendedCutDepth);
          }
        }
      }
    }
    
    // Batch geometry updates for performance
    this.animation.geometryUpdateCounter++;
    if (this.animation.geometryUpdateCounter >= this.animation.updatesBetweenGeometry) {
      this.updateStockGeometry();
      this.animation.geometryUpdateCounter = 0;
    }
  }

  updateStockGeometry() {
    if (!this.stockMesh || !this.animation.currentStockData) return;
    
    const stock = this.animation.currentStockData;
    const geometry = this.stockMesh.geometry;
    const vertices = geometry.attributes.position.array;
    
    // Update vertex heights - optimized to update all vertices
    for (let i = 0; i < stock.ny; i++) {
      for (let j = 0; j < stock.nx; j++) {
        const heightIndex = i * stock.nx + j;
        const vertexIndex = (i * stock.nx + j) * 3 + 2; // Z component
        vertices[vertexIndex] = stock.heights[heightIndex] - stock.bottomZ;
      }
    }
    
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
  }

  generateToolPositions(toolPath) {
    const positions = [];
    let currentPos = { x: 0, y: 0, z: 1 };
    
    if (!toolPath || toolPath.length === 0) {
      // Generate from G-code if no toolPath provided
      return this.generatePositionsFromGcode();
    }
    
    toolPath.forEach((move, moveIndex) => {
      if (move.type === 'rapid' || move.type === 'linear') {
        const steps = Math.max(1, Math.floor(move.distance * 10)); // More steps for longer moves
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          positions.push({
            x: currentPos.x + (move.endX - currentPos.x) * t,
            y: currentPos.z + (move.endZ - currentPos.z) * t, // CNC Z becomes 3D Y
            z: currentPos.y + (move.endY - currentPos.y) * t, // CNC Y becomes 3D Z
            feedRate: move.feedRate || 100,
            type: move.type,
            lineNumber: move.lineNumber || 0,
            blockNumber: move.blockNumber || 0
          });
        }
        currentPos = { x: move.endX, y: move.endY, z: move.endZ };
      }
    });
    
    return positions;
  }

  generatePositionsFromGcode() {
    console.log('[ANIMATION DEBUG] generatePositionsFromGcode called', {
      gcodeLines: this.animation.gcodeLines.length
    });
    
    const positions = [];
    let currentPos = { x: 0, y: 0, z: 1 };
    let lineNumber = 0;
    let moveCount = 0;
    
    // Parse G-code lines and generate positions
    this.animation.gcodeLines.forEach((gcodeLine, index) => {
      const line = gcodeLine.text.toUpperCase();
      
      // Skip comments and empty lines
      if (!line || line.startsWith(';') || line.startsWith('(') || line.startsWith('%')) {
        return;
      }
      
      // Extract coordinates if present
      const xMatch = line.match(/X(-?\d+\.?\d*)/);
      const yMatch = line.match(/Y(-?\d+\.?\d*)/);
      const zMatch = line.match(/Z(-?\d+\.?\d*)/);
      
      let newPos = { ...currentPos };
      let hasMove = false;
      
      if (xMatch) { newPos.x = parseFloat(xMatch[1]); hasMove = true; }
      if (yMatch) { newPos.y = parseFloat(yMatch[1]); hasMove = true; }
      if (zMatch) { newPos.z = parseFloat(zMatch[1]); hasMove = true; }
      
      if (hasMove) {
        // Determine move type
        const isRapid = line.includes('G00') || line.includes('G0 ');
        const isFeed = line.includes('G01') || line.includes('G1 ');
        
        if (isRapid || isFeed) {
          moveCount++;
          // Much higher resolution for cutting moves
          const distance = Math.sqrt(
            Math.pow(newPos.x - currentPos.x, 2) + 
            Math.pow(newPos.y - currentPos.y, 2) + 
            Math.pow(newPos.z - currentPos.z, 2)
          );
          const steps = isRapid ? Math.max(1, Math.floor(distance * 5)) : Math.max(1, Math.floor(distance * 20)); // 20x higher resolution for cutting
          for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            positions.push({
              x: currentPos.x + (newPos.x - currentPos.x) * t,
              y: currentPos.z + (newPos.z - currentPos.z) * t, // CNC Z becomes 3D Y
              z: currentPos.y + (newPos.y - currentPos.y) * t, // CNC Y becomes 3D Z
              feedRate: isRapid ? 1000 : 25,
              type: isRapid ? 'rapid' : 'linear',
              lineNumber: index + 1,
              gcodeLineIndex: index
            });
          }
          currentPos = newPos;
        }
      }
    });
    
    console.log('[ANIMATION DEBUG] Generated positions', {
      totalPositions: positions.length,
      moveCount: moveCount,
      firstFew: positions.slice(0, 3),
      lastFew: positions.slice(-3)
    });
    
    return positions;
  }

  generatePositionsFromEvents() {
    // Fallback: generate basic positions from event positions
    const positions = [{ x: 0, y: 1, z: 0, feedRate: 100, type: 'rapid' }];
    
    this.lastEvents.forEach(event => {
      if (event.position) {
        positions.push({
          x: Number(event.position.x),
          y: Number(event.position.z) || 0,
          z: Number(event.position.y),
          feedRate: 25,
          type: 'linear'
        });
      }
    });
    
    return positions;
  }

  toggleAnimation() {
    console.log('[ANIMATION DEBUG] toggleAnimation called', {
      wasPlaying: this.animation.isPlaying,
      willBePlaying: !this.animation.isPlaying,
      toolMeshExists: !!this.toolMesh,
      toolMeshVisible: this.toolMesh ? this.toolMesh.visible : 'N/A',
      maxSteps: this.animation.maxSteps,
      currentStep: this.animation.currentStep
    });
    
    this.animation.isPlaying = !this.animation.isPlaying;
    if (this.animation.isPlaying && this.toolMesh) {
      this.toolMesh.visible = true;
      console.log('[ANIMATION DEBUG] Tool mesh made visible');
    }
    this.updateAnimationStatus();
  }

  resetAnimation() {
    console.log('[ANIMATION DEBUG] resetAnimation called', {
      wasPlaying: this.animation.isPlaying,
      wasAtStep: this.animation.currentStep,
      toolMeshExists: !!this.toolMesh
    });
    
    this.animation.isPlaying = false;
    this.animation.currentStep = 0;
    this.animation.lastUpdate = 0;
    this.animation.currentLine = 0;
    
    // Reset to uncut stock state
    if (this.animation.originalStock) {
      this.animation.currentStockData = this.copyStockData(this.animation.originalStock);
      this.updateStockGeometry();
      console.log('[ANIMATION DEBUG] Reset to uncut stock state');
    }
    
    if (this.toolMesh) {
      this.toolMesh.position.set(0, 3, 0);
      this.toolMesh.visible = false;
      console.log('[ANIMATION DEBUG] Tool mesh reset to (0,3,0) and hidden');
    }
    
    this.updateAnimationStatus();
    this.updateGcodeHighlight();
  }

  setAnimationSpeed(speed) {
    this.animation.speed = Math.max(0.1, Math.min(10, speed));
    this.updateAnimationStatus();
  }

  updateAnimation(timestamp) {
    if (!this.animation.isPlaying || !this.toolMesh || this.animation.toolPositions.length === 0) {
      // Only log occasionally to avoid spam
      if (Math.random() < 0.001) {
        console.log('[ANIMATION DEBUG] updateAnimation skipped', {
          isPlaying: this.animation.isPlaying,
          toolMeshExists: !!this.toolMesh,
          positionsLength: this.animation.toolPositions.length
        });
      }
      return;
    }
    
    const deltaTime = timestamp - this.animation.lastUpdate;
    const stepInterval = 20 / this.animation.speed; // Base 20ms per step at 1x speed (5x faster)
    
    if (deltaTime >= stepInterval) {
      this.animation.lastUpdate = timestamp;
      
      if (this.animation.currentStep < this.animation.toolPositions.length - 1) {
        this.animation.currentStep++;
        
        const pos = this.animation.toolPositions[this.animation.currentStep];
        this.toolMesh.position.set(pos.x, pos.y, pos.z);
        
        // Simulate cutting if tool is in cutting move
        if (pos.type === 'linear') {
          this.simulateCutting(pos);
        }
        
        // Log every 10th step to monitor progress
        if (this.animation.currentStep % 10 === 0) {
          console.log('[ANIMATION DEBUG] Animation step', {
            step: this.animation.currentStep,
            total: this.animation.toolPositions.length,
            position: { x: pos.x, y: pos.y, z: pos.z },
            gcodeLineIndex: pos.gcodeLineIndex,
            type: pos.type
          });
        }
        
        // Update current G-code line
        if (pos.gcodeLineIndex !== undefined && pos.gcodeLineIndex !== this.animation.currentLine) {
          this.animation.currentLine = pos.gcodeLineIndex;
          this.updateGcodeHighlight();
        }
        
        // Update progress indicator
        this.updateAnimationStatus();
      } else {
        // Animation complete
        console.log('[ANIMATION DEBUG] Animation completed');
        this.animation.isPlaying = false;
        this.updateAnimationStatus();
      }
    }
  }

  updateAnimationStatus() {
    // Dispatch custom event for UI updates
    const progress = this.animation.maxSteps > 0 ? 
      (this.animation.currentStep / this.animation.maxSteps) * 100 : 0;
      
    window.dispatchEvent(new CustomEvent('animationUpdate', {
      detail: {
        isPlaying: this.animation.isPlaying,
        progress: progress.toFixed(1),
        step: this.animation.currentStep,
        maxSteps: this.animation.maxSteps,
        speed: this.animation.speed,
        currentLine: this.animation.currentLine
      }
    }));
  }

  updateGcodeHighlight() {
    // Dispatch event to update G-code highlighting
    window.dispatchEvent(new CustomEvent('gcodeHighlight', {
      detail: {
        currentLine: this.animation.currentLine,
        totalLines: this.animation.gcodeLines.length
      }
    }));
  }

  updateFixtures(fixtures) {
    // Remove existing fixture meshes
    this.fixtureMeshes.forEach(mesh => {
      this.scene.remove(mesh);
      mesh.geometry.dispose();
      mesh.material.dispose();
    });
    this.fixtureMeshes = [];

    // Add new fixture meshes
    if (fixtures) {
      fixtures.forEach(fixture => {
        const mesh = this.createFixtureGeometry(fixture);
        mesh.castShadow = true;
        this.scene.add(mesh);
        this.fixtureMeshes.push(mesh);
      });
    }
  }

  updateEvents(events) {
    // Remove existing event markers
    this.eventMarkers.forEach(marker => {
      this.scene.remove(marker);
      marker.geometry.dispose();
      marker.material.dispose();
    });
    this.eventMarkers = [];

    // Add new event markers
    if (events) {
      events.filter(e => e.position).forEach(event => {
        const marker = this.createEventMarker(event);
        this.scene.add(marker);
        this.eventMarkers.push(marker);
      });
    }
  }

  render(stock, events = [], fixtures = [], result = null) {
    // Update stock if changed or first render
    if (stock !== this.lastStock || (stock && !this.stockMesh)) {
      this.updateStock(stock);
    }
    this.lastStock = stock;
    this.lastEvents = events;

    // Update fixtures
    this.updateFixtures(fixtures);

    // Update events
    this.updateEvents(events);
    
    // Setup animation if result provided
    if (result) {
      // Get G-code from textarea element
      const gcodeElement = document.querySelector('#gcode');
      const gcode = gcodeElement ? gcodeElement.value : '';
      console.log('[ANIMATION DEBUG] render() calling setupAnimation', {
        hasResult: !!result,
        gcodeLength: gcode.length
      });
      this.setupAnimation(result, gcode);
    } else {
      console.log('[ANIMATION DEBUG] render() called without result');
    }
  }

  animate() {
    const timestamp = performance.now();
    requestAnimationFrame(() => this.animate());
    
    this.controls.update();
    this.updateAnimation(timestamp);
    
    // Check for unexpected tool visibility (debug issue)
    if (this.toolMesh && this.toolMesh.visible && !this.animation.isPlaying) {
      console.warn('[ANIMATION DEBUG] Tool is visible but animation not playing!', {
        toolPosition: this.toolMesh.position,
        animationState: {
          isPlaying: this.animation.isPlaying,
          currentStep: this.animation.currentStep,
          maxSteps: this.animation.maxSteps
        }
      });
    }
    
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  generateDebugOutput() {
    const debug = {
      timestamp: new Date().toISOString(),
      scene: {
        objectCount: this.scene.children.length,
        background: this.scene.background
      },
      camera: {
        position: {
          x: this.camera.position.x,
          y: this.camera.position.y,
          z: this.camera.position.z
        },
        target: {
          x: this.controls.target.x,
          y: this.controls.target.y,
          z: this.controls.target.z
        },
        fov: this.camera.fov,
        near: this.camera.near,
        far: this.camera.far
      },
      stock: null,
      fixtures: [],
      events: [],
      gridHelper: null
    };

    // Stock debug info
    if (this.stockMesh && this.lastStock) {
      debug.stock = {
        position: {
          x: this.stockMesh.position.x,
          y: this.stockMesh.position.y,
          z: this.stockMesh.position.z
        },
        rotation: {
          x: this.stockMesh.rotation.x,
          y: this.stockMesh.rotation.y,
          z: this.stockMesh.rotation.z
        },
        scale: {
          x: this.stockMesh.scale.x,
          y: this.stockMesh.scale.y,
          z: this.stockMesh.scale.z
        },
        bounds: {
          minX: this.lastStock.minX,
          maxX: this.lastStock.maxX,
          minY: this.lastStock.minY,
          maxY: this.lastStock.maxY,
          topZ: this.lastStock.topZ,
          bottomZ: this.lastStock.bottomZ
        },
        dimensions: {
          width: this.lastStock.maxX - this.lastStock.minX,
          depth: this.lastStock.maxY - this.lastStock.minY,
          height: this.lastStock.topZ - this.lastStock.bottomZ
        },
        dexelInfo: {
          nx: this.lastStock.nx,
          ny: this.lastStock.ny,
          cell: this.lastStock.cell,
          heightsLength: this.lastStock.heights ? this.lastStock.heights.length : 0
        },
        geometryInfo: {
          vertices: this.stockMesh.geometry.attributes.position.count,
          faces: this.stockMesh.geometry.index ? this.stockMesh.geometry.index.count / 3 : 'non-indexed'
        }
      };
    }

    // Fixture debug info
    this.fixtureMeshes.forEach((mesh, index) => {
      debug.fixtures.push({
        index,
        position: {
          x: mesh.position.x,
          y: mesh.position.y,
          z: mesh.position.z
        },
        rotation: {
          x: mesh.rotation.x,
          y: mesh.rotation.y,
          z: mesh.rotation.z
        },
        scale: {
          x: mesh.scale.x,
          y: mesh.scale.y,
          z: mesh.scale.z
        },
        geometry: {
          type: mesh.geometry.type,
          parameters: mesh.geometry.parameters
        },
        material: {
          color: mesh.material.color.getHexString(),
          opacity: mesh.material.opacity,
          transparent: mesh.material.transparent
        }
      });
    });

    // Event markers debug info
    this.eventMarkers.forEach((marker, index) => {
      debug.events.push({
        index,
        position: {
          x: marker.position.x,
          y: marker.position.y,
          z: marker.position.z
        },
        material: {
          color: marker.material.color.getHexString()
        }
      });
    });

    // Grid helper debug info
    const gridHelper = this.scene.children.find(child => child.type === 'GridHelper');
    if (gridHelper) {
      debug.gridHelper = {
        position: {
          x: gridHelper.position.x,
          y: gridHelper.position.y,
          z: gridHelper.position.z
        },
        rotation: {
          x: gridHelper.rotation.x,
          y: gridHelper.rotation.y,
          z: gridHelper.rotation.z
        }
      };
    }

    // Coordinate system analysis
    debug.coordinateAnalysis = {
      note: "CNC coordinates vs 3D coordinates",
      mapping: {
        "CNC X": "3D X (left/right)",
        "CNC Y": "3D Z (forward/back - depth)",
        "CNC Z": "3D Y (up/down - height)"
      },
      issues: []
    };

    // Check for common positioning issues
    if (debug.stock) {
      if (debug.stock.position.y > 0.5) {
        debug.coordinateAnalysis.issues.push("Stock Y position elevated above table level");
      }
      if (Math.abs(debug.stock.rotation.x + Math.PI/2) > 0.1) {
        debug.coordinateAnalysis.issues.push("Stock rotation may not be flat on XY plane");
      }
    }

    debug.fixtures.forEach((fixture, i) => {
      if (fixture.position.y < -1.5 || fixture.position.y > 2.0) {
        debug.coordinateAnalysis.issues.push(`Fixture ${i} Y position outside normal range`);
      }
    });

    // Format and copy to clipboard
    const output = JSON.stringify(debug, null, 2);
    
    // Create temporary textarea for copying
    const textarea = document.createElement('textarea');
    textarea.value = output;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // Show notification
    console.log('Debug output copied to clipboard');
    alert('3D Debug output copied to clipboard!\n\nPress Ctrl+V to paste the debug data.\n\nKey hotkey: Ctrl+Shift+D');
    
    return output;
  }

  dispose() {
    // Cleanup
    if (this.stockMesh) {
      this.stockMesh.geometry.dispose();
      this.stockMesh.material.dispose();
    }
    
    this.eventMarkers.forEach(marker => {
      marker.geometry.dispose();
      marker.material.dispose();
    });
    
    this.fixtureMeshes.forEach(mesh => {
      mesh.geometry.dispose();
      mesh.material.dispose();
    });
    
    this.renderer.dispose();
    this.container.removeChild(this.renderer.domElement);
    window.removeEventListener('resize', this.onWindowResize);
  }
}