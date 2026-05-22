"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/* StarRow                                                                    */
/* -------------------------------------------------------------------------- */

export function StarRow({
  count = 5,
  size = 16,
  className,
}: {
  count?: number;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-0.5 text-gold-400", className)}
      aria-label={`${count} van de 5 sterren`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 2.25l2.95 6.34 6.95.78-5.18 4.72 1.46 6.85L12 17.6l-6.18 3.34 1.46-6.85L2.1 9.37l6.95-.78L12 2.25z" />
        </svg>
      ))}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* GoogleLogo — compact multi-color "G" used on review cards                  */
/* -------------------------------------------------------------------------- */

export function GoogleLogo({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      className="shrink-0"
    >
      <path
        fill="#4285F4"
        d="M22.5 12.27c0-.78-.07-1.53-.2-2.27H12v4.3h5.9a5.05 5.05 0 0 1-2.19 3.32v2.76h3.54c2.07-1.91 3.25-4.73 3.25-8.11z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.95 0 5.43-.98 7.24-2.65l-3.54-2.76c-.98.66-2.24 1.05-3.7 1.05-2.85 0-5.27-1.92-6.13-4.51H2.2v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.87 14.13a6.62 6.62 0 0 1 0-4.26V7.03H2.2a11 11 0 0 0 0 9.94l3.67-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.6 0 3.05.55 4.18 1.63l3.14-3.14C17.43 2.1 14.95 1 12 1A11 11 0 0 0 2.2 7.03l3.67 2.84C6.73 7.3 9.15 5.38 12 5.38z"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* AnimatedCounter — counts up from 0 → target once the ref enters viewport   */
/* -------------------------------------------------------------------------- */

export function AnimatedCounter({
  to,
  decimals = 0,
  duration = 1.2,
  className,
  /** Decimal separator. NL uses comma, EN uses dot. */
  decimalSeparator = ",",
  /** Triggers re-animation when this changes back to true. */
  inView,
}: {
  to: number;
  decimals?: number;
  duration?: number;
  className?: string;
  decimalSeparator?: string;
  inView: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setValue(latest),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  const formatted =
    decimals === 0
      ? Math.round(value).toLocaleString("nl-NL")
      : value.toFixed(decimals).replace(".", decimalSeparator);

  return (
    <span className={cn("tabular", className)}>{formatted}</span>
  );
}

/**
 * Returns [ref, inView] from framer-motion's useInView with sensible defaults.
 * Convenience for "fire animation once when this section scrolls into view".
 */
export function useFireOnce<T extends Element = HTMLDivElement>(
  amount: number = 0.3
) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount });
  return [ref, inView] as const;
}

/* -------------------------------------------------------------------------- */
/* ReviewCard                                                                 */
/* -------------------------------------------------------------------------- */

export type ReviewAccent = "burgundy" | "gold" | "green";

export type Review = {
  name: string;
  date: string;
  text: string;
  accent?: ReviewAccent;
  /** Defaults to true — shows "Geverifieerde klant" below the name. */
  verified?: boolean;
};

const ACCENT_CLASSES: Record<ReviewAccent, string> = {
  burgundy: "bg-burgundy/12 text-burgundy",
  gold: "bg-gold-100 text-gold-600",
  // Dark forest green — chosen warm enough to harmonise with burgundy/gold.
  green: "bg-[#E0E9DF] text-[#2E5235]",
};

export function ReviewCard({
  review,
  tone = "light",
}: {
  review: Review;
  tone?: "light" | "dark";
}) {
  const verified = review.verified ?? true;

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl p-6 sm:p-7",
        tone === "light"
          ? "border border-line bg-surface"
          : "border border-canvas/10 bg-canvas/[0.04]"
      )}
    >
      <header className="flex items-start gap-3">
        <Avatar name={review.name} accent={review.accent ?? "burgundy"} />
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "truncate text-[14.5px] font-medium leading-tight",
              tone === "light" ? "text-ink" : "text-canvas"
            )}
          >
            {review.name}
          </p>
          {verified && (
            <p
              className={cn(
                "mt-0.5 inline-flex items-center gap-1 text-[11.5px] leading-tight",
                tone === "light" ? "text-ink/45" : "text-canvas/45"
              )}
            >
              <VerifiedTick />
              Geverifieerde klant
            </p>
          )}
        </div>
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-medium",
            tone === "light"
              ? "border border-line bg-paper text-ink/60"
              : "border border-canvas/10 bg-canvas/[0.05] text-canvas/60"
          )}
        >
          <GoogleLogo size={11} />
          Google
        </span>
      </header>
      <div className="mt-4 flex items-center gap-2">
        <StarRow size={15} />
        <span
          className={cn(
            "text-[12px]",
            tone === "light" ? "text-ink/45" : "text-canvas/45"
          )}
        >
          {review.date}
        </span>
      </div>
      <p
        className={cn(
          "mt-3 text-[14.5px] leading-relaxed text-pretty",
          tone === "light" ? "text-ink/75" : "text-canvas/75"
        )}
      >
        &ldquo;{review.text}&rdquo;
      </p>
    </article>
  );
}

function Avatar({
  name,
  accent,
}: {
  name: string;
  accent: ReviewAccent;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      aria-hidden
      className={cn(
        "grid h-10 w-10 shrink-0 place-items-center rounded-full text-[13px] font-medium",
        ACCENT_CLASSES[accent]
      )}
    >
      {initials}
    </span>
  );
}

function VerifiedTick() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      aria-hidden
      className="text-emerald-600"
    >
      <circle cx="6" cy="6" r="5" fill="currentColor" />
      <path
        d="M3.5 6l1.7 1.6L8.5 4.3"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* SectionEyebrow                                                             */
/* -------------------------------------------------------------------------- */

export function SectionEyebrow({
  children,
  tone = "ink",
}: {
  children: React.ReactNode;
  tone?: "ink" | "canvas";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[11px] font-medium uppercase leading-none tracking-eyebrow",
        tone === "ink" ? "text-ink/55" : "text-canvas/55"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "block h-[5px] w-[5px] rounded-full",
          tone === "ink" ? "bg-burgundy" : "bg-gold-400"
        )}
      />
      {children}
    </span>
  );
}
