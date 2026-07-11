import React from "react";

interface LogoProps {
  className?: string;
  height?: number | string;
  variant?: "full" | "simplified" | "icon";
}

export default function Logo({ className = "", height = 40, variant = "full" }: LogoProps) {
  // Convert height to number if possible for exact aspect ratio calculation
  const numHeight = typeof height === "number" 
    ? height 
    : parseInt(height as string, 10) || 40;
  
  // Set aspect ratio: icon is 2.0 (200x100), full and simplified are 4.5 (540x120)
  const numWidth = variant === "icon" ? numHeight * 2 : numHeight * 4.5;

  return (
    <svg
      viewBox={variant === "icon" ? "10 10 200 100" : "0 0 540 120"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={numWidth}
      height={numHeight}
      style={{ height: numHeight, width: numWidth }}
      className={`select-none ${className}`}
    >
      <defs>
        {/* Core iDS Monogram Gradient matching the elegant deep metallic purple/violet/magenta profile */}
        <linearGradient id="logoIDSGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C026D3" /> {/* Electric Magenta highlight */}
          <stop offset="50%" stopColor="#7B2FBE" /> {/* IDS Purple */}
          <stop offset="100%" stopColor="#4F46E5" /> {/* IDS Violet */}
        </linearGradient>

        {/* Divider vertical glow line gradient */}
        <linearGradient id="logoDividerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7B2FBE" stopOpacity="0" />
          <stop offset="50%" stopColor="#C026D3" stopOpacity="1" />
          <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
        </linearGradient>

        {/* Core drop shadow for three-dimensional pop */}
        <filter id="logoGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#7B2FBE" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* ==================== LEFT: iDS MONOGRAM ==================== */}
      <g filter="url(#logoGlow)">
        {/* Stylized lower-case "i" */}
        {/* Dot of the "i" - slightly offset futuristic square/rect */}
        <rect x="25" y="24" width="16" height="11" rx="2" fill="url(#logoIDSGrad)" />
        {/* Stem of the "i" - slanted top edge */}
        <path d="M25 43.5 L41 41.5 L41 96 L25 96 Z" fill="url(#logoIDSGrad)" />

        {/* Stylized uppercase "D" with sleek futuristic inner-carve and outer shape */}
        <path
          d="M51 25 
             L92 25 
             C112 25 125 38 125 60 
             C125 82 112 96 92 96 
             L51 96 Z 
             M67 39 
             L67 82 
             L91 82 
             C102 82 108 74 108 60 
             C108 46 102 39 91 39 Z"
          fill="url(#logoIDSGrad)"
        />

        {/* Stylized wide futuristic "S" with sharp split-angle grooves */}
        <path
          d="M135 25 
             L190 25 
             L190 38 
             L151 38 
             C144 38 141 41 141 46 
             C141 51 145 53 151 54 
             L178 57 
             C190 58 196 66 196 77 
             C196 89 184 96 166 96 
             L111 96 
             L111 83 
             L153 83 
             C160 83 163 80 163 75 
             C163 70 159 68 153 67 
             L128 64 
             C117 62 111 54 111 44 
             C111 31 120 25 135 25 Z"
          fill="url(#logoIDSGrad)"
        />
      </g>

      {variant !== "icon" && (
        <>
          {/* ==================== MIDDLE: VERTICAL DIVIDER ==================== */}
          <line x1="215" y1="20" x2="215" y2="100" stroke="url(#logoDividerGrad)" strokeWidth="2.5" />

          {/* ==================== RIGHT: BRAND DETAILS ==================== */}
          {variant === "full" && (
            <>
              {/* IMPULSE - Row 1 */}
              <text
                x="235"
                y="42"
                fill="#FFFFFF"
                fontFamily="Space Grotesk, system-ui, -apple-system, sans-serif"
                fontSize="21"
                fontWeight="bold"
                letterSpacing="9"
              >
                IMPULSE
              </text>

              {/* DIGITAL - Row 2 */}
              <text
                x="235"
                y="67"
                fill="#FFFFFF"
                fontFamily="Space Grotesk, system-ui, -apple-system, sans-serif"
                fontSize="21"
                fontWeight="bold"
                letterSpacing="9"
              >
                DIGITAL
              </text>

              {/* SOLUTIONS - Row 3 */}
              <text
                x="235"
                y="92"
                fill="#FFFFFF"
                fontFamily="Space Grotesk, system-ui, -apple-system, sans-serif"
                fontSize="21"
                fontWeight="bold"
                letterSpacing="9"
              >
                SOLUTIONS
              </text>
            </>
          )}

          {/* USA - Row 4 with elegant violet color and dashed alignments */}
          {/* Decorative lines around USA */}
          <line x1="235" y1="108" x2="310" y2="108" stroke="#7B2FBE" strokeWidth="1.5" strokeOpacity="0.8" />
          <text
            x="320"
            y="112"
            fill="#C026D3"
            fontFamily="Space Grotesk, system-ui, -apple-system, sans-serif"
            fontSize="12"
            fontWeight="extrabold"
            letterSpacing="6"
          >
            USA
          </text>
          <line x1="375" y1="108" x2="450" y2="108" stroke="#7B2FBE" strokeWidth="1.5" strokeOpacity="0.8" />
        </>
      )}
    </svg>
  );
}
