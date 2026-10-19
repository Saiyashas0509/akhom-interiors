import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion as useFramerReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type Variants,
} from "framer-motion";
import { IconX } from "./icons";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Respects the user's reduced-motion preference (SSR-safe). */
export function useReducedMotion() {
  const reduced = useFramerReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? !!reduced : false;
}

/**
 * Reveal: content eases up into place once, as it enters the viewport.
 * `delay` 0–3 staggers siblings; direction sets the entry axis.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  amount?: number;
}) {
  const reduced = useReducedMotion();
  const offset = {
    up: { y: 34, x: 0 },
    left: { x: -34, y: 0 },
    right: { x: 34, y: 0 },
    none: { x: 0, y: 0 },
  }[direction];

  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(3px)", ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 1.25,
        delay: Math.min(delay, 6) * 0.12,
        ease: EASE_OUT_EXPO,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parallax: drifts its children as the element travels through the viewport,
 * driven by Motion's scroll progress (never a window scroll listener).
 * `speed` in px of total travel; negative counter-scrolls.
 */
export function Parallax({
  children,
  className = "",
  speed = 60,
  scale = 1,
  spring = true,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  scale?: number;
  spring?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const smoothY = useSpring(rawY, { stiffness: 140, damping: 30, mass: 0.4 });
  const y = reduced || !spring ? rawY : smoothY;

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        className="h-full w-full will-change-transform"
        style={reduced ? { scale } : { y, scale }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * SplitLines / SplitWords: a masked, per-word rise for editorial headlines.
 * Keeps the same `as` + style API as the original TextReveal.
 */
export function TextReveal({
  text,
  className = "",
  style,
  as: Tag = "h2",
  delay = 0,
  once = true,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.055, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: reduced ? { opacity: 0 } : { y: "108%" },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.95, ease: EASE_OUT_EXPO },
    },
  };

  const MotionTag = motion[Tag] as typeof motion.h2;

  return (
    <MotionTag
      className={className}
      {...(style ? { style: style as MotionStyle } : {})}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.5 }}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span className="inline-block will-change-transform" variants={word}>
            {w}
          </motion.span>
          {i < words.length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </MotionTag>
  );
}

/**
 * Magnetic: an element that leans toward the pointer, then springs home.
 * Pointer physics live on motion values, never in React state.
 */
export function Magnetic({
  children,
  className = "",
  strength = 0.32,
  radius = 90,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.35 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    const falloff = Math.max(0, 1 - dist / (radius + r.width / 2));
    x.set(dx * strength * falloff);
    y.set(dy * strength * falloff);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduced ? {} : { x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger / StaggerItem: a container that sequences its children in on scroll.
 * Use with <StaggerItem> for each child.
 */
export function Stagger({
  children,
  className = "",
  gap = 0.08,
  delay = 0,
  once = true,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduced ? 0 : gap, delayChildren: delay } },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  y = 22,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduced ? { opacity: 0 } : { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** A hairline rule that draws in from the left when it enters view. */
export function RevealRule({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`h-px origin-left bg-current ${className}`}
      initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
    />
  );
}

/**
 * Marquee: a single horizontal scroll of repeated content. Content is
 * duplicated in markup so a 50% translate loops seamlessly.
 */
export function Marquee({
  children,
  className = "",
  duration = 42,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div className={`marquee relative overflow-hidden ${className}`}>
      <div
        className="marquee-track"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as CSSProperties
        }
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Thin progress bar across the top, bound to page scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-taupe to-burgundy-light"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

/** Fixed film-grain layer. Purely decorative, never on a scrolling container. */
export function GrainOverlay({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <div
      className="grain pointer-events-none fixed inset-0 z-[55] mix-blend-overlay"
      style={{ opacity }}
      aria-hidden="true"
    />
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ivory/80 backdrop-blur-xl"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close Lightbox"
        className="glass-strong absolute right-6 top-6 z-10 rounded-full p-3 text-ink transition-transform duration-500 hover:rotate-90"
      >
        <IconX className="h-6 w-6" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className="glass-strong relative flex max-h-[90vh] max-w-[92vw] flex-col overflow-hidden rounded-[32px] p-2 md:max-h-[85vh] md:max-w-[85vw] md:flex-row"
      >
        <div className="relative flex-1 overflow-hidden rounded-[26px] bg-stone">
          <img
            src={imageSrc}
            alt={title || "Project preview"}
            className="h-full max-h-[60vh] w-full object-contain md:max-h-[85vh]"
          />
        </div>
        {(title || subtitle || description) && (
          <div className="flex w-full flex-col justify-center p-6 text-ink md:w-80 md:p-8">
            {subtitle && (
              <p className="eyebrow text-ink">{subtitle}</p>
            )}
            {title && (
              <h3 className="mt-3 font-serif text-2xl text-ink">{title}</h3>
            )}
            {description && (
              <p className="mt-4 text-[15px] font-light leading-relaxed text-ink">{description}</p>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
