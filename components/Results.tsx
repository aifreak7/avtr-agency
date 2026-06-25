"use client";

import { motion } from "framer-motion";
import { stats, testimonials, partners } from "@/lib/data";
import Counter from "./ui/Counter";

export default function Results() {
  return (
    <section id="results" className="relative border-t border-line py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-6 text-xs uppercase tracking-[0.3em] text-muted"
        >
          By the numbers
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-24 max-w-4xl font-serif text-5xl leading-[1.05] tracking-tightest md:text-7xl lg:text-8xl"
        >
          We measure <span className="italic text-accent">everything.</span>
        </motion.h2>

        {/* Stat grid */}
        <div className="grid grid-cols-2 gap-12 md:gap-16 lg:grid-cols-4">
          {stats.map((s) => (
            <Counter
              key={s.label}
              value={s.value}
              prefix={s.prefix}
              suffix={s.suffix}
              label={s.label}
            />
          ))}
        </div>

        {/* Partners */}
        <div className="mt-32 border-y border-line py-10">
          <div className="mb-8 text-[10px] uppercase tracking-[0.4em] text-muted">
            Trusted by teams shipping fast
          </div>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
            {partners.map((p) => (
              <span
                key={p}
                className="font-serif text-xl tracking-[0.2em] text-muted/70 transition-colors hover:text-ink md:text-2xl"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-32 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="border-t border-line pt-8"
            >
              <blockquote className="font-serif text-3xl leading-[1.2] tracking-tightest md:text-4xl">
                <span className="text-accent">"</span>
                {t.quote}
                <span className="text-accent">"</span>
              </blockquote>
              <figcaption className="mt-8 text-sm text-muted">
                <span className="text-ink">{t.author}</span> · {t.company}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
