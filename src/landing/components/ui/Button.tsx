import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "onLight";
type Size = "md" | "sm";

interface ButtonStyle {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

export function buttonClasses({ variant = "primary", size = "md", fullWidth = false }: ButtonStyle = {}) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";
  const sizes = size === "md" ? "h-12 gap-2.5 px-5 text-[15px]" : "h-11 gap-2 px-4 text-sm";
  const variants = {
    primary: "bg-violet text-white hover:bg-violet-deep",
    secondary: "border border-white/20 text-ink hover:border-white/40 hover:bg-white/5",
    onLight: "border border-strip-ink/20 text-strip-ink hover:border-strip-ink/40 hover:bg-strip-ink/5",
  };
  return `${base} ${sizes} ${variants[variant]} ${fullWidth ? "w-full" : ""}`;
}

// The project has no React type definitions, so the accepted attributes are listed explicitly
interface ButtonProps extends ButtonStyle {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
  "aria-pressed"?: boolean;
  "aria-describedby"?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={`${buttonClasses({ variant, size, fullWidth })} ${className}`} {...rest}>
      {children}
    </button>
  );
}
