"use client";

import { useEffect, useRef } from "react";

/**
 * Global black curtain that bridges the visible seam between heroes.
 *
 * Each hero is full-viewport; when the user sits between two of them (light
 * scroll), the curtain fills the viewport with black, hiding both images'
 * edges so you no longer see a dividing line. Opacity rises smoothly as the
 * nearest hero moves off-center and disappears when a hero is centered.
 *
 * Heroes must set `data-hero-section="true"` on their root element.
 */
export default function HeroCurtain() {
  const curtainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let rafId: number | null = null;
    let sections: HTMLElement[] = [];
    let currentOpacity = 0;
    let targetOpacity = 0;
    // Smoothing factor per frame — lower = slower fade in/out.
    // At 60fps this reaches ~63% of the target in ~230ms.
    const SMOOTHING = 0.06;

    const refresh = () => {
      sections = Array.from(
        document.querySelectorAll<HTMLElement>('[data-hero-section="true"]')
      );
    };

    const computeTarget = () => {
      if (sections.length === 0) return 0;

      const vh = window.innerHeight;
      let maxVisibility = 0;
      let hasAbove = false;
      let hasBelow = false;

      for (const s of sections) {
        const rect = s.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const raw = (vh / 2 - center) / vh;
        const progress = Math.max(-1, Math.min(1, raw));
        if (progress > 0.02) hasAbove = true;
        if (progress < -0.02) hasBelow = true;

        // Plateau of full visibility near centered, then smoothstep to 0.
        // Paired with the exponential smoothing above, the overall fade feels
        // gentle even during fast scrolls.
        const abs = Math.abs(progress);
        const t = Math.max(0, Math.min(1, (abs - 0.08) / 0.27));
        const vis = 1 - t * t * (3 - 2 * t); // inverse smoothstep

        if (vis > maxVisibility) maxVisibility = vis;
      }

      const between = hasAbove && hasBelow;
      return between ? (1 - maxVisibility) * 0.97 : 0;
    };

    // Continuous animation loop: eases currentOpacity toward targetOpacity
    // regardless of whether the user is actively scrolling. Stops when the
    // value has settled to avoid burning cycles.
    const tick = () => {
      rafId = null;
      const delta = targetOpacity - currentOpacity;
      if (Math.abs(delta) < 0.001) {
        currentOpacity = targetOpacity;
        curtain.style.opacity = currentOpacity.toFixed(3);
        return;
      }
      currentOpacity += delta * SMOOTHING;
      curtain.style.opacity = currentOpacity.toFixed(3);
      rafId = requestAnimationFrame(tick);
    };

    const schedule = () => {
      targetOpacity = computeTarget();
      if (rafId === null) rafId = requestAnimationFrame(tick);
    };

    const onResize = () => {
      refresh();
      schedule();
    };

    refresh();
    schedule();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    const t1 = window.setTimeout(onResize, 0);
    const t2 = window.setTimeout(onResize, 400);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={curtainRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[30] bg-black"
      style={{ opacity: 0 }}
    />
  );
}
