"use client";

import { motion } from "framer-motion";
import { brand, footer } from "@/lib/data";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-line bg-bg"
    >
      {/* CTA block */}
      <div className="mx-auto max-w-7xl px-6 pb-32 pt-32 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="mb-6 text-xs uppercase tracking-[0.3em] text-muted">
            Start a project
          </div>
          <h2 className="mb-12 font-serif text-6xl leading-[0.95] tracking-tightest md:text-8xl lg:text-9xl">
            Let's build <span className="italic text-accent">someone</span>
            <br />
            who doesn't exist yet.
          </h2>
          <a
            href={`mailto:${footer.email}`}
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-base font-medium text-bg transition-all hover:scale-[1.02]"
          >
            {footer.email}
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <div className="font-serif text-2xl tracking-tightest">{brand.name}</div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {footer.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="text-xs text-muted">
            © {new Date().getFullYear()} {brand.name} · Built with React + Three.js
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="pointer-events-none select-none overflow-hidden">
        <div className="-mb-[4vw] px-6 font-serif text-[28vw] leading-none tracking-tightest text-ink/[0.04] md:px-10">
          {brand.name}
        </div>
      </div>
    </footer>
  );
}
