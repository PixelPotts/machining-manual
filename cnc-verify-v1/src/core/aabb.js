import { intervalsOverlap } from './math.js';

export class AABB {
  constructor(minX, minY, minZ, maxX, maxY, maxZ, label = 'box') {
    this.minX = minX;
    this.minY = minY;
    this.minZ = minZ;
    this.maxX = maxX;
    this.maxY = maxY;
    this.maxZ = maxZ;
    this.label = label;
  }

  expanded(r) {
    return new AABB(this.minX - r, this.minY - r, this.minZ - r, this.maxX + r, this.maxY + r, this.maxZ + r, this.label);
  }

  overlaps(other) {
    return intervalsOverlap(this.minX, this.maxX, other.minX, other.maxX)
      && intervalsOverlap(this.minY, this.maxY, other.minY, other.maxY)
      && intervalsOverlap(this.minZ, this.maxZ, other.minZ, other.maxZ);
  }

  containsXY(x, y) {
    return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
  }
}

export function sweptCylinderAABB(start, end, radius, zMin0, zMax0, zMin1, zMax1) {
  return new AABB(
    Math.min(start.x, end.x) - radius,
    Math.min(start.y, end.y) - radius,
    Math.min(zMin0, zMin1),
    Math.max(start.x, end.x) + radius,
    Math.max(start.y, end.y) + radius,
    Math.max(zMax0, zMax1),
    'swept-cylinder'
  );
}

export function verticalCylinderIntersectsBox(cx, cy, radius, zMin, zMax, box) {
  if (!intervalsOverlap(zMin, zMax, box.minZ, box.maxZ)) return false;
  const nearestX = Math.max(box.minX, Math.min(box.maxX, cx));
  const nearestY = Math.max(box.minY, Math.min(box.maxY, cy));
  const dx = cx - nearestX;
  const dy = cy - nearestY;
  return dx * dx + dy * dy <= radius * radius;
}

export function sweptVerticalCylinderIntersectsBox(start, end, radius, zMin0, zMax0, zMin1, zMax1, box) {
  const swept = sweptCylinderAABB(start, end, radius, zMin0, zMax0, zMin1, zMax1);
  if (!swept.overlaps(box)) return false;

  const expanded = new AABB(box.minX - radius, box.minY - radius, box.minZ, box.maxX + radius, box.maxY + radius, box.maxZ, box.label);
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  let tEnter = 0;
  let tExit = 1;

  const clip = (p, q) => {
    if (Math.abs(p) < 1e-12) return q >= 0;
    const r = q / p;
    if (p < 0) {
      if (r > tExit) return false;
      if (r > tEnter) tEnter = r;
    } else {
      if (r < tEnter) return false;
      if (r < tExit) tExit = r;
    }
    return true;
  };

  if (!clip(-dx, start.x - expanded.minX)) return false;
  if (!clip(dx, expanded.maxX - start.x)) return false;
  if (!clip(-dy, start.y - expanded.minY)) return false;
  if (!clip(dy, expanded.maxY - start.y)) return false;

  const zLo = Math.min(zMin0 + (zMin1 - zMin0) * tEnter, zMin0 + (zMin1 - zMin0) * tExit);
  const zHi = Math.max(zMax0 + (zMax1 - zMax0) * tEnter, zMax0 + (zMax1 - zMax0) * tExit);
  return intervalsOverlap(zLo, zHi, box.minZ, box.maxZ);
}
