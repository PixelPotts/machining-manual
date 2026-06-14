export class HeightfieldRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.lastStock = null;
    this.lastEvents = [];
  }

  render(stock, events = []) {
    this.lastStock = stock;
    this.lastEvents = events;

    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#080a0e';
    ctx.fillRect(0, 0, width, height);

    if (!stock) return;

    const margin = 36;
    const sx = (width - margin * 2) / (stock.maxX - stock.minX);
    const sy = (height - margin * 2) / (stock.maxY - stock.minY);
    const scale = Math.min(sx, sy);
    const ox = margin + (width - margin * 2 - (stock.maxX - stock.minX) * scale) / 2;
    const oy = margin + (height - margin * 2 - (stock.maxY - stock.minY) * scale) / 2;

    const image = ctx.createImageData(stock.nx, stock.ny);
    const range = stock.topZ - stock.bottomZ;
    for (let iy = 0; iy < stock.ny; iy++) {
      for (let ix = 0; ix < stock.nx; ix++) {
        const srcIdx = iy * stock.nx + ix;
        const dstIdx = ((stock.ny - 1 - iy) * stock.nx + ix) * 4;
        const h = stock.heights[srcIdx];
        const normalized = Math.max(0, Math.min(1, (h - stock.bottomZ) / range));
        const shade = Math.round(42 + normalized * 170);
        image.data[dstIdx] = shade;
        image.data[dstIdx + 1] = shade + 10;
        image.data[dstIdx + 2] = shade + 18;
        image.data[dstIdx + 3] = 255;
      }
    }

    const offscreen = document.createElement('canvas');
    offscreen.width = stock.nx;
    offscreen.height = stock.ny;
    offscreen.getContext('2d').putImageData(image, 0, 0);

    const drawW = (stock.maxX - stock.minX) * scale;
    const drawH = (stock.maxY - stock.minY) * scale;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(offscreen, ox, oy, drawW, drawH);

    ctx.strokeStyle = '#d7dde8';
    ctx.lineWidth = 1;
    ctx.strokeRect(ox, oy, drawW, drawH);

    ctx.fillStyle = '#c4cad5';
    ctx.font = '12px ui-monospace, monospace';
    ctx.fillText(`X ${stock.minX} .. ${stock.maxX}`, ox, oy + drawH + 18);
    ctx.save();
    ctx.translate(ox - 14, oy + drawH);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`Y ${stock.minY} .. ${stock.maxY}`, 0, 0);
    ctx.restore();

    for (const event of events.filter(e => e.position)) {
      const x = Number(event.position.x);
      const y = Number(event.position.y);
      if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
      const px = ox + (x - stock.minX) * scale;
      const py = oy + drawH - (y - stock.minY) * scale;
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fillStyle = event.severity === 'fail' ? '#ff3b30' : '#ffcc00';
      ctx.fill();
      ctx.strokeStyle = '#111';
      ctx.stroke();
    }
  }
}
