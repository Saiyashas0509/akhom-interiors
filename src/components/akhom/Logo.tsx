import { Link } from "@tanstack/react-router";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";

export function Logo({
  className = "",
  variant = "dark",
  size = "sm",
}: {
  className?: string;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}) {
  const heights = {
    sm: "h-9 sm:h-11 md:h-12",
    md: "h-12 sm:h-14 md:h-16",
    lg: "h-18 sm:h-24 md:h-28",
  } as const;

  const imgSrc = variant === "light" ? logoLight : logoDark;

  return (
    <Link
      to="/"
      className={`inline-flex items-center group transition-transform duration-300 hover:scale-[1.02] ${className}`}
      aria-label="AKHOM INTERIORS — home"
    >
      <img
        src={imgSrc}
        alt="AKHOM INTERIORS"
        className={`${heights[size]} w-auto max-w-full object-contain shrink-0 transition-opacity duration-300 group-hover:opacity-90`}
        loading="eager"
        decoding="async"
      />
    </Link>
  );
}


