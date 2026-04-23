"use client";

import { useEffect } from "react";

/**
 * Turns a *strong* scroll gesture (mouse-wheel click or hard trackpad flick)
 * into an instant jump to the neighbouring hero, while letting light scroll
 * sit between heroes naturally.
 *
 * Heuristics
 * ──────────
 * • Only active while the viewport is inside the stacked hero zone.
 * • Mouse wheel: discrete tick with a large delta → jump.
 * • Trackpad: burst of small deltas within a short window; if cumulative
 *   delta crosses a threshold quickly, jump. Slow scrolls accumulate to the
 *   threshold over a much longer window, which we explicitly ignore.
 * • Cooldown prevents queued jumps while a smooth scroll is in progress.
 */
export default function HeroFlickSnap() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const STRONG_DELTA = 90; // single-event delta that counts as a "flick"
    const BURST_WINDOW = 120; // ms — time window to sum trackpad ticks
    const BURST_THRESHOLD = 160; // sum within BURST_WINDOW → flick
    const COOLDOWN_MS = 700;

    let cooldown = false;
    let burstStart = 0;
    let burstSum = 0;

    const heroesFn = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>('[data-hero-section="true"]')
      );

    const getCurrentIndex = (heroes: HTMLElement[]) => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      // "Current" = the hero whose top is closest to — but not beyond —
      // the viewport's upper 30% mark.
      let idx = 0;
      for (let i = 0; i < heroes.length; i++) {
        if (heroes[i].offsetTop <= y + vh * 0.3) idx = i;
      }
      return idx;
    };

    const onWheel = (e: WheelEvent) => {
      const now = performance.now();
      if (cooldown) {
        e.preventDefault();
        return;
      }

      // Accumulate a short burst so trackpad flicks count too.
      if (now - burstStart > BURST_WINDOW) {
        burstStart = now;
        burstSum = 0;
      }
      burstSum += e.deltaY;

      const strongTick = Math.abs(e.deltaY) >= STRONG_DELTA;
      const strongBurst = Math.abs(burstSum) >= BURST_THRESHOLD;
      if (!strongTick && !strongBurst) return;

      const heroes = heroesFn();
      if (heroes.length === 0) return;

      const y = window.scrollY;
      const vh = window.innerHeight;
      const firstTop = heroes[0].offsetTop;
      const lastBottom =
        heroes[heroes.length - 1].offsetTop +
        heroes[heroes.length - 1].offsetHeight;

      // Outside the stacked hero zone — let native scroll through.
      if (y > lastBottom - vh * 0.5) return;
      if (y < firstTop - 10) return;

      const direction = (strongTick ? e.deltaY : burstSum) > 0 ? 1 : -1;
      const current = getCurrentIndex(heroes);
      const target = Math.max(
        0,
        Math.min(heroes.length - 1, current + direction)
      );
      if (target === current) return; // already at the edge — let native scroll

      e.preventDefault();
      cooldown = true;
      burstStart = 0;
      burstSum = 0;
      window.scrollTo({ top: heroes[target].offsetTop, behavior: "smooth" });
      window.setTimeout(() => {
        cooldown = false;
      }, COOLDOWN_MS);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return null;
}
