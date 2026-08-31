import { useEffect, useRef, useState, type ReactNode } from "react";
import { IconX, IconMaximize } from "./icons";

/**
 * Scroll-reveal wrapper: fades content up once it enters the viewport with subtle blur.
 * delay 1–3 staggers siblings without a JS animation library.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const transformOff = {
    up: "translate-y-10 scale-[0.98]",
    left: "-translate-x-10",
    right: "translate-x-10",
    none: "",
  }[direction];

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity,filter] ${
        visible
          ? "translate-y-0 translate-x-0 scale-100 opacity-100 blur-0"
          : `${transformOff} opacity-0 blur-[4px]`
      }`}
      style={{ transitionDelay: `${delay * 90}ms` }}
    >
      {children}
    </div>
  );
}

/** Respects the user's reduced-motion preference. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * Parallax: drifts its children as the element travels through the viewport.
 * `speed` in px of total travel (negative moves against the scroll).
 */
export function Parallax({
  children,
  className = "",
  speed = 60,
  scale = 1,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    const target = inner.current;
    if (!el || !target) return;

    let raf = 0;
    let active = false;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 (entering from below) → 1 (leaving at top)
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)));
      target.style.transform = `translate3d(0, ${(p * speed).toFixed(2)}px, 0) scale(${scale})`;
    };

    const onScroll = () => {
      if (!active || raf) return;
      raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      (entries) => {
        active = !!entries[0]?.isIntersecting;
        if (active) onScroll();
      },
      { rootMargin: "20% 0px" }
    );
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed, scale, reduced]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div ref={inner} className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}

/** Word-by-word mask reveal for editorial headlines. */
export function TextReveal({
  text,
  className = "",
  style,
  as: Tag = "h2",
  delay = 0,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return setVisible(true);
    const io = new IntersectionObserver(
      (e) => {
        if (e[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");
  return (
    <Tag ref={ref as never} className={className} style={style}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom">
          <span
            className="inline-block will-change-transform"
            style={{
              transform: visible ? "translateY(0)" : "translateY(105%)",
              opacity: visible ? 1 : 0,
              transition: `transform 900ms cubic-bezier(0.22,1,0.36,1) ${delay + i * 55}ms, opacity 600ms ease ${delay + i * 55}ms`,
            }}
          >
            {w}
          </span>
          {i < words.length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </Tag>
  );
}

/** Thin bronze bar across the top showing page scroll progress. */
export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setP(h > 0 ? window.scrollY / h : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-bronze to-amber-400 shadow-[0_0_8px_rgba(154,118,84,0.8)]"
        style={{ transform: `scaleX(${p})`, transition: "transform 120ms linear" }}
      />
    </div>
  );
}

/** Luxury full-screen lightbox for viewing high-res project imagery. */
export function LightboxModal({
  isOpen,
  onClose,
  imageSrc,
  title,
  subtitle,
  description,
}: {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title?: string;
  subtitle?: string;
  description?: string;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-md transition-all duration-300">
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close Lightbox"
        className="absolute top-6 right-6 z-10 rounded-full border border-ivory/20 bg-ink/80 p-3 text-ivory/80 transition-colors hover:border-ivory hover:text-ivory"
      >
        <IconX className="h-6 w-6" />
      </button>

      <div className="relative flex max-h-[90vh] max-w-[92vw] flex-col overflow-hidden border border-ivory/15 bg-ink shadow-2xl md:flex-row md:max-h-[85vh] md:max-w-[85vw]">
        <div className="relative flex-1 bg-black/40">
          <img
            src={imageSrc}
            alt={title || "Project preview"}
            className="h-full w-full max-h-[60vh] object-contain md:max-h-[85vh]"
          />
        </div>
        {(title || subtitle || description) && (
          <div className="flex w-full flex-col justify-center border-t border-ivory/15 bg-ink p-6 text-ivory md:w-80 md:border-t-0 md:border-l md:p-8">
            {subtitle && (
              <p className="text-[10px] uppercase tracking-[0.24em] text-bronze">{subtitle}</p>
            )}
            {title && (
              <h3 className="mt-3 font-serif text-2xl font-light tracking-tight text-ivory">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-4 text-sm font-light leading-relaxed text-ivory/70">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

