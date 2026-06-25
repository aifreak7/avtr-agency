"use client";

import { motion } from "framer-motion";
import { chapters } from "@/lib/data";
import ChapterNumeral from "./ui/ChapterNumeral";

export default function Services() {
  return (
    <section id="process" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Section header */}
        <div className="mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-6 text-xs uppercase tracking-[0.3em] text-muted"
          >
            The Process
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-4xl font-serif text-5xl leading-[1.05] tracking-tightest md:text-7xl lg:text-8xl"
          >
            Three chapters. <span className="italic text-accent">One creator,</span>{" "}
            end to end.
          </motion.h2>
        </div>

        {/* Chapters */}
        <div className="space-y-32 md:space-y-48">
          {chapters.map((c, i) => (
            <motion.article
              key={c.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16"
            >
              {/* Numeral column */}
              <div className="lg:col-span-4">
                <ChapterNumeral n={c.n} />
              </div>

              {/* Content column */}
              <div className="lg:col-span-8">
                <h3 className="mb-6 font-serif text-4xl leading-tight tracking-tightest md:text-6xl">
                  {c.title}
                </h3>
                <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                  {c.body}
                </p>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {c.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 border-t border-line pt-4 text-sm"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span className="text-ink/90">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
