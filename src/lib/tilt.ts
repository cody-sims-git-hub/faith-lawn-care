/**
 * Pointer-tracked 3D tilt for `[data-tilt]` elements.
 *
 * The transform itself lives in CSS (`.tilt-card` in global.css); this only
 * writes two custom properties and a sheen position. That split matters:
 *   - with JS off, or on a touch device, the card is a normal flat card,
 *   - reduced-motion users never get the handler attached at all,
 *   - no layout is read during the move (the rect is cached on enter), so this
 *     cannot cause scroll-linked layout thrash.
 *
 * Tilt strength is per-element via `data-tilt="<degrees>"` (default 7).
 */

const MAX_DEFAULT = 7;

export function initTilt(root: ParentNode = document): () => void {
  const els = Array.from(root.querySelectorAll<HTMLElement>("[data-tilt]"));
  if (els.length === 0) return () => {};

  // A tilt that follows a finger is meaningless — the finger is on top of the
  // card. Pointer-precision devices only.
  const fine = window.matchMedia("(pointer: fine)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduced) return () => {};

  const cleanups: Array<() => void> = [];

  for (const el of els) {
    const max = Number(el.dataset.tilt) || MAX_DEFAULT;
    let rect: DOMRect | null = null;
    let frame = 0;

    const onEnter = () => {
      rect = el.getBoundingClientRect();
      el.classList.add("tilt-card-active");
    };

    const onMove = (event: PointerEvent) => {
      if (!rect) rect = el.getBoundingClientRect();
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!rect) return;
        // -0.5..0.5 from the element's centre.
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        // Pointer below centre tips the card's top toward the viewer, so
        // rotateX takes the negated Y.
        el.style.setProperty("--tilt-x", String(-py * max * 2));
        el.style.setProperty("--tilt-y", String(px * max * 2));
        el.style.setProperty("--sheen-x", `${(px + 0.5) * 100}%`);
        el.style.setProperty("--sheen-y", `${(py + 0.5) * 100}%`);
      });
    };

    const onLeave = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      rect = null;
      el.classList.remove("tilt-card-active");
      el.style.setProperty("--tilt-x", "0");
      el.style.setProperty("--tilt-y", "0");
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    cleanups.push(() => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    });
  }

  return () => cleanups.forEach((fn) => fn());
}
