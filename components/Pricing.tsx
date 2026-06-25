"use client";

import { motion } from "framer-motion";
import { pricing } from "@/lib/data";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative border-t border-line py-32 md:py-48"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-6 text-xs uppercase tracking-[0.3em] text-muted"
        >
          Engage AVTR.
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-24 max-w-4xl font-serif text-5xl leading-[1.05] tracking-tightest md:text-7xl lg:text-8xl"
        >
          Pricing built around <span className="italic text-accent">output,</span>{" "}
          not headcount.
        </motion.h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {pricing.map((p, i) => (
            <motion.div
              key={p.tier}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`group relative flex flex-col rounded-2xl border p-8 transition-all duration-500 hover:-translate-y-1 ${
                p.featured
                  ? "border-accent bg-accent/[0.04]"
                  : "border-line bg-bg hover:border-ink/40"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-bg">
                  Most popular
                </div>
              )}

              <div className="mb-8">
                <div className="text-sm uppercase tracking-[0.25em] text-muted">
                  {p.tier}
                </div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-serif text-6xl tracking-tightest md:text-7xl">
                    {p.price}
                  </span>
                  {p.cadence && (
                    <span className="text-muted">{p.cadence}</span>
                  )}
                </div>
                <p className="mt-6 text-sm text-muted">{p.blurb}</p>
              </div>

              <ul className="mb-10 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span className="text-ink/90">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all ${
                  p.featured
                    ? "bg-accent text-bg hover:scale-[1.02]"
                    : "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-bg"
                }`}
              >
                {p.cta}
                <span>→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
