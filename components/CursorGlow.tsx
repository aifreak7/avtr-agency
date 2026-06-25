"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Fixed-position cursor follower. A large blurred radial gradient in the
// accent color that softly trails the pointer with `mix-blend-mode: screen`
// so it adds light without washing out dark areas. Scales on hover over
// interactive elements via a data attribute on the body.

export default function CursorGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { damping: 25, stiffness: 180, mass: 0.6 });
  const sy = useSpring(y, { damping: 25, stiffness: 180, mass: 0.6 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest("a, button, [data-hover]"));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      style={{ mixBlendMode: "screen" }}
    >
      <motion.div
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hovering ? 1.6 : 1, opacity: hovering ? 0.9 : 0.7 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute h-[420px] w-[420px] rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,255,58,0.35) 0%, rgba(212,255,58,0.12) 30%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
