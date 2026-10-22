import logoFull from "../assets/images/ids-white-tagline.png";
import logoMark from "../assets/images/ids-white.png";

interface LogoProps {
  className?: string;
  height?: number | string;
  variant?: "full" | "simplified" | "icon";
}

export default function Logo({ className = "", height = 40, variant = "full" }: LogoProps) {
  return (
    <img
      src={variant === "full" ? logoFull : logoMark}
      alt="IDS — Impulse Digital Solutions"
      className={`select-none shrink-0 ${className}`}
      style={{ height, width: "auto" }}
      draggable={false}
    />
  );
}
