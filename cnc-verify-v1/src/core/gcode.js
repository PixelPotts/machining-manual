import { Vec3 } from './math.js';

const WORD_PATTERN = /([A-Z])\s*([+\-]?(?:\d+\.?\d*|\.\d+))/gi;

export function stripComments(line) {
  return line
    .replace(/\([^)]*\)/g, ' ')
    .replace(/;.*/g, ' ')
    .trim();
}

export function parseGCode(source) {
  const blocks = [];
  const lines = source.split(/\r?\n/);

  for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
    const raw = lines[lineNumber];
    const clean = stripComments(raw).toUpperCase();
    if (!clean) continue;

    const words = [];
    for (const match of clean.matchAll(WORD_PATTERN)) {
      words.push({ letter: match[1].toUpperCase(), value: Number(match[2]) });
    }
    if (!words.length) continue;

    blocks.push({ index: blocks.length + 1, lineNumber: lineNumber + 1, raw, clean, words });
  }

  return blocks;
}

export class MachineState {
  constructor() {
    this.units = 'inch';
    this.absolute = true;
    this.motion = null;
    this.plane = 'G17';
    this.position = new Vec3(0, 0, 1);
    this.feed = null;
    this.spindleOn = false;
    this.spindleSpeed = null;
    this.currentToolId = null;
    this.toolLengthComp = false;
    this.h = null;
    this.workOffset = 'G54';
  }

  clone() {
    const next = new MachineState();
    Object.assign(next, this);
    next.position = this.position.clone();
    return next;
  }
}

export function compileBlocks(blocks) {
  const state = new MachineState();
  const segments = [];
  const events = [];

  for (const block of blocks) {
    const before = state.clone();
    let target = state.position.clone();
    let hasAxis = false;
    let pendingTool = null;
    let explicitMotion = null;

    for (const word of block.words) {
      const { letter, value } = word;
      if (letter === 'G') {
        const g = Math.round(value);
        if (g === 0 || g === 1) {
          explicitMotion = `G${g}`;
          state.motion = explicitMotion;
        } else if (g === 17) {
          state.plane = 'G17';
        } else if (g === 20) {
          state.units = 'inch';
        } else if (g === 21) {
          state.units = 'mm';
        } else if (g === 40) {
          // Cutter comp cancel is accepted but not modeled in V1.
        } else if (g === 43) {
          state.toolLengthComp = true;
        } else if (g === 49) {
          state.toolLengthComp = false;
          state.h = null;
        } else if (g === 53) {
          events.push({ type: 'warning', block, message: 'G53 machine-coordinate move parsed as normal coordinate move in V1.' });
        } else if (g === 54 || g === 55 || g === 56 || g === 57 || g === 58 || g === 59) {
          state.workOffset = `G${g}`;
        } else if (g === 80) {
          state.motion = null;
        } else if (g === 90) {
          state.absolute = true;
        } else if (g === 91) {
          state.absolute = false;
        } else {
          events.push({ type: 'unsupported', block, message: `Unsupported G-code G${value}. V1 accepts G0/G1 plus setup modal codes.` });
        }
      } else if (letter === 'M') {
        const m = Math.round(value);
        if (m === 3 || m === 4) state.spindleOn = true;
        else if (m === 5) state.spindleOn = false;
        else if (m === 6) {
          if (pendingTool != null) state.currentToolId = pendingTool;
        }
      } else if (letter === 'T') {
        pendingTool = Math.round(value);
      } else if (letter === 'H') {
        state.h = Math.round(value);
      } else if (letter === 'S') {
        state.spindleSpeed = value;
      } else if (letter === 'F') {
        state.feed = value;
      } else if (letter === 'X' || letter === 'Y' || letter === 'Z') {
        hasAxis = true;
        const axis = letter.toLowerCase();
        if (state.absolute) target[axis] = value;
        else target[axis] += value;
      }
    }

    if (pendingTool != null && !block.words.some(word => word.letter === 'M' && Math.round(word.value) === 6)) {
      state.currentToolId = pendingTool;
    }

    if (hasAxis) {
      const motion = explicitMotion ?? state.motion;
      if (!motion) {
        events.push({ type: 'error', block, message: 'Axis move without active G0/G1 motion mode.' });
      } else {
        segments.push({
          block,
          before,
          after: state.clone(),
          motion,
          start: before.position.clone(),
          end: target.clone(),
          spindleOn: state.spindleOn,
          feed: state.feed,
          toolId: state.currentToolId,
          h: state.h,
          toolLengthComp: state.toolLengthComp,
          workOffset: state.workOffset,
          raw: block.raw
        });
      }
      state.position = target;
    }
  }

  return { segments, events, finalState: state };
}
