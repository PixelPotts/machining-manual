import assert from 'node:assert/strict';
import { verifyGCode } from '../src/core/verifier.js';
import { SAFE_SAMPLE, CRASH_SAMPLE } from '../src/samples.js';

const stockParams = {
  minX: -1,
  maxX: 3,
  minY: -1,
  maxY: 3,
  topZ: 0,
  bottomZ: -0.75,
  cell: 0.05
};

const toolParams = {
  diameter: 0.25,
  fluteLength: 0.75,
  shankDiameter: 0.25,
  shankLength: 1.25,
  holderDiameter: 1.25,
  holderLength: 1
};

const fixtureParams = {
  minX: 1.4,
  maxX: 1.75,
  minY: -0.4,
  maxY: 0.2,
  minZ: -0.75,
  maxZ: 0.85,
  label: 'fixture box'
};

const safe = verifyGCode({ gcode: SAFE_SAMPLE, stockParams, toolParams, fixtureParams });
assert.equal(safe.ok, true, JSON.stringify(safe.events, null, 2));
assert.ok(safe.cutCount > 0);

const crash = verifyGCode({ gcode: CRASH_SAMPLE, stockParams, toolParams, fixtureParams });
assert.equal(crash.ok, false);
assert.ok(crash.events.some(event => event.severity === 'fail'));

const missingH = verifyGCode({
  gcode: `G90 G20\nT1 M6\nS3000 M3\nG0 X0 Y0 Z1\nG1 Z-.1 F10`,
  stockParams,
  toolParams,
  fixtureParams
});
assert.equal(missingH.ok, false);
assert.ok(missingH.events.some(event => event.kind === 'setup'));

console.log('All verifier tests passed.');
