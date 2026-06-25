"use client";

import { motion } from "framer-motion";

export default function SectionHeader({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className={align === "center" ? "text-center" : ""}
    >
      {eyebrow && (
        <div className="mb-6 text-xs uppercase tracking-[0.3em] text-muted">
          {eyebrow}
        </div>
      )}
      <h2 className="font-serif text-5xl leading-[1.05] tracking-tightest md:text-7xl lg:text-8xl">
        {title}
      </h2>
    </motion.div>
  );
}
