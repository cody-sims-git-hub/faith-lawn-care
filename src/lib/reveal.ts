/**
 * Scroll-reveal engine — a dependency-free companion to the CSS in global.css.
 * Elements marked `data-reveal` ease into place the first time they enter the
 * viewport (one-shot; unobserved after they reveal).
 *
 * A `data-reveal-group` ancestor cascades its tagged descendants so a grid
 * ripples in rather than appearing all at once:
 *   - data-reveal-stagger: ms between children (default 70)
 *   - data-reveal-delay:   ms before the first child (default 0)
 *
 * Degrades cleanly: with no IntersectionObserver, or under
 * prefers-reduced-motion, everything is revealed immediately.
 */
export function initReveal(root: ParentNode = document): void {
  const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
  if (els.length === 0) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
    const step = Number(group.dataset.revealStagger) || 70;
    const base = Number(group.dataset.revealDelay) || 0;
    group.querySelectorAll<HTMLElement>("[data-reveal]").forEach((child, i) => {
      if (!child.style.getPropertyValue("--reveal-delay")) {
        child.style.setProperty("--reveal-delay", `${base + i * step}ms`);
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  els.forEach((el) => observer.observe(el));

  // Jumping straight to an in-page anchor must not land on an empty band: the
  // target's contents would still be opacity:0 until the observer caught up.
  // Anything inside a hash target is shown at once.
  const revealHashTarget = () => {
    const id = location.hash.slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    const inside = [
      ...(target.matches("[data-reveal]") ? [target as HTMLElement] : []),
      ...Array.from(target.querySelectorAll<HTMLElement>("[data-reveal]")),
    ];
    inside.forEach((el) => {
      el.style.setProperty("--reveal-delay", "0ms");
      el.classList.add("is-revealed");
      observer.unobserve(el);
    });
  };

  revealHashTarget();
  window.addEventListener("hashchange", revealHashTarget);
}
