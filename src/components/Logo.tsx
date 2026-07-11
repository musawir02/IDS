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
    <img
      src="/assets/images/logo_full.png"
      alt="Brand Logo"
      width={numWidth}
      height={numHeight}
      className={`select-none object-contain mix-blend-screen ${className}`}
      style={{ height: numHeight, width: numWidth }}
    />
  );
}
