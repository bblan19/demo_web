/*
 * engine/render-array.js: bộ vẽ mảng dùng chung cho các bài mô phỏng.
 * Tách từ demo Sắp xếp (layout, roundRect, draw, hiệu ứng trượt), thêm vẽ lưới 2 chiều.
 * Đọc bước mô phỏng theo docs/dinh-dang-du-lieu.md, mục 2: array hoặc grid, compare, swap, done, ptr, ids.
 *
 * Cách dùng (nạp bằng thẻ <script>, không cần ES module):
 *   <script src="engine/render-array.js"></script>
 *   RenderArray.draw(canvas, step, { present: false });                      // vẽ tĩnh một bước
 *   const h = RenderArray.animate(canvas, step, prevStep, { duration: 400 }); // trượt nếu step.anim === "swap"
 *   h.cancel();                                                               // huỷ hiệu ứng khi đổi bước hoặc tạm dừng
 *
 * Màu lấy từ biến CSS của canvas (kế thừa từ :root). Trang dùng bộ vẽ phải khai báo:
 *   --st-idle, --st-idle-b, --st-cmp, --st-cmp-b, --st-swap, --st-swap-b,
 *   --st-done, --st-done-b, --ink, --quiet, --font
 *
 * Tuỳ chọn (opt), đều không bắt buộc:
 *   present   true khi ở chế độ trình chiếu (chữ và khoảng cách lớn hơn)
 *   duration  thời lượng trượt, ms (animate, mặc định 450)
 *   prev, t   bước trước và tiến độ trượt 0..1 (draw dùng khi tự điều khiển hiệu ứng)
 *   colors    bảng màu từ readColors(), để khỏi đọc lại ở mỗi khung hình
 *   layout    ghi đè tham số bố cục (xem layout và layoutGrid)
 *   onDone    hàm gọi khi hiệu ứng trượt kết thúc
 */
(function (global) {
  "use strict";

  const COLOR_VARS = {
    idle: "--st-idle", idleB: "--st-idle-b", cmp: "--st-cmp", cmpB: "--st-cmp-b",
    swap: "--st-swap", swapB: "--st-swap-b", done: "--st-done", doneB: "--st-done-b",
    ink: "--ink", quiet: "--quiet"
  };
  let warned = false;

  /** Đọc bảng màu từ biến CSS của canvas. Thiếu biến nào thì báo một lần và dùng màu "gray". */
  function readColors(canvas) {
    const cs = getComputedStyle(canvas), out = {}, missing = [];
    Object.keys(COLOR_VARS).forEach((k) => {
      let v = cs.getPropertyValue(COLOR_VARS[k]).trim();
      if (!v) { missing.push(COLOR_VARS[k]); v = "gray"; }
      out[k] = v;
    });
    out.font = cs.getPropertyValue("--font").trim() || "sans-serif";
    if (missing.length && !warned) { warned = true; console.warn("RenderArray: thiếu biến CSS " + missing.join(", ")); }
    return out;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  /** Bố cục một hàng n ô trong bề rộng W. Ô vuông 24..72px; hẹp quá thì thu khoảng cách còn 6px. */
  function layout(n, W, o) {
    o = o || {};
    const pad = o.pad == null ? 20 : o.pad, maxCell = o.maxCell || 72, minCell = o.minCell || 24;
    let gap = o.gap == null ? 12 : o.gap;
    let cell = (W - 2 * pad - gap * (n - 1)) / n;
    if (cell < 34 && gap > 6) { gap = 6; cell = (W - 2 * pad - gap * (n - 1)) / n; }
    cell = Math.max(minCell, Math.min(maxCell, cell));
    const x0 = (W - (n * cell + (n - 1) * gap)) / 2;
    return { cell, gap, x0, xAt: (p) => x0 + p * (cell + gap) };
  }

  /** Bố cục lưới rows × cols trong khung W × H, chừa chỗ cho chỉ số cột (trên) và chỉ số hàng (trái). */
  function layoutGrid(rows, cols, W, H, o) {
    o = o || {};
    const gap = o.gap == null ? 8 : o.gap, maxCell = o.maxCell || 64, minCell = o.minCell || 24;
    const pad = o.pad == null ? 20 : o.pad, labelW = o.labelW == null ? 28 : o.labelW;
    const labelH = o.labelH == null ? 30 : o.labelH, padB = o.padBottom == null ? 12 : o.padBottom;
    const byW = (W - 2 * pad - labelW - gap * (cols - 1)) / cols;
    const byH = (H - labelH - padB - gap * (rows - 1)) / rows;
    const cell = Math.max(minCell, Math.min(maxCell, byW, byH));
    const totalW = cols * cell + (cols - 1) * gap, totalH = rows * cell + (rows - 1) * gap;
    const x0 = (W - totalW + labelW) / 2;
    const y0 = labelH + Math.max(0, (H - labelH - padB - totalH) / 2);
    return { cell, gap, x0, y0, totalW, totalH, xAt: (c) => x0 + c * (cell + gap), yAt: (r) => y0 + r * (cell + gap) };
  }

  /** Trạng thái của từng ô. Ưu tiên swap, rồi compare, rồi done; không thuộc trường nào là idle. */
  function makeStatus(step, isGrid) {
    const key = isGrid ? (a) => a[0] + "," + a[1] : (a) => String(a), sets = {};
    ["swap", "compare", "done"].forEach((f) => {
      sets[f] = {};
      (step[f] || []).forEach((a) => { sets[f][key(a)] = true; });
    });
    return (k) => (sets.swap[k] ? "swap" : sets.compare[k] ? "compare" : sets.done[k] ? "done" : "idle");
  }
  /** pos là chỉ số (mảng 1 chiều) hoặc [hàng, cột] (lưới). */
  function stateOf(step, pos) {
    const g = Array.isArray(pos);
    return makeStatus(step, g)(g ? pos[0] + "," + pos[1] : String(pos));
  }

  function styleOf(state, C) {
    if (state === "swap") return { fill: C.swap, border: C.swapB, lw: 3.5, dash: [6, 4] };
    if (state === "compare") return { fill: C.cmp, border: C.cmpB, lw: 3.5, dash: [] };
    if (state === "done") return { fill: C.done, border: C.doneB, lw: 2, dash: [] };
    return { fill: C.idle, border: C.idleB, lw: 1.5, dash: [] };
  }

  function drawCell(ctx, x, y, size, value, state, C) {
    const s = styleOf(state, C);
    roundRect(ctx, x, y, size, size, 9);
    ctx.fillStyle = s.fill; ctx.fill();
    ctx.setLineDash(s.dash); ctx.lineWidth = s.lw; ctx.strokeStyle = s.border; ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = C.ink; ctx.font = "600 " + Math.round(size * 0.38) + "px " + C.font;
    ctx.fillText(value, x + size / 2, y + size / 2 + 1);
    if (state === "done") {
      ctx.font = "700 " + Math.round(size * 0.26) + "px " + C.font; ctx.fillStyle = s.border;
      ctx.fillText("✓", x + size - Math.max(8, size * 0.16), y + Math.max(9, size * 0.17));
    }
  }

  function drawRow(ctx, step, W, C, o) {
    const n = step.array.length, big = !!o.present, L = layout(n, W, o.layout), ch = L.cell;
    const yTop = big ? 58 : 46, status = makeStatus(step, false);
    const t = o.t == null ? 1 : o.t, prevIds = o.prev && o.prev.ids, ids = step.ids;

    ctx.font = (big ? 15 : 13) + "px " + C.font; ctx.fillStyle = C.quiet;
    for (let p = 0; p < n; p++) ctx.fillText(p, L.xAt(p) + ch / 2, yTop - 16);

    for (let p = 0; p < n; p++) {
      let x = L.xAt(p);
      if (prevIds && ids && t < 1) {                       // hiệu ứng trượt: ô nhận ra bằng mã ids
        const from = prevIds.indexOf(ids[p]);
        if (from >= 0) x = L.xAt(from) + (L.xAt(p) - L.xAt(from)) * ease(t);
      }
      drawCell(ctx, x, yTop, ch, step.array[p], status(String(p)), C);
    }

    const byCell = {};                                     // con trỏ: trùng ô thì gộp tên, ngoài 0..n−1 thì bỏ
    Object.keys(step.ptr || {}).forEach((name) => {
      const p = step.ptr[name];
      if (Number.isInteger(p) && p >= 0 && p < n) (byCell[p] = byCell[p] || []).push(name);
    });
    ctx.font = "600 " + (big ? 17 : 15) + "px " + C.font; ctx.fillStyle = C.ink;
    Object.keys(byCell).forEach((p) => {
      const cx = L.xAt(+p) + ch / 2;
      ctx.fillText("▲", cx, yTop + ch + 16);
      ctx.fillText(byCell[p].join(", "), cx, yTop + ch + 36);
    });
  }

  function drawGrid(ctx, step, W, H, C, o) {
    const rows = step.grid.length;
    if (!rows) return;
    const cols = Math.max.apply(null, step.grid.map((r) => r.length));
    const L = layoutGrid(rows, cols, W, H, o.layout), status = makeStatus(step, true), big = !!o.present;
    ctx.font = (big ? 15 : 13) + "px " + C.font; ctx.fillStyle = C.quiet;
    for (let c = 0; c < cols; c++) ctx.fillText(c, L.xAt(c) + L.cell / 2, L.y0 - 14);
    for (let r = 0; r < rows; r++) ctx.fillText(r, L.x0 - 14, L.yAt(r) + L.cell / 2);
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < step.grid[r].length; c++)
        drawCell(ctx, L.xAt(c), L.yAt(r), L.cell, step.grid[r][c], status(r + "," + c), C);
  }

  /** Vẽ một bước (array hoặc grid) lên canvas. Kích thước lấy từ canvas.clientWidth/clientHeight (đặt bằng CSS). */
  function draw(canvas, step, opt) {
    opt = opt || {};
    const isGrid = Array.isArray(step.grid);
    if (!isGrid && !Array.isArray(step.array)) throw new TypeError("RenderArray.draw: bước cần có array hoặc grid");
    const W = canvas.clientWidth, H = canvas.clientHeight;
    if (!W || !H) return;                                  // canvas đang ẩn
    const dpr = opt.dpr || global.devicePixelRatio || 1;
    const bw = Math.round(W * dpr), bh = Math.round(H * dpr);
    if (canvas.width !== bw || canvas.height !== bh) { canvas.width = bw; canvas.height = bh; }
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const C = opt.colors || readColors(canvas);
    if (isGrid) drawGrid(ctx, step, W, H, C, opt); else drawRow(ctx, step, W, C, opt);
  }

  /** Vẽ bước có hiệu ứng trượt nếu step.anim === "swap" và có bước trước; ngược lại vẽ tĩnh. Trả về { cancel }. */
  function animate(canvas, step, prev, opt) {
    opt = opt || {};
    if (step.anim !== "swap" || !prev) {
      draw(canvas, step, opt);
      return { cancel: function () {} };
    }
    const dur = opt.duration == null ? 450 : opt.duration, t0 = performance.now();
    const colors = opt.colors || readColors(canvas);
    let id = 0, stopped = false;
    function frame(now) {
      if (stopped) return;
      const t = Math.min(1, (now - t0) / dur);
      draw(canvas, step, Object.assign({}, opt, { prev: prev, t: t, colors: colors }));
      if (t < 1) id = requestAnimationFrame(frame);
      else if (opt.onDone) opt.onDone();
    }
    id = requestAnimationFrame(frame);
    return { cancel: function () { stopped = true; cancelAnimationFrame(id); } };
  }

  global.RenderArray = { draw, animate, layout, layoutGrid, roundRect, readColors, stateOf, ease };
})(typeof window !== "undefined" ? window : globalThis);
