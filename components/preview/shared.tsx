"use client";

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
/* ReviewCard                                                                 */
/* -------------------------------------------------------------------------- */

export type Review = {
  name: string;
  date: string;
  text: string;
};

export function ReviewCard({
  review,
  tone = "light",
}: {
  review: Review;
  tone?: "light" | "dark";
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl p-6 sm:p-7",
        tone === "light"
          ? "border border-line bg-surface"
          : "border border-canvas/10 bg-canvas/[0.04]"
      )}
    >
      <header className="flex items-center gap-3">
        <Avatar name={review.name} />
        <div className="min-w-0">
          <p
            className={cn(
              "truncate text-[14.5px] font-medium",
              tone === "light" ? "text-ink" : "text-canvas"
            )}
          >
            {review.name}
          </p>
          <p
            className={cn(
              "text-[12px]",
              tone === "light" ? "text-ink/45" : "text-canvas/45"
            )}
          >
            {review.date} · Google review
          </p>
        </div>
      </header>
      <div className="mt-4">
        <StarRow size={15} />
      </div>
      <p
        className={cn(
          "mt-3 text-[14.5px] leading-relaxed text-pretty",
          tone === "light" ? "text-ink/75" : "text-canvas/75"
        )}
      >
        “{review.text}”
      </p>
    </article>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      aria-hidden
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-burgundy/12 text-[13px] font-medium text-burgundy"
    >
      {initials}
    </span>
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
