import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Scrolls to an element (or the top) through Lenis when it is running. */
export function smoothScrollTo(target: HTMLElement | number, immediate = false) {
  const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === "number" ? 0 : -110, immediate, duration: 1.4 });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target });
  } else {
    target.scrollIntoView({ behavior: immediate ? "auto" : "smooth", block: "start" });
  }
}

/**
 * Inertial page scrolling: wheel and trackpad input glide instead of stepping,
 * so scroll-scrubbed scenes (process, parallax) move like film rather than in jumps.
 */
export function SmoothScroll() {
  const router = useRouter();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      anchors: { offset: -110 },
    });
    window.__lenis = lenis;

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    // Route changes: land at the top, or on the requested #section.
    const unsubscribe = router.subscribe("onResolved", () => {
      const hash = window.location.hash.replace(/^#/, "");
      const el = hash ? document.getElementById(hash) : null;
      requestAnimationFrame(() => (el ? smoothScrollTo(el) : lenis.scrollTo(0, { immediate: true })));
    });

    return () => {
      unsubscribe();
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [router]);

  return null;
}
