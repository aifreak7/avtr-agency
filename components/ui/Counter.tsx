"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";

export default function Counter({
  value,
  prefix = "",
  suffix = "",
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration: 1.8,
      ease: [0.2, 0.8, 0.2, 1],
    });
    const unsub = mv.on("change", (v) => {
      // Show 0 decimals unless value is < 10
      const formatted =
        value < 10 ? v.toFixed(1) : Math.round(v).toLocaleString();
      setDisplay(formatted);
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, mv, value]);

  return (
    <div ref={ref} className="flex flex-col gap-3">
      <div className="font-serif text-6xl tracking-tightest md:text-8xl">
        {prefix}
        <span className="text-accent">{display}</span>
        {suffix}
      </div>
      <div className="text-sm uppercase tracking-[0.25em] text-muted">{label}</div>
    </div>
  );
}
