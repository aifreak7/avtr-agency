// Single source of truth for all client-facing copy.
// Swap this file's contents to rebrand the site.

export const brand = {
  name: "AVTR.",
  tagline: "AI Influencer Marketing Agency",
};

export const hero = {
  eyebrow: "AVTR. // EST. 2026",
  headline: ["Meet the influencers", "that don't exist —", "and outperform", "the ones that do."],
  subline:
    "We build, manage, and scale synthetic creators for brands that ship fast. End-to-end: strategy, production, distribution, optimization.",
  primaryCta: { label: "Book a call", href: "#contact" },
  secondaryCta: { label: "See the roster", href: "#roster" },
};

export const chapters = [
  {
    n: "01",
    title: "Strategy",
    body: "Audience research, niche positioning, narrative arc. We treat each AI creator like a real founder — with a POV, a voice, and a growth model. Not a prompt. Not a persona. A brand.",
    bullets: [
      "Niche & ICP mapping",
      "Voice & visual identity",
      "90-day content roadmap",
    ],
  },
  {
    n: "02",
    title: "Creation",
    body: "Hyperrealistic 3D likenesses, custom-trained voices, on-brand wardrobe and environments. Studio-grade output, weekly cadence, fully owned by you. No licensing limbo. No influencer drama.",
    bullets: [
      "Bespoke 3D avatar build",
      "Voice & motion capture",
      "Weekly content engine",
    ],
  },
  {
    n: "03",
    title: "Distribution",
    body: "We don't post into the void. We run the paid loop, the partnership loop, and the algorithmic loop — iterating weekly on what the audience actually responds to. Measurable, attributable, compounding.",
    bullets: [
      "Paid social orchestration",
      "Creator-brand partnerships",
      "Weekly performance sprints",
    ],
  },
];

export const roster = [
  {
    name: "NOVA",
    niche: "Fashion & Streetwear",
    followers: "2.4M",
    engagement: "8.2%",
    grad: "from-[#ff6b9d] via-[#c44bff] to-[#3a8fff]",
  },
  {
    name: "KAI",
    niche: "Tech & Gadgets",
    followers: "1.8M",
    engagement: "11.4%",
    grad: "from-[#3a8fff] via-[#00d4ff] to-[#d4ff3a]",
  },
  {
    name: "MIRELLE",
    niche: "Beauty & Skincare",
    followers: "3.1M",
    engagement: "9.7%",
    grad: "from-[#ffd4a3] via-[#ff8fb1] to-[#a14bff]",
  },
  {
    name: "AXEL",
    niche: "Fitness & Lifestyle",
    followers: "1.2M",
    engagement: "13.1%",
    grad: "from-[#d4ff3a] via-[#00d4a8] to-[#0066ff]",
  },
  {
    name: "SAGE",
    niche: "Travel & Hospitality",
    followers: "980K",
    engagement: "10.3%",
    grad: "from-[#ffb84a] via-[#ff5e5e] to-[#7a2bff]",
  },
  {
    name: "JUNO",
    niche: "Gaming & Entertainment",
    followers: "4.6M",
    engagement: "7.8%",
    grad: "from-[#5eff8f] via-[#00d4ff] to-[#ff3ad4]",
  },
];

export const stats = [
  { value: 2.4, suffix: "B", prefix: "", label: "Total reach delivered" },
  { value: 380, suffix: "+", prefix: "", label: "Campaigns shipped" },
  { value: 47, suffix: "M", prefix: "$", label: "Attributed revenue" },
  { value: 94, suffix: "%", prefix: "", label: "Client renewal rate" },
];

export const testimonials = [
  {
    quote:
      "AVTR. shipped us a creator that outperformed our entire paid roster in eight weeks. We paused every human contract by month three.",
    author: "Head of Brand",
    company: "Global Athleticwear Co.",
  },
  {
    quote:
      "The production quality is indistinguishable from a real creator — but we own the likeness outright. That's the entire game.",
    author: "VP, Performance Marketing",
    company: "DTC Beauty Group",
  },
];

export const pricing = [
  {
    tier: "Launch",
    price: "$8K",
    cadence: "/mo",
    blurb: "For brands testing the AI-creator lane.",
    features: [
      "1 AI creator, 1 niche",
      "8 posts / month",
      "Organic distribution",
      "Monthly performance review",
    ],
    cta: "Start a launch",
  },
  {
    tier: "Scale",
    price: "$22K",
    cadence: "/mo",
    blurb: "For brands ready to compound.",
    features: [
      "3 AI creators, multi-platform",
      "24 posts / month",
      "Paid amplification ($50K managed)",
      "Bi-weekly creative sprints",
    ],
    cta: "Scale up",
    featured: true,
  },
  {
    tier: "Enterprise",
    price: "Custom",
    cadence: "",
    blurb: "For global brands and holding companies.",
    features: [
      "Unlimited creators & markets",
      "Bespoke avatar IP",
      "Dedicated growth pod",
      "SLA + compliance review",
    ],
    cta: "Talk to us",
  },
];

export const partners = [
  "STRIPE",
  "SHOPIFY",
  "NOTION",
  "LINEAR",
  "FRAMER",
  "VERCEL",
];

export const footer = {
  email: "hello@avtr.studio",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "X", href: "#" },
  ],
};
