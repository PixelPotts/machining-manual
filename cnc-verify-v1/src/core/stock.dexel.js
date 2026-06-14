import { distancePointToSegment2D, formatNumber, intervalsOverlap, segmentParameterRangeForCircle2D } from './math.js';

export class DexelStock {
  constructor({ minX, maxX, minY, maxY, topZ, bottomZ, cell }) {
    if (cell <= 0) throw new Error('Stock cell size must be positive.');
    if (maxX <= minX || maxY <= minY) throw new Error('Invalid stock extents.');
    if (topZ <= bottomZ) throw new Error('Stock top must be above stock bottom.');

    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
    this.topZ = topZ;
    this.bottomZ = bottomZ;
    this.cell = cell;
    this.nx = Math.ceil((maxX - minX) / cell);
    this.ny = Math.ceil((maxY - minY) / cell);
    this.heights = new Float32Array(this.nx * this.ny);
    this.heights.fill(topZ);
    this.cellHalfDiagonal = Math.SQRT2 * cell * 0.5;
  }

  clone() {
    const copy = new DexelStock({
      minX: this.minX,
      maxX: this.maxX,
      minY: this.minY,
      maxY: this.maxY,
      topZ: this.topZ,
      bottomZ: this.bottomZ,
      cell: this.cell
    });
    copy.heights.set(this.heights);
    return copy;
  }

  index(ix, iy) {
    return iy * this.nx + ix;
  }

  xAt(ix) {
    return this.minX + (ix + 0.5) * this.cell;
  }

  yAt(iy) {
    return this.minY + (iy + 0.5) * this.cell;
  }

  ixRange(minX, maxX) {
    return [
      Math.max(0, Math.floor((minX - this.minX) / this.cell)),
      Math.min(this.nx - 1, Math.floor((maxX - this.minX) / this.cell))
    ];
  }

  iyRange(minY, maxY) {
    return [
      Math.max(0, Math.floor((minY - this.minY) / this.cell)),
      Math.min(this.ny - 1, Math.floor((maxY - this.minY) / this.cell))
    ];
  }

  heightAtXY(x, y) {
    const ix = Math.floor((x - this.minX) / this.cell);
    const iy = Math.floor((y - this.minY) / this.cell);
    if (ix < 0 || ix >= this.nx || iy < 0 || iy >= this.ny) return null;
    return this.heights[this.index(ix, iy)];
  }

  forCellsInSweptDisk(start, end, radius, visitor) {
    const conservativeRadius = radius + this.cellHalfDiagonal;
    const [ix0, ix1] = this.ixRange(Math.min(start.x, end.x) - conservativeRadius, Math.max(start.x, end.x) + conservativeRadius);
    const [iy0, iy1] = this.iyRange(Math.min(start.y, end.y) - conservativeRadius, Math.max(start.y, end.y) + conservativeRadius);

    if (ix1 < ix0 || iy1 < iy0) return;

    for (let iy = iy0; iy <= iy1; iy++) {
      const y = this.yAt(iy);
      for (let ix = ix0; ix <= ix1; ix++) {
        const x = this.xAt(ix);
        const near = distancePointToSegment2D(x, y, start.x, start.y, end.x, end.y);
        if (near.distance <= conservativeRadius) {
          visitor(ix, iy, x, y, near.t, near.distance);
        }
      }
    }
  }

  sweptForbiddenContact(component, start, end, block, tolerance = 0) {
    const [zMin0, zMax0] = component.zRangeAtTip(start.z);
    const [zMin1, zMax1] = component.zRangeAtTip(end.z);
    const zSweepMin = Math.min(zMin0, zMin1) - tolerance;
    const zSweepMax = Math.max(zMax0, zMax1) + tolerance;
    const hits = [];

    this.forCellsInSweptDisk(start, end, component.radius + tolerance, (ix, iy, x, y, t, distance) => {
      const h = this.heights[this.index(ix, iy)];
      if (!intervalsOverlap(zSweepMin, zSweepMax, this.bottomZ, h)) return;

      const circleRange = segmentParameterRangeForCircle2D(x, y, component.radius + this.cellHalfDiagonal + tolerance, start.x, start.y, end.x, end.y);
      if (!circleRange) return;

      const zLoA = zMin0 + (zMin1 - zMin0) * circleRange[0];
      const zLoB = zMin0 + (zMin1 - zMin0) * circleRange[1];
      const zHiA = zMax0 + (zMax1 - zMax0) * circleRange[0];
      const zHiB = zMax0 + (zMax1 - zMax0) * circleRange[1];
      const localMin = Math.min(zLoA, zLoB) - tolerance;
      const localMax = Math.max(zHiA, zHiB) + tolerance;
      if (!intervalsOverlap(localMin, localMax, this.bottomZ, h)) return;

      hits.push({
        ix,
        iy,
        x,
        y,
        t,
        distance,
        stockHeight: h,
        componentZMin: localMin,
        componentZMax: localMax,
        block: block.index,
        component: component.name
      });
    });

    return hits;
  }

  removeBySweptFlatCutter(cutter, start, end) {
    const [zMin0] = cutter.zRangeAtTip(start.z);
    const [zMin1] = cutter.zRangeAtTip(end.z);
    let removedCells = 0;
    let maxDepth = 0;

    this.forCellsInSweptDisk(start, end, cutter.radius, (ix, iy, x, y) => {
      const idx = this.index(ix, iy);
      const h = this.heights[idx];
      if (h <= this.bottomZ) return;

      const circleRange = segmentParameterRangeForCircle2D(x, y, cutter.radius + this.cellHalfDiagonal, start.x, start.y, end.x, end.y);
      if (!circleRange) return;

      const zA = zMin0 + (zMin1 - zMin0) * circleRange[0];
      const zB = zMin0 + (zMin1 - zMin0) * circleRange[1];
      const cutZ = Math.max(this.bottomZ, Math.min(zA, zB));
      if (cutZ < h) {
        this.heights[idx] = cutZ;
        removedCells++;
        maxDepth = Math.max(maxDepth, h - cutZ);
      }
    });

    return { removedCells, maxDepth };
  }

  summary() {
    let minHeight = Infinity;
    let maxHeight = -Infinity;
    for (const h of this.heights) {
      minHeight = Math.min(minHeight, h);
      maxHeight = Math.max(maxHeight, h);
    }
    return {
      nx: this.nx,
      ny: this.ny,
      cell: this.cell,
      minHeight: formatNumber(minHeight),
      maxHeight: formatNumber(maxHeight)
    };
  }

  toTransferable() {
    return {
      minX: this.minX,
      maxX: this.maxX,
      minY: this.minY,
      maxY: this.maxY,
      topZ: this.topZ,
      bottomZ: this.bottomZ,
      cell: this.cell,
      nx: this.nx,
      ny: this.ny,
      heights: this.heights
    };
  }
}
