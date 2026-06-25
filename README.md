# AVTR. — AI Influencer Marketing Agency

Dark, cinematic, interactive landing page for an AI influencer marketing agency.
Built with **Next.js 14 + React Three Fiber + Framer Motion + Tailwind**.

Inspired by [anything.com](https://www.anything.com/) (cinematic dark hero) and
[stateofaidesign.com](https://stateofaidesign.com/) (editorial chapter scroll,
oversized numerals, generous whitespace).

Live hero features a looping AI influencer portrait with cursor-tracking parallax.

## Tech stack

- **Next.js 14** (App Router, TypeScript) — static-exported, Vercel-ready
- **Tailwind CSS** — dark theme tokens (`bg` / `ink` / `accent` / `muted` / `line`)
- **Framer Motion** — scroll reveals, hover tilt, animated counters, hero parallax
- **Lenis** — smooth scroll
- **Fraunces serif + Inter sans** — typography pair via `next/font`
- (Roster section uses inline SVG portraits so the site ships zero image deps)

## Sections

1. **Sticky nav** with scroll-aware dark glass + chapter links
2. **Hero** — headline + dual CTA on the left, looping AI influencer portrait with cursor parallax on the right
3. **Services** — editorial 01 / 02 / 03 chapter scroll
4. **Roster** — 6-card AI influencer grid (NOVA, KAI, MIRELLE, AXEL, SAGE, JUNO)
5. **Results** — animated counters + partner logo strip + pull-quote testimonials
6. **Pricing** — 3-tier cards (Launch / Scale / Enterprise)
7. **Footer** — CTA + giant wordmark + contact + socials
8. **Sticky CTA** — floating "Book a call" appears after scrolling past hero

## Run locally

Requires Node 18+.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build for production

```bash
npm run build
```

Deploy to Vercel: import this repo at <https://vercel.com/new> and click **Deploy**.
The static export works on any host (Netlify, Cloudflare Pages, GitHub Pages).

## Make it yours

All copy and most styling lives in **one file**: [`lib/data.ts`](./lib/data.ts).

### 1. Brand & copy

```ts
export const brand = { name: "AVTR.", tagline: "AI Influencer Marketing Agency" };
```

Every section pulls from `hero`, `chapters`, `roster`, `stats`, `testimonials`,
`pricing`, `partners`, `footer`. No need to touch components.

### 2. Hero portrait video

The hero loops `public/hero-avatar.mp4`. Replace it with your own clip — same
filename + format works as a drop-in. To tweak framing, see the container styles
in [`components/HeroVideo.tsx`](./components/HeroVideo.tsx) (aspect ratio,
filters, glow, parallax strength).

### 3. Re-skin

The single accent color (`#d4ff3a` lime) lives in
[`tailwind.config.ts`](./tailwind.config.ts). Change it once and the whole site
re-colors. The dark base, ink, muted, and line tokens are in the same place.

## File layout

```
app/
  layout.tsx        # root layout, fonts, SmoothScroll + CursorGlow
  page.tsx          # page composition
  globals.css       # Tailwind + custom CSS vars + grain + hero bg
components/
  Nav.tsx           # sticky nav with scroll-blur
  Hero.tsx          # hero copy + portrait mount
  HeroVideo.tsx     # looping MP4 portrait + cursor parallax + halo
  Services.tsx      # editorial 01/02/03 chapters
  Roster.tsx        # AI influencer card grid
  AvatarPortrait.tsx# inline SVG portrait renderer
  Results.tsx       # animated counters + testimonials + partners
  Pricing.tsx       # 3-tier pricing cards
  Footer.tsx        # CTA + giant wordmark
  StickyCTA.tsx     # floating "Book a call"
  SmoothScroll.tsx  # Lenis wrapper
  CursorGlow.tsx    # cursor-following accent glow
  ui/
    SectionHeader.tsx
    Counter.tsx
    ChapterNumeral.tsx
lib/
  data.ts           # ALL copy — single source of truth
public/
  hero-avatar.mp4   # looping hero portrait
```

## Notes

- The hero MP4 is set to `autoplay loop muted playsInline` — required for mobile
  Safari/iOS autoplay to work without a user gesture.
- Cursor parallax uses Framer Motion's `useSpring` for damping — gentle on
  trackpads, smooth on mice.
- The 3D `AvatarScene.tsx` component is still in the repo as a reference for a
  procedural fallback (it was the original hero before the video was swapped
  in). Safe to delete if you don't need it.

## License

Code: MIT. Replace placeholder copy, the `AVTR.` brand, and the hero video
before commercial use.