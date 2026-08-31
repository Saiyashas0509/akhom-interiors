import { useEffect, useRef, useState } from "react";
import video640 from "@/assets/akhom-hero-640.mp4.asset.json";
import video960 from "@/assets/akhom-hero-960.mp4.asset.json";
import webm640 from "@/assets/akhom-hero-640.webm.asset.json";
import webm960 from "@/assets/akhom-hero-960.webm.asset.json";

const FPS = 30;
/* Keep the frame buffer small enough for low-memory phones. */
const MAX_FRAMES = 150;
/* Sharp 1600px masters served from /public for large screens. */
const HI = { webm: "/media/hero-1600.webm", mp4: "/media/hero-1600.mp4" };
const POSTER = "/media/hero-poster.jpg";
/* Parallax amplitude in px and ease factor for the pointer drift. */
const DRIFT = 28;
const EASE = 0.045;

type VideoWithRVFC = HTMLVideoElement & {
  requestVideoFrameCallback?: (cb: () => void) => number;
};

type NavigatorWithData = Navigator & {
  connection?: { saveData?: boolean; effectiveType?: string };
};

type Sources = { webm: string; mp4: string };

function pickSource(): Sources {
  const mid = { webm: webm960.url, mp4: video960.url };
  const lo = { webm: webm640.url, mp4: video640.url };
  if (typeof window === "undefined") return HI;
  const conn = (navigator as NavigatorWithData).connection;
  const slow =
    conn?.saveData ||
    (conn?.effectiveType && /2g/.test(conn.effectiveType)) ||
    false;
  if (slow) return lo;
  if (window.matchMedia("(max-width: 768px)").matches) return lo;
  if (window.matchMedia("(max-width: 1280px)").matches) return mid;
  return HI;
}

export function HeroVideoBg() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLCanvasElement[]>([]);
  const timesRef = useRef<Set<number>>(new Set());
  const [src, setSrc] = useState<Sources | null>(null);
  const [ready, setReady] = useState(false);

  /* Resolve the lightest suitable source after mount (keeps SSR markup stable). */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // poster only
    setSrc(pickSource());
  }, []);

  /* Pointer parallax — the frame drifts gently toward the cursor. */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    let running = false;

    const tick = () => {
      x += (targetX - x) * EASE;
      y += (targetY - y) * EASE;
      wrap.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(1.08)`;
      const settled = Math.abs(targetX - x) < 0.1 && Math.abs(targetY - y) < 0.1;
      if (settled) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      targetX = -nx * DRIFT * 2;
      targetY = -ny * DRIFT;
      kick();
    };
    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      kick();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  /* Capture one forward playthrough into offscreen canvases. */
  useEffect(() => {
    const video = videoRef.current as VideoWithRVFC | null;
    if (!video || !src) return;

    let stopped = false;
    let rafId = 0;

    const capture = () => {
      if (stopped || video.readyState < 2 || video.videoWidth === 0) return;
      if (framesRef.current.length >= MAX_FRAMES) return;
      const t = Math.round(video.currentTime * 1000);
      if (timesRef.current.has(t)) return;
      timesRef.current.add(t);

      try {
        const w = video.videoWidth;
        const h = video.videoHeight;
        const frame = document.createElement("canvas");
        frame.width = w;
        frame.height = h;
        const ctx = frame.getContext("2d", { alpha: false });
        if (!ctx) return;
        ctx.drawImage(video, 0, 0, w, h);
        framesRef.current.push(frame);
      } catch (err) {
        // Canvas capture blocked by browser CORS policy or memory — poster fallback stays active
      }
    };

    const loop = () => {
      if (stopped) return;
      capture();
      if (video.requestVideoFrameCallback) {
        video.requestVideoFrameCallback(loop);
      } else {
        rafId = requestAnimationFrame(loop);
      }
    };

    const onPlay = () => loop();
    const finish = () => {
      if (stopped) return;
      stopped = true;
      cancelAnimationFrame(rafId);
      if (framesRef.current.length > 1) setReady(true);
    };

    const start = () => {
      video.play().catch(() => {
        /* autoplay blocked — the poster stays visible */
      });
    };

    video.addEventListener("loadeddata", start);
    video.addEventListener("play", onPlay);
    video.addEventListener("ended", finish);
    if (video.readyState >= 2) start();

    return () => {
      stopped = true;
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadeddata", start);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("ended", finish);
    };
  }, [src]);

  /* Ping-pong the captured frames at 30fps — the boomerang loop. */
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    const first = frames[0];
    if (!canvas || !first) return;

    canvas.width = first.width;
    canvas.height = first.height;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let index = 0;
    let direction = 1;
    let raf = 0;
    let last = 0;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - last < 1000 / FPS) return;
      last = now;
      const frame = frames[index];
      if (frame) ctx.drawImage(frame, 0, 0);
      if (index >= frames.length - 1) direction = -1;
      else if (index <= 0) direction = 1;
      index += direction;
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [ready]);

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <div
        ref={wrapRef}
        className="h-full w-full overflow-hidden will-change-transform"
        style={{ transform: "scale(1.08)" }}
      >
        {/* Instant paint: poster renders before any video byte arrives. */}
        <img
          src={POSTER}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {src ? (
          <video
            ref={videoRef}
            poster={POSTER}
            muted
            playsInline
            preload="auto"
            className="relative h-full w-full object-cover"
            style={ready ? { display: "none" } : undefined}
          >
            <source src={src.webm} type="video/webm" />
            <source src={src.mp4} type="video/mp4" />
          </video>
        ) : null}
        <canvas
          ref={canvasRef}
          className="relative h-full w-full object-cover"
          style={ready ? undefined : { display: "none" }}
        />
      </div>
    </div>
  );
}
