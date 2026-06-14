export const EPS = 1e-9;

export class Vec3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  clone() { return new Vec3(this.x, this.y, this.z); }
  add(v) { return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z); }
  sub(v) { return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z); }
  scale(s) { return new Vec3(this.x * s, this.y * s, this.z * s); }
  lerp(v, t) { return new Vec3(this.x + (v.x - this.x) * t, this.y + (v.y - this.y) * t, this.z + (v.z - this.z) * t); }
  length2() { return this.x * this.x + this.y * this.y + this.z * this.z; }
  length() { return Math.sqrt(this.length2()); }
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function distancePointToSegment2D(px, py, ax, ay, bx, by) {
  const vx = bx - ax;
  const vy = by - ay;
  const wx = px - ax;
  const wy = py - ay;
  const len2 = vx * vx + vy * vy;
  if (len2 < EPS) {
    const dx = px - ax;
    const dy = py - ay;
    return { distance: Math.hypot(dx, dy), t: 0 };
  }
  const t = clamp((wx * vx + wy * vy) / len2, 0, 1);
  const qx = ax + vx * t;
  const qy = ay + vy * t;
  return { distance: Math.hypot(px - qx, py - qy), t };
}

export function segmentParameterRangeForCircle2D(cx, cy, radius, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const fx = ax - cx;
  const fy = ay - cy;
  const a = dx * dx + dy * dy;
  const b = 2 * (fx * dx + fy * dy);
  const c = fx * fx + fy * fy - radius * radius;

  if (a < EPS) {
    return c <= 0 ? [0, 1] : null;
  }

  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) {
    return c <= 0 ? [0, 1] : null;
  }

  const root = Math.sqrt(discriminant);
  const t0 = (-b - root) / (2 * a);
  const t1 = (-b + root) / (2 * a);
  const lo = clamp(Math.min(t0, t1), 0, 1);
  const hi = clamp(Math.max(t0, t1), 0, 1);
  if (hi < 0 || lo > 1 || lo > hi) return null;
  return [lo, hi];
}

export function intervalsOverlap(aMin, aMax, bMin, bMax) {
  return aMax >= bMin && bMax >= aMin;
}

export function formatNumber(value, decimals = 4) {
  if (!Number.isFinite(value)) return String(value);
  return Number(value.toFixed(decimals)).toString();
}
