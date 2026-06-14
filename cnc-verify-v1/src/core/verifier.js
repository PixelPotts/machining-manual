import { parseGCode, compileBlocks } from './gcode.js';
import { DexelStock } from './stock.dexel.js';
import { defaultToolLibrary } from './tools.js';
import { makeFixtureBox } from './fixtures.js';
import { formatNumber, intervalsOverlap } from './math.js';
import { sweptVerticalCylinderIntersectsBox } from './aabb.js';

function makeEvent(kind, severity, segment, message, extra = {}) {
  return {
    kind,
    severity,
    block: segment?.block?.index ?? extra.blockIndex ?? null,
    lineNumber: segment?.block?.lineNumber ?? extra.lineNumber ?? null,
    raw: segment?.raw ?? extra.raw ?? '',
    message,
    ...extra
  };
}

function firstHit(hits) {
  if (!hits.length) return null;
  hits.sort((a, b) => a.t - b.t || b.stockHeight - a.stockHeight);
  return hits[0];
}

function checkToolReadiness(segment, tools) {
  if (!segment.toolId) {
    return makeEvent('setup', 'fail', segment, 'Move attempted before a tool was selected.');
  }
  const tool = tools.get(segment.toolId);
  if (!tool) {
    return makeEvent('setup', 'fail', segment, `Tool T${segment.toolId} is not defined in the tool library.`);
  }
  if (!segment.toolLengthComp) {
    return makeEvent('setup', 'fail', segment, `T${segment.toolId} move without active G43 tool length compensation.`);
  }
  if (segment.h !== tool.h) {
    return makeEvent('setup', 'fail', segment, `T${segment.toolId} expected H${tool.h}, got H${segment.h ?? 'none'}.`);
  }
  return null;
}

function checkFixtureCollision(segment, fixtures, tool) {
  for (const component of tool.components) {
    const [zMin0, zMax0] = component.zRangeAtTip(segment.start.z);
    const [zMin1, zMax1] = component.zRangeAtTip(segment.end.z);
    for (const fixture of fixtures) {
      if (sweptVerticalCylinderIntersectsBox(segment.start, segment.end, component.radius, zMin0, zMax0, zMin1, zMax1, fixture)) {
        return makeEvent(
          'fixture-collision',
          'fail',
          segment,
          `${component.name} intersects ${fixture.label}.`,
          {
            component: component.name,
            fixture: fixture.label,
            position: {
              x: formatNumber((segment.start.x + segment.end.x) * 0.5),
              y: formatNumber((segment.start.y + segment.end.y) * 0.5),
              z: formatNumber((segment.start.z + segment.end.z) * 0.5)
            }
          }
        );
      }
    }
  }
  return null;
}

function checkMachineBounds(segment, bounds) {
  if (!bounds) return null;
  const xs = [segment.start.x, segment.end.x];
  const ys = [segment.start.y, segment.end.y];
  const zs = [segment.start.z, segment.end.z];
  const bad = xs.some(x => x < bounds.minX || x > bounds.maxX)
    || ys.some(y => y < bounds.minY || y > bounds.maxY)
    || zs.some(z => z < bounds.minZ || z > bounds.maxZ);
  if (!bad) return null;
  return makeEvent('machine-limit', 'fail', segment, 'Move exceeds configured machine travel bounds.');
}

function verifySegmentAgainstStock(segment, stock, tool) {
  const cutter = tool.cutter();
  const cuttingMove = segment.motion === 'G1' && segment.spindleOn;

  if (!cuttingMove) {
    const hits = stock.sweptForbiddenContact(cutter, segment.start, segment.end, segment);
    const hit = firstHit(hits);
    if (hit) {
      return makeEvent(
        'rapid-stock-collision',
        'fail',
        segment,
        `${cutter.name} contacts stock during ${segment.motion}${segment.spindleOn ? '' : ' with spindle off'}.`,
        {
          component: cutter.name,
          t: formatNumber(hit.t),
          position: { x: formatNumber(hit.x), y: formatNumber(hit.y), z: formatNumber(hit.stockHeight) },
          stockHeight: formatNumber(hit.stockHeight)
        }
      );
    }
    return null;
  }

  for (const component of tool.components.filter(component => component.zone === 'forbidden')) {
    const hits = stock.sweptForbiddenContact(component, segment.start, segment.end, segment);
    const hit = firstHit(hits);
    if (hit) {
      return makeEvent(
        'forbidden-tool-stock-collision',
        'fail',
        segment,
        `${component.name} contacts stock. Only cutter contact is allowed.`,
        {
          component: component.name,
          t: formatNumber(hit.t),
          position: { x: formatNumber(hit.x), y: formatNumber(hit.y), z: formatNumber(hit.stockHeight) },
          stockHeight: formatNumber(hit.stockHeight),
          componentZMin: formatNumber(hit.componentZMin),
          componentZMax: formatNumber(hit.componentZMax)
        }
      );
    }
  }

  const removal = stock.removeBySweptFlatCutter(cutter, segment.start, segment.end);
  return makeEvent('cut', 'ok', segment, `Cut accepted: ${removal.removedCells} dexels updated.`, {
    removedCells: removal.removedCells,
    maxDepth: formatNumber(removal.maxDepth)
  });
}

export function verifyGCode({ gcode, stockParams, toolParams, fixtureParams, machineBounds = null }) {
  const blocks = parseGCode(gcode);
  const compiled = compileBlocks(blocks);
  const stock = new DexelStock(stockParams);
  const tools = defaultToolLibrary(toolParams);
  const fixtures = [makeFixtureBox(fixtureParams)];
  const events = [];
  let fatal = false;

  for (const parseEvent of compiled.events) {
    events.push({
      kind: parseEvent.type,
      severity: parseEvent.type === 'warning' ? 'warn' : 'fail',
      block: parseEvent.block.index,
      lineNumber: parseEvent.block.lineNumber,
      raw: parseEvent.block.raw,
      message: parseEvent.message
    });
    if (parseEvent.type !== 'warning') fatal = true;
  }

  if (!fatal) {
    for (const segment of compiled.segments) {
      const boundsEvent = checkMachineBounds(segment, machineBounds);
      if (boundsEvent) {
        events.push(boundsEvent);
        fatal = true;
        break;
      }

      const readinessEvent = checkToolReadiness(segment, tools);
      if (readinessEvent) {
        events.push(readinessEvent);
        fatal = true;
        break;
      }

      const tool = tools.get(segment.toolId);
      const fixtureEvent = checkFixtureCollision(segment, fixtures, tool);
      if (fixtureEvent) {
        events.push(fixtureEvent);
        fatal = true;
        break;
      }

      const stockEvent = verifySegmentAgainstStock(segment, stock, tool);
      if (stockEvent) {
        events.push(stockEvent);
        if (stockEvent.severity === 'fail') {
          fatal = true;
          break;
        }
      }
    }
  }

  const stockSummary = stock.summary();
  const failureCount = events.filter(event => event.severity === 'fail').length;
  const warningCount = events.filter(event => event.severity === 'warn').length;
  const cutCount = events.filter(event => event.kind === 'cut').length;

  return {
    ok: failureCount === 0,
    failureCount,
    warningCount,
    cutCount,
    events,
    stock: stock.toTransferable(),
    stockSummary,
    blocks: blocks.length,
    segments: compiled.segments.length,
    supported: {
      axes: '3-axis XYZ',
      moves: 'G0/G1',
      stock: 'single top dexel heightfield',
      tool: 'flat endmill + shank + holder vertical cylinders'
    },
    limitations: [
      'V1 intentionally rejects or warns on unsupported modal behavior rather than guessing.',
      'Arcs, cutter compensation, canned cycles, rotary axes, and full 3D undercuts are not modeled yet.',
      'Dexel stock is conservative for 2.5D milling and should over-report before it under-reports.'
    ]
  };
}
