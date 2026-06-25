"use client";

import { motion } from "framer-motion";
import { hero } from "@/lib/data";
import HeroVideo from "./HeroVideo";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden grain hero-bg"
    >
      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-32 pb-20 md:px-10 lg:grid-cols-2">
        {/* Left: copy */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8 text-xs uppercase tracking-[0.3em] text-muted"
          >
            {hero.eyebrow}
          </motion.div>

          <h1 className="font-serif text-[clamp(2.5rem,7vw,6.5rem)] font-light leading-[1.02] tracking-tightest">
            {hero.headline.map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                className="block"
              >
                {line.includes("outperform") ? (
                  <>
                    {line.split("outperform")[0]}
                    <span className="italic text-accent">outperform</span>
                    {line.split("outperform")[1]}
                  </>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 max-w-lg text-base leading-relaxed text-muted md:text-lg"
          >
            {hero.subline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href={hero.primaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-bg transition-all hover:scale-[1.02]"
            >
              {hero.primaryCta.label}
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href={hero.secondaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-sm font-medium transition-all hover:border-ink"
            >
              {hero.secondaryCta.label}
            </a>
          </motion.div>
        </div>

        {/* Right: cinematic AI influencer portrait */}
        <div className="relative flex h-[520px] w-full items-center justify-center md:h-[600px] lg:h-[680px]">
          <HeroVideo />
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-muted">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-muted"
        />
      </motion.div>
    </section>
  );
}
