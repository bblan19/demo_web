/* engine/player.js: bộ phát bước dùng chung cho các bài mô phỏng.
 *
 * Bộ phát giữ danh sách bước (theo docs/dinh-dang-du-lieu.md), bước hiện tại và việc phát tự động.
 * Phần vẽ không nằm ở đây: mỗi bài đưa vào một hàm render để vẽ bước ra màn hình.
 *
 * Cách dùng:
 *   const player = Player.create({
 *     render(step, info) { ... },              // vẽ một bước; info = { k, total, prev, animate, delay }
 *     buttons: { play, back, next, reset },    // phần tử nút, không bắt buộc
 *     speed: sliderElement,                    // thanh tốc độ 1..5, không bắt buộc (mặc định mức 3)
 *     onFinish() { ... },                      // gọi khi chạy tới bước cuối, không bắt buộc
 *     ignoreKey(e) { return false; },          // trả về true để bỏ qua phím tắt, không bắt buộc
 *     keys: true,                              // false nếu không muốn phím tắt
 *     labels: { play, pause, replay }          // chữ trên nút Phát, không bắt buộc
 *   });
 *   player.setSteps(steps);                    // nạp danh sách bước và hiện bước đầu tiên
 *
 * Phím tắt: Space phát / tạm dừng, ← lùi, → tới, R làm lại.
 *
 * info.animate là true khi vừa tiến đúng 1 bước và cần chạy hiệu ứng; info.delay là số ms
 * của mỗi bước theo thanh tốc độ, hàm render có thể dùng để chọn thời gian hiệu ứng.
 */
(function (root) {
  "use strict";

  const DELAYS = [1600, 1100, 700, 400, 180];      // ms mỗi bước, theo thanh tốc độ 1..5

  function create(opts) {
    const o = opts || {};
    const btn = o.buttons || {};
    const labels = Object.assign({ play: "▶ Phát", pause: "⏸ Tạm dừng", replay: "▶ Phát lại" }, o.labels);
    const render = o.render || function () {};

    let steps = [], k = 0, playing = false, timer = null;

    const last = () => steps.length - 1;

    function delay() {
      const v = o.speed ? Number(o.speed.value) : 3;
      return DELAYS[Math.max(1, Math.min(DELAYS.length, v)) - 1];
    }

    function updateButtons() {
      const atEnd = k >= last();
      if (btn.play) btn.play.textContent = playing ? labels.pause : (atEnd ? labels.replay : labels.play);
      if (btn.back) btn.back.disabled = k === 0;
      if (btn.next) btn.next.disabled = atEnd;
    }

    function draw(animate) {
      const step = steps[k];
      if (!step) return;
      render(step, { k, total: steps.length, prev: steps[k - 1], animate, delay: delay() });
      updateButtons();
    }

    function go(target, animate) {
      target = Math.max(0, Math.min(last(), target));
      if (target === k && !animate) return;
      const forward = target === k + 1;
      k = target;
      draw(animate && forward);
      if (k === last()) { stop(); if (o.onFinish) o.onFinish(); }
    }

    function tick() {
      if (!playing) return;
      timer = setTimeout(() => { go(k + 1, true); if (playing) tick(); }, delay());
    }

    function play() {
      if (k >= last()) k = 0;
      playing = true; tick(); updateButtons();
    }

    function stop() {
      playing = false; clearTimeout(timer);
      updateButtons();
    }

    function toggle() { playing ? stop() : play(); }
    function next() { stop(); go(k + 1, true); }
    function back() { stop(); go(k - 1, false); }
    function reset() { stop(); k = 0; draw(false); }

    function setSteps(list) {
      stop();
      steps = list || [];
      k = 0;
      draw(false);
    }

    function onKey(e) {
      const tag = e.target && e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (o.ignoreKey && o.ignoreKey(e)) return;
      if (e.key === " ") { e.preventDefault(); toggle(); }
      else if (e.key === "ArrowRight") { if (k < last()) next(); }
      else if (e.key === "ArrowLeft") { if (k > 0) back(); }
      else if (e.key === "r" || e.key === "R") reset();
    }

    if (btn.play) btn.play.onclick = toggle;
    if (btn.next) btn.next.onclick = next;
    if (btn.back) btn.back.onclick = back;
    if (btn.reset) btn.reset.onclick = reset;
    const useKeys = o.keys !== false && typeof document !== "undefined";
    if (useKeys) document.addEventListener("keydown", onKey);

    function destroy() {
      stop();
      if (useKeys) document.removeEventListener("keydown", onKey);
      for (const name of ["play", "next", "back", "reset"]) if (btn[name]) btn[name].onclick = null;
    }

    return {
      setSteps, go, play, stop, toggle, next, back, reset, redraw: () => draw(false), updateButtons, destroy,
      get k() { return k; },
      get steps() { return steps; },
      get playing() { return playing; }
    };
  }

  const api = { create, DELAYS };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Player = api;
})(typeof window !== "undefined" ? window : this);
