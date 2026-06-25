"use client";

import { motion } from "framer-motion";
import { roster } from "@/lib/data";
import SectionHeader from "./ui/SectionHeader";
import AvatarPortrait from "./AvatarPortrait";

const portraitConfig: Record<
  string,
  {
    skin: string;
    hair: string;
    accent: string;
    style: "long" | "short" | "curly" | "slick" | "bun" | "wavy";
    mood: "neutral" | "smile" | "serene";
  }
> = {
  NOVA: { skin: "#f0d0b0", hair: "#2a1810", accent: "#ff6b9d", style: "wavy", mood: "smile" },
  KAI: { skin: "#d8a878", hair: "#0a0805", accent: "#00d4ff", style: "slick", mood: "neutral" },
  MIRELLE: { skin: "#f4d8c0", hair: "#c47840", accent: "#ff8fb1", style: "curly", mood: "serene" },
  AXEL: { skin: "#c89870", hair: "#1a0e08", accent: "#d4ff3a", style: "short", mood: "smile" },
  SAGE: { skin: "#e8c4a0", hair: "#3a2410", accent: "#ffb84a", style: "long", mood: "neutral" },
  JUNO: { skin: "#e0b890", hair: "#7a3aff", accent: "#ff3ad4", style: "bun", mood: "neutral" },
};

export default function Roster() {
  return (
    <section id="roster" className="relative border-t border-line py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-20 md:mb-28">
          <SectionHeader
            eyebrow="The Roster"
            title={
              <>
                A roster that never ages out,
                <br />
                never goes off-script, <span className="italic text-accent">never sleeps.</span>
              </>
            }
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 max-w-2xl text-lg leading-relaxed text-muted"
          >
            A curated bench of synthetic creators across fashion, tech, beauty,
            fitness, travel, and entertainment. Every likeness is bespoke. Every
            audience is real. Every metric is attributable.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {roster.map((r, i) => {
            const cfg = portraitConfig[r.name] || {
              skin: "#e8c5a4",
              hair: "#1a0e08",
              accent: "#d4ff3a",
              style: "long" as const,
              mood: "neutral" as const,
            };
            return (
              <motion.article
                key={r.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                className="tilt-card group relative overflow-hidden rounded-2xl border border-line bg-bg data-[hover]:border-accent/40"
                data-hover
              >
                {/* Portrait — real-looking generated avatar */}
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <AvatarPortrait
                    name={r.name}
                    skin={cfg.skin}
                    hair={cfg.hair}
                    hairStyle={cfg.style}
                    accent={cfg.accent}
                    mood={cfg.mood}
                  />

                  {/* AI badge */}
                  <div className="absolute right-4 top-4 z-10 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur">
                    AI · {r.name}
                  </div>

                  {/* Bottom gradient overlay */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 z-10 flex items-end bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="p-6 text-sm text-white">
                      View profile <span className="ml-1">→</span>
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-end justify-between p-6">
                  <div>
                    <div className="font-serif text-2xl tracking-tightest">
                      {r.name}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
                      {r.niche}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-serif text-xl tracking-tightest">
                      {r.followers}
                    </div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-muted">
                      {r.engagement} ER
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
