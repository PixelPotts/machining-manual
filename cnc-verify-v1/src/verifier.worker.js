import { verifyGCode } from './core/verifier.js';

self.onmessage = event => {
  const { id, payload } = event.data;
  try {
    const result = verifyGCode(payload);
    self.postMessage({ id, ok: true, result }, [result.stock.heights.buffer]);
  } catch (error) {
    self.postMessage({ id, ok: false, error: error instanceof Error ? error.message : String(error) });
  }
};
