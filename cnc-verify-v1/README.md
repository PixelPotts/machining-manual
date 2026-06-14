# CNC Verify V1

A serious browser-first CNC verification kernel scaffold.

This is not a visual-only simulator. The safety authority is a conservative dexel stock model plus swept tool components. The canvas is only a view of the stock state and reported event points.

## Run

```bash
cd cnc-verify-v1
npm run serve
```

Open:

```text
http://localhost:8080
```

## Test

```bash
cd cnc-verify-v1
npm test
```

## What V1 models

- 3-axis XYZ milling
- G0/G1 moves
- G20/G21, G90/G91, G17, G40, G43/G49, G54-G59, M3/M5, T/M6, F/S words
- Rectangular stock represented as a single top dexel heightfield
- Flat endmill cutter zone
- Shank forbidden zone
- Holder forbidden zone
- Fixture box collision
- Continuous-ish swept checks against dexel cells using conservative swept disks and vertical interval overlap
- Deterministic event reports by block and source line

## Core files

```text
src/core/gcode.js        parses and compiles modal G-code state into motion segments
src/core/stock.dexel.js  owns the dexel stock and stock/tool swept contact checks
src/core/tools.js        defines cutter/shank/holder zones
src/core/fixtures.js     defines fixture primitives
src/core/verifier.js     rule engine and report generation
src/verifier.worker.js   runs verification off the UI thread
src/render/canvas.js     heightfield visualization only
```

## Safety model

Allowed:

```text
G1 + spindle on + cutter touches stock
```

Forbidden:

```text
G0 cutter touches stock
cutter touches stock with spindle off
shank touches stock
holder touches stock
any tool component touches fixture
missing/incorrect G43 H tool length state
undefined tool
unsupported motion that would require guessing
```

## Known V1 limits

This is the kernel foundation, not the final machine twin.

- No arcs yet. Add G2/G3 by converting arcs to chord-tolerance line segments before verification.
- No canned cycles yet. Expand them to primitive moves before verification.
- No cutter comp yet. Reject it until modeled.
- No 4/5-axis kinematics yet.
- Stock is 2.5D dexel, so no undercuts or vertical side-wall triangle mesh authority.
- Holder is approximated as vertical cylinders.
- No WebGPU path yet. The worker CPU path is the correctness baseline; GPU should only accelerate the same kernel after tests lock behavior.

## Next hardening steps

1. Add arc canonicalization: G2/G3 to G1 segments using chord error.
2. Add operation-level target model gouge check.
3. Add BVH for many fixtures/clamps.
4. Add real machine envelope and spindle-head geometry.
5. Add 4-axis transform stack.
6. Add WebGPU compute backend for dexel contact scans after the CPU verifier is locked by tests.
