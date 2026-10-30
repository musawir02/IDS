import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "onLight";
type Size = "md" | "sm";

interface ButtonStyle {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

export function buttonClasses({ variant = "primary", size = "md", fullWidth = false }: ButtonStyle = {}) {
  const base =
    "group inline-flex items-center justify-center rounded-full font-semibold transition-[filter,background-color,border-color,transform] duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100";
  const sizes = size === "md" ? "h-14 gap-3 px-6 text-[15px] md:h-[52px]" : "h-11 gap-2 px-4 text-sm";
  const variants = {
    primary:
      "bg-gradient-to-r from-violet to-violet-deep text-white shadow-[0_10px_30px_-12px_rgba(147,51,234,0.8)] hover:brightness-110",
    secondary: "border border-lilac/40 text-ink hover:border-lilac hover:bg-lilac/10",
    onLight: "border border-violet-deep/40 text-strip-ink hover:border-violet-deep hover:bg-violet-deep/10",
  };
  return `${base} ${sizes} ${variants[variant]} ${fullWidth ? "w-full" : ""}`;
}

/** The poster's arrow-in-a-circle, shown on primary buttons */
export function ButtonArrow() {
  return (
    <span
      aria-hidden="true"
      className="grid size-7 shrink-0 place-items-center rounded-full bg-white/15 transition-transform duration-200 group-hover:translate-x-1"
    >
      <ArrowRight className="size-4" />
    </span>
  );
}

// The project has no React type definitions, so the accepted attributes are listed explicitly
interface ButtonProps extends ButtonStyle {
  arrow?: boolean;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
  "aria-pressed"?: boolean;
  "aria-describedby"?: string;
  "data-next"?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  arrow = false,
  className = "",
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={`${buttonClasses({ variant, size, fullWidth })} ${className}`} {...rest}>
      <span>{children}</span>
      {arrow && <ButtonArrow />}
    </button>
  );
}
