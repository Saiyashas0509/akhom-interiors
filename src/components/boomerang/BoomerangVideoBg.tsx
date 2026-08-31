import { useEffect, useRef, useState } from "react";
import video640 from "@/assets/boomerang-640.mp4.asset.json";
import video960 from "@/assets/boomerang-960.mp4.asset.json";
import poster from "@/assets/boomerang-poster.jpg.asset.json";

const FPS = 30;
/* Keep the frame buffer small enough for low-memory phones. */
const MAX_FRAMES = 150;

type VideoWithRVFC = HTMLVideoElement & {
  requestVideoFrameCallback?: (cb: () => void) => number;
};

type NavigatorWithData = Navigator & {
  connection?: { saveData?: boolean; effectiveType?: string };
};

function pickSource() {
  if (typeof window === "undefined") return video960.url;
  const conn = (navigator as NavigatorWithData).connection;
  const slow =
    conn?.saveData ||
    (conn?.effectiveType && /2g/.test(conn.effectiveType)) ||
    false;
  const small = window.matchMedia("(max-width: 768px)").matches;
  return slow || small ? video640.url : video960.url;
}

export function BoomerangVideoBg() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLCanvasElement[]>([]);
  const timesRef = useRef<Set<number>>(new Set());
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  /* Resolve the lightest suitable source after mount (keeps SSR markup stable). */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    if (reduced) return; // poster only
    setSrc(pickSource());
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

  /* Ping-pong the captured frames at 30fps. */
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
    <div className="absolute inset-0 z-0">
      <div className="h-full w-full origin-top scale-[1.15] overflow-hidden">
        {/* Instant paint: poster renders before any video byte arrives. */}
        <img
          src={poster.url}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        {src ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster.url}
            muted
            playsInline
            preload="auto"
            className="relative h-full w-full object-cover object-top"
            style={ready ? { display: "none" } : undefined}
          />
        ) : null}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="relative h-full w-full object-cover object-top"
          style={ready ? undefined : { display: "none" }}
        />
      </div>
    </div>
  );
}
