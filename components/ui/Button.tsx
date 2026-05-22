"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { forwardRef, type ReactNode } from "react";

type Variant = "burgundy" | "ink" | "ghost" | "ghost-light";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children?: ReactNode;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-button font-medium tracking-tight transition-colors duration-200 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[13.5px]",
  md: "px-5 py-2.5 text-[14px]",
  lg: "px-6 py-3.5 text-[14.5px]",
};

const variants: Record<Variant, string> = {
  burgundy:
    "bg-burgundy text-canvas shadow-burgundy hover:bg-burgundy-700 hover:shadow-burgundy-hover",
  ink: "bg-ink text-canvas hover:bg-ink-800",
  ghost:
    "border border-ink/15 bg-white/0 text-ink hover:border-ink/40 hover:bg-ink/[0.03]",
  "ghost-light":
    "border border-white/20 bg-white/0 text-white hover:border-white/45 hover:bg-white/[0.05]",
};

export const Button = forwardRef<HTMLAnchorElement, ButtonProps>(function Button(
  {
    variant = "burgundy",
    size = "md",
    className,
    children,
    href = "#",
    target,
    rel,
    onClick,
    ...rest
  },
  ref
) {
  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      aria-label={rest["aria-label"]}
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className={cn(base, sizes[size], variants[variant], className)}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </motion.a>
  );
});

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className={cn(
        "transition-transform duration-300 group-hover:translate-x-0.5",
        className
      )}
    >
      <path
        d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
