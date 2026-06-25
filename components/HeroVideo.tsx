"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// AI influencer hero — looping cinematic clip of the avatar,
// composited against the dark hero background with cursor parallax.
// The clip itself is centered with generous negative space so it reads
// as "floating portrait" rather than "stuck-on photo".

export default function HeroVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Cursor-driven parallax values
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  // Subtle translate + rotate based on cursor
  const tx = useTransform(sx, [-1, 1], [-14, 14]);
  const ty = useTransform(sy, [-1, 1], [-10, 10]);
  const rX = useTransform(sy, [-1, 1], [4, -4]);
  const rY = useTransform(sx, [-1, 1], [-5, 5]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = (e.clientX - cx) / (rect.width / 2 || 1);
      const ny = (e.clientY - cy) / (rect.height / 2 || 1);
      mx.set(Math.max(-1, Math.min(1, nx)));
      my.set(Math.max(-1, Math.min(1, ny)));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center justify-center"
    >
      {/* Ambient halo behind the portrait — soft accent bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(212,255,58,0.18), rgba(120,80,220,0.10) 45%, transparent 70%)",
        }}
      />

      {/* Tilt / parallax wrapper */}
      <motion.div
        style={{
          x: tx,
          y: ty,
          rotateX: rX,
          rotateY: rY,
          transformPerspective: 1200,
        }}
        className="relative will-change-transform"
      >
        {/* Soft accent ring (sit just outside the video) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-3 rounded-[28px] opacity-60 blur-xl"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(212,255,58,0.18), transparent 70%)",
          }}
        />

        {/* Video frame — small, contained, breathing on its own */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative overflow-hidden rounded-[24px] border border-white/10 shadow-[0_30px_120px_-30px_rgba(0,0,0,0.8),0_0_0_1px_rgba(212,255,58,0.08)]"
          style={{ width: "min(78%, 360px)", aspectRatio: "9 / 16" }}
        >
          {/* Cinematic letterbox + vignette overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)",
              mixBlendMode: "multiply",
            }}
          />

          <video
            ref={videoRef}
            src="/hero-avatar.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="relative z-0 h-full w-full object-cover"
            style={{
              filter: "contrast(1.05) saturate(1.08) brightness(0.95)",
            }}
          />

          {/* AI badge */}
          <div className="absolute right-3 top-3 z-20 rounded-full border border-white/25 bg-black/35 px-2.5 py-1 text-[9px] uppercase tracking-[0.25em] text-white backdrop-blur">
            AI · Live
          </div>

          {/* Live pulse dot */}
          <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-white/80">
              Loop
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Caption under the portrait */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted"
      >
        Move your cursor — she leans in
      </motion.div>
    </div>
  );
}