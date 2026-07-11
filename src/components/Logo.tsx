import React from "react";

interface LogoProps {
  className?: string;
  height?: number | string;
  variant?: "full" | "simplified" | "icon";
}

export default function Logo({ className = "", height = 40, variant = "full" }: LogoProps) {
  // Convert height to number if possible for exact aspect ratio calculation
  const baseHeight = typeof height === "number" 
    ? height 
    : parseInt(height as string, 10) || 40;
    
  // Increase this scale factor to make the logo larger or smaller across the site
  const SCALE_FACTOR = 1.5; 
  const numHeight = baseHeight * SCALE_FACTOR;

  return (
    <img
      src="/assets/images/logo_full.png"
      alt="Brand Logo"
      height={numHeight}
      className={`select-none mix-blend-screen ${className}`}
      style={{ height: numHeight, width: "auto" }}
    />
  );
}
