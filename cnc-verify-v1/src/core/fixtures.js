import { AABB } from './aabb.js';

export function makeFixtureBox(params = {}) {
  return new AABB(
    params.minX ?? 1.4,
    params.minY ?? -0.4,
    params.minZ ?? -0.75,
    params.maxX ?? 1.75,
    params.maxY ?? 0.2,
    params.maxZ ?? 0.85,
    params.label ?? 'fixture box'
  );
}
