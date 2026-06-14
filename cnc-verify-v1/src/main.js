import { ThreeDRenderer } from './render/canvas3d.js';
import { SAFE_SAMPLE, CRASH_SAMPLE, COMPLEX_PART, AUTOMOTIVE_MOLD } from './samples.js';

const els = {
  status: document.querySelector('#status'),
  gcode: document.querySelector('#gcode'),
  report: document.querySelector('#report'),
  run: document.querySelector('#run'),
  sampleSafe: document.querySelector('#sampleSafe'),
  sampleCrash: document.querySelector('#sampleCrash'),
  sampleComplex: document.querySelector('#sampleComplex'),
  sampleAutomotive: document.querySelector('#sampleAutomotive'),
  view: document.querySelector('#view'),
  stockMinX: document.querySelector('#stockMinX'),
  stockMaxX: document.querySelector('#stockMaxX'),
  stockMinY: document.querySelector('#stockMinY'),
  stockMaxY: document.querySelector('#stockMaxY'),
  stockTopZ: document.querySelector('#stockTopZ'),
  stockBottomZ: document.querySelector('#stockBottomZ'),
  stockCell: document.querySelector('#stockCell'),
  toolDiameter: document.querySelector('#toolDiameter'),
  toolFlute: document.querySelector('#toolFlute'),
  toolShankDiameter: document.querySelector('#toolShankDiameter'),
  toolShankLength: document.querySelector('#toolShankLength'),
  holderDiameter: document.querySelector('#holderDiameter'),
  holderLength: document.querySelector('#holderLength'),
  fixtureMinX: document.querySelector('#fixtureMinX'),
  fixtureMaxX: document.querySelector('#fixtureMaxX'),
  fixtureMinY: document.querySelector('#fixtureMinY'),
  fixtureMaxY: document.querySelector('#fixtureMaxY'),
  fixtureMinZ: document.querySelector('#fixtureMinZ'),
  fixtureMaxZ: document.querySelector('#fixtureMaxZ'),
  // Animation controls
  playPause: document.querySelector('#playPause'),
  reset: document.querySelector('#reset'),
  progress: document.querySelector('#progress'),
  speedControl: document.querySelector('#speedControl'),
  speedDisplay: document.querySelector('#speedDisplay')
};

const renderer = new ThreeDRenderer(els.view);
const worker = new Worker('./src/verifier.worker.js', { type: 'module' });
let nextJobId = 1;

// G-code highlighting functionality
function highlightGcodeLine(lineNumber) {
  if (!els.gcode) return;
  
  const lines = els.gcode.value.split('\n');
  if (lineNumber < 0 || lineNumber >= lines.length) return;
  
  // Calculate character position for the target line
  let charPosition = 0;
  for (let i = 0; i < lineNumber; i++) {
    charPosition += lines[i].length + 1; // +1 for newline
  }
  
  const lineLength = lines[lineNumber].length;
  
  // Set cursor position and select the line
  els.gcode.focus();
  els.gcode.setSelectionRange(charPosition, charPosition + lineLength);
  
  // Scroll to keep the highlighted line near the top (3rd line from top)
  scrollToLine(lineNumber);
}

function scrollToLine(targetLine) {
  if (!els.gcode) return;
  
  const lineHeight = 16; // Approximate line height in pixels
  const containerHeight = els.gcode.clientHeight;
  const linesVisible = Math.floor(containerHeight / lineHeight);
  
  // Position target line as 3rd from top
  const desiredTopLine = Math.max(0, targetLine - 2);
  const scrollTop = desiredTopLine * lineHeight;
  
  els.gcode.scrollTop = scrollTop;
}

function numberFrom(id) {
  const value = Number(els[id].value);
  if (!Number.isFinite(value)) throw new Error(`${id} must be a number.`);
  return value;
}

function buildPayload() {
  return {
    gcode: els.gcode.value,
    stockParams: {
      minX: numberFrom('stockMinX'),
      maxX: numberFrom('stockMaxX'),
      minY: numberFrom('stockMinY'),
      maxY: numberFrom('stockMaxY'),
      topZ: numberFrom('stockTopZ'),
      bottomZ: numberFrom('stockBottomZ'),
      cell: numberFrom('stockCell')
    },
    toolParams: {
      diameter: numberFrom('toolDiameter'),
      fluteLength: numberFrom('toolFlute'),
      shankDiameter: numberFrom('toolShankDiameter'),
      shankLength: numberFrom('toolShankLength'),
      holderDiameter: numberFrom('holderDiameter'),
      holderLength: numberFrom('holderLength')
    },
    fixtureParams: {
      minX: numberFrom('fixtureMinX'),
      maxX: numberFrom('fixtureMaxX'),
      minY: numberFrom('fixtureMinY'),
      maxY: numberFrom('fixtureMaxY'),
      minZ: numberFrom('fixtureMinZ'),
      maxZ: numberFrom('fixtureMaxZ'),
      label: 'fixture box'
    },
    machineBounds: {
      minX: -20,
      maxX: 20,
      minY: -20,
      maxY: 20,
      minZ: -10,
      maxZ: 10
    }
  };
}

function formatReport(result) {
  const header = [
    result.ok ? 'PASS: no forbidden collision found.' : `FAIL: ${result.failureCount} forbidden event(s) found.`,
    `Blocks: ${result.blocks}`,
    `Segments: ${result.segments}`,
    `Cuts accepted: ${result.cutCount}`,
    `Warnings: ${result.warningCount}`,
    `Stock: ${result.stockSummary.nx} x ${result.stockSummary.ny} dexels @ ${result.stockSummary.cell}, height ${result.stockSummary.minHeight} .. ${result.stockSummary.maxHeight}`,
    ''
  ];

  const eventLines = result.events.map(event => {
    const line = event.lineNumber ? `L${event.lineNumber}` : 'L?';
    const block = event.block ? `N${event.block}` : 'N?';
    const where = event.position ? ` @ X${event.position.x} Y${event.position.y} Z${event.position.z}` : '';
    return `[${event.severity.toUpperCase()}] ${block}/${line} ${event.kind}: ${event.message}${where}\n  ${event.raw}`;
  });

  const limits = [
    '',
    'Modeled:',
    `- ${result.supported.axes}`,
    `- ${result.supported.moves}`,
    `- ${result.supported.stock}`,
    `- ${result.supported.tool}`,
    '',
    'Known limits:',
    ...result.limitations.map(item => `- ${item}`)
  ];

  return [...header, ...(eventLines.length ? eventLines : ['No events emitted.']), ...limits].join('\n');
}

function runVerification() {
  console.log('[MAIN DEBUG] runVerification called');
  els.status.textContent = 'running';
  els.report.textContent = 'Running verification kernel...';
  const id = nextJobId++;
  try {
    worker.postMessage({ id, payload: buildPayload() });
  } catch (error) {
    els.status.textContent = 'error';
    els.report.textContent = error instanceof Error ? error.message : String(error);
  }
}

worker.onmessage = event => {
  console.log('[MAIN DEBUG] Worker message received', {
    ok: event.data.ok,
    hasResult: !!event.data.result,
    hasStock: !!(event.data.result && event.data.result.stock)
  });
  
  const { ok, result, error } = event.data;
  if (!ok) {
    els.status.textContent = 'error';
    els.report.textContent = error;
    return;
  }

  result.stock.heights = new Float32Array(result.stock.heights);
  els.status.textContent = result.ok ? 'pass' : 'fail';
  els.report.textContent = formatReport(result);
  
  // Build fixtures array from current settings
  const fixtures = [{
    minX: numberFrom('fixtureMinX'),
    maxX: numberFrom('fixtureMaxX'),
    minY: numberFrom('fixtureMinY'),
    maxY: numberFrom('fixtureMaxY'),
    minZ: numberFrom('fixtureMinZ'),
    maxZ: numberFrom('fixtureMaxZ')
  }];
  
  console.log('[MAIN DEBUG] Calling renderer.render with result');
  renderer.render(result.stock, result.events, fixtures, result);
};

worker.onerror = error => {
  els.status.textContent = 'worker error';
  els.report.textContent = error.message;
};

els.sampleSafe.addEventListener('click', () => {
  els.gcode.value = SAFE_SAMPLE;
  runVerification();
});

els.sampleCrash.addEventListener('click', () => {
  els.gcode.value = CRASH_SAMPLE;
  runVerification();
});

els.sampleComplex.addEventListener('click', () => {
  els.gcode.value = COMPLEX_PART;
  runVerification();
});

els.sampleAutomotive.addEventListener('click', () => {
  els.gcode.value = AUTOMOTIVE_MOLD;
  runVerification();
});

els.run.addEventListener('click', runVerification);

// Animation control event handlers
els.playPause.addEventListener('click', () => {
  console.log('[MAIN DEBUG] Play/Pause button clicked');
  renderer.toggleAnimation();
});

els.reset.addEventListener('click', () => {
  console.log('[MAIN DEBUG] Reset button clicked');
  renderer.resetAnimation();
});

els.speedControl.addEventListener('input', (e) => {
  const speed = parseFloat(e.target.value);
  renderer.setAnimationSpeed(speed);
  els.speedDisplay.textContent = speed.toFixed(1) + 'x';
});

// Listen for animation updates from the renderer
window.addEventListener('animationUpdate', (event) => {
  const { isPlaying, progress, step, maxSteps, speed, currentLine } = event.detail;
  
  els.playPause.textContent = isPlaying ? '⏸️ Pause' : '▶️ Play';
  els.progress.textContent = `${progress}% (${step}/${maxSteps}) Line ${currentLine + 1}`;
  els.speedDisplay.textContent = speed.toFixed(1) + 'x';
  els.speedControl.value = speed;
});

// Listen for G-code highlighting updates
window.addEventListener('gcodeHighlight', (event) => {
  const { currentLine, totalLines } = event.detail;
  highlightGcodeLine(currentLine);
});

els.gcode.value = SAFE_SAMPLE;
runVerification();
