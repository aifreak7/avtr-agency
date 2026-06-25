"use client";

// Stylized AI influencer portrait — inline SVG so we ship zero image
// dependencies. Each portrait is a soft-shaded face silhouette with
// hair, neck, and a subtle rim light. Looks "AI-generated" because of
// the gradient lighting and slightly idealized proportions, not because
// it tries to mimic a real photo. Replace with real generated images
// later (see README).

export default function AvatarPortrait({
  name,
  skin = "#e8c5a4",
  hair = "#1a0e08",
  hairStyle = "long",
  accent = "#d4ff3a",
  mood = "neutral",
}: {
  name: string;
  skin?: string;
  hair?: string;
  hairStyle?: "long" | "short" | "curly" | "slick" | "bun" | "wavy";
  accent?: string;
  mood?: "neutral" | "smile" | "serene";
}) {
  const mouth =
    mood === "smile"
      ? "M-18,4 Q0,18 18,4"
      : mood === "serene"
      ? "M-12,2 Q0,8 12,2"
      : "M-10,4 Q0,10 10,4";

  return (
    <svg
      viewBox="0 0 200 240"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Background gradient per avatar */}
        <radialGradient id={`bg-${name}`} cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
          <stop offset="50%" stopColor={accent} stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0a0a0b" stopOpacity="1" />
        </radialGradient>

        {/* Skin gradient (cheek warmth + jaw shadow) */}
        <radialGradient id={`skin-${name}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fff0dc" />
          <stop offset="55%" stopColor={skin} />
          <stop offset="100%" stopColor="#7a4a32" />
        </radialGradient>

        {/* Hair gradient (highlight + shadow) */}
        <linearGradient id={`hair-${name}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5a4030" />
          <stop offset="40%" stopColor={hair} />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>

        {/* Rim light */}
        <linearGradient id={`rim-${name}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="80%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.4" />
        </linearGradient>

        <filter id={`soft-${name}`}>
          <feGaussianBlur stdDeviation="0.4" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="200" height="240" fill={`url(#bg-${name})`} />

      {/* Shoulders + neck */}
      <path
        d="M30,240 Q30,180 70,170 L130,170 Q170,180 170,240 Z"
        fill="#0e0e12"
      />
      <ellipse cx="100" cy="178" rx="28" ry="18" fill={skin} opacity="0.92" />

      {/* Hair back layer (long/wavy drapes behind shoulders) */}
      {hairStyle === "long" && (
        <path
          d="M55,90 Q40,140 45,200 Q55,230 75,235 Q70,200 75,160 Q80,120 100,95 Q120,120 125,160 Q130,200 125,235 Q145,230 155,200 Q160,140 145,90 Z"
          fill={`url(#hair-${name})`}
        />
      )}
      {hairStyle === "wavy" && (
        <path
          d="M50,90 Q35,150 50,210 Q70,225 100,225 Q130,225 150,210 Q165,150 150,90 Z"
          fill={`url(#hair-${name})`}
        />
      )}

      {/* Face — oval */}
      <ellipse
        cx="100"
        cy="105"
        rx="38"
        ry="48"
        fill={`url(#skin-${name})`}
        filter={`url(#soft-${name})`}
      />

      {/* Jaw shadow */}
      <path
        d="M65,110 Q70,150 100,158 Q130,150 135,110 Q130,135 100,140 Q70,135 65,110 Z"
        fill="#000"
        opacity="0.18"
      />

      {/* Hair front (varies by style) */}
      {hairStyle === "long" && (
        <path
          d="M62,75 Q60,55 100,55 Q140,55 138,75 Q140,60 100,58 Q60,60 62,75 Z M62,75 Q55,90 60,110 L70,90 Q72,75 80,72 Z M138,75 Q145,90 140,110 L130,90 Q128,75 120,72 Z"
          fill={`url(#hair-${name})`}
        />
      )}
      {hairStyle === "short" && (
        <path
          d="M64,70 Q60,52 100,52 Q140,52 136,70 Q138,58 100,58 Q62,58 64,70 Z"
          fill={`url(#hair-${name})`}
        />
      )}
      {hairStyle === "curly" && (
        <g fill={`url(#hair-${name})`}>
          <circle cx="72" cy="68" r="10" />
          <circle cx="86" cy="58" r="11" />
          <circle cx="100" cy="55" r="12" />
          <circle cx="114" cy="58" r="11" />
          <circle cx="128" cy="68" r="10" />
          <circle cx="68" cy="82" r="9" />
          <circle cx="132" cy="82" r="9" />
        </g>
      )}
      {hairStyle === "slick" && (
        <path
          d="M62,72 Q58,50 100,50 Q142,50 138,72 L138,82 Q138,68 100,66 Q62,68 62,82 Z"
          fill={`url(#hair-${name})`}
        />
      )}
      {hairStyle === "bun" && (
        <g>
          <path
            d="M64,75 Q60,55 100,55 Q140,55 136,75 L134,82 Q132,70 100,68 Q68,70 66,82 Z"
            fill={`url(#hair-${name})`}
          />
          <circle cx="100" cy="42" r="14" fill={`url(#hair-${name})`} />
        </g>
      )}
      {hairStyle === "wavy" && (
        <path
          d="M62,78 Q58,55 100,52 Q142,55 138,78 Q140,62 100,60 Q60,62 62,78 Z M62,78 Q56,95 60,118 Q66,100 72,90 Z M138,78 Q144,95 140,118 Q134,100 128,90 Z"
          fill={`url(#hair-${name})`}
        />
      )}

      {/* Brows */}
      <path
        d="M76,92 Q84,88 92,92"
        stroke="#1a0e08"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M108,92 Q116,88 124,92"
        stroke="#1a0e08"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Eyes */}
      <g>
        <ellipse cx="84" cy="102" rx="4.5" ry="3" fill="#fff" />
        <ellipse cx="116" cy="102" rx="4.5" ry="3" fill="#fff" />
        <circle cx="84" cy="102" r="2.6" fill="#3a2515" />
        <circle cx="116" cy="102" r="2.6" fill="#3a2515" />
        <circle cx="85" cy="101" r="0.9" fill="#fff" />
        <circle cx="117" cy="101" r="0.9" fill="#fff" />
        {/* Lash hint */}
        <path d="M79,99 Q84,97 89,99" stroke="#1a0e08" strokeWidth="1.2" fill="none" />
        <path d="M111,99 Q116,97 121,99" stroke="#1a0e08" strokeWidth="1.2" fill="none" />
      </g>

      {/* Nose */}
      <path
        d="M100,108 L98,122 Q100,124 102,122 Z"
        fill="#7a4a32"
        opacity="0.5"
      />

      {/* Mouth */}
      <path
        d={mouth}
        stroke="#8a3030"
        strokeWidth="2.2"
        fill={mood === "smile" ? "#a04050" : "none"}
        strokeLinecap="round"
      />

      {/* Cheek blush */}
      <ellipse cx="74" cy="118" rx="6" ry="3" fill="#ff8888" opacity="0.25" />
      <ellipse cx="126" cy="118" rx="6" ry="3" fill="#ff8888" opacity="0.25" />

      {/* Rim light overlay on face right */}
      <path
        d="M138,80 Q142,110 130,150 L138,150 Q150,110 145,80 Z"
        fill={`url(#rim-${name})`}
        opacity="0.7"
      />

      {/* Vignette */}
      <rect width="200" height="240" fill="url(#bg-${name})" />
    </svg>
  );
}
