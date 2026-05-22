"use client";

import { motion } from "framer-motion";
import { useT } from "@/components/LanguageProvider";

/**
 * A polished "fake website" inside a browser chrome.
 * Used as the hero's visual proof — shows the kind of website Lumeq builds.
 */
export function BrowserMockup() {
  const { hero } = useT();
  const m = hero.mockup;

  return (
    <div className="relative">
      {/* Soft burgundy halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(74,24,37,0.18), rgba(74,24,37,0) 70%)",
        }}
      />

      {/* The browser frame */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-mockup ring-1 ring-ink/[0.02]"
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-3 border-b border-line/80 bg-paper/60 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="block h-2.5 w-2.5 rounded-full bg-[#FF5F57]/80" />
            <span className="block h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/80" />
            <span className="block h-2.5 w-2.5 rounded-full bg-[#28C840]/80" />
          </div>
          <div className="mx-auto inline-flex items-center gap-1.5 rounded-md bg-surface px-3 py-1 text-[11px] text-ink/55 ring-1 ring-line/80">
            <LockIcon />
            <span className="tabular">{m.url}</span>
          </div>
          <div className="hidden w-12 sm:block" aria-hidden />
        </div>

        {/* Fake site content */}
        <div className="relative px-5 pb-7 pt-6 sm:px-9 sm:pb-10 sm:pt-8">
          {/* Mini site nav */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-[20px] font-medium leading-none text-ink sm:text-[24px]">
                {m.brand}
              </span>
              <span className="hidden text-[10px] uppercase tracking-eyebrow text-ink/40 sm:inline">
                {m.brandTagline}
              </span>
            </div>
            <span className="hidden text-[12px] text-ink/50 sm:inline">
              {m.cta} →
            </span>
          </div>

          <div className="mt-5 h-px w-full bg-line/80" aria-hidden />

          {/* Hero of fake site */}
          <div className="mt-7 grid items-center gap-5 sm:grid-cols-[1.5fr_1fr] sm:gap-7">
            <div>
              <h3 className="max-w-[14ch] font-display text-[24px] font-medium leading-[1.05] text-ink text-balance sm:text-[30px]">
                {m.headline}
              </h3>
              <p className="mt-3 max-w-[34ch] text-[13px] leading-relaxed text-ink/55">
                {m.sub}
              </p>

              <button
                type="button"
                className="mt-5 inline-flex items-center gap-2 rounded-button bg-burgundy px-4 py-2.5 text-[12.5px] font-medium text-canvas shadow-burgundy transition-transform hover:-translate-y-0.5"
              >
                {m.cta}
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Star rating */}
              <div className="mt-5 flex items-center gap-2 text-[11.5px] text-ink/55">
                <Stars />
                <span className="tabular">{m.stars}</span>
              </div>
            </div>

            {/* Decorative card */}
            <div className="relative h-[180px] overflow-hidden rounded-xl bg-gradient-to-br from-burgundy-50 via-paper to-canvas sm:h-[210px]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 25% 25%, rgba(74,24,37,0.10) 0%, transparent 35%)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-gold/20 blur-2xl"
              />
              {/* "Available today" chip */}
              <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-surface/90 px-3 py-2 text-[11.5px] text-ink/75 backdrop-blur-sm ring-1 ring-line/60">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Vrij vandaag</span>
                  <span className="tabular text-ink/45">14:30 · 16:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating "booking confirmed" toast */}
      <motion.div
        initial={{ opacity: 0, x: -16, y: 8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-6 -left-4 z-10 hidden w-[260px] rounded-2xl border border-line bg-surface p-4 shadow-card sm:block"
      >
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-burgundy/12 text-burgundy">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3.5 8.5l3 3 6-7"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-ink">{m.toastTitle}</p>
            <p className="mt-0.5 text-[12px] text-ink/55">{m.toastBody}</p>
          </div>
        </div>
      </motion.div>

      {/* Floating "review" chip */}
      <motion.div
        initial={{ opacity: 0, x: 12, y: -8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -right-3 -top-5 z-10 hidden items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 shadow-card sm:inline-flex"
      >
        <Stars compact />
        <span className="text-[11.5px] text-ink/65 tabular">+ 5.0 review</span>
      </motion.div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect
        x="3"
        y="6.5"
        width="8"
        height="5.5"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4.8 6.5V5a2.2 2.2 0 0 1 4.4 0v1.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Stars({ compact = false }: { compact?: boolean }) {
  const size = compact ? 11 : 13;
  return (
    <span className="inline-flex items-center gap-0.5 text-gold-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 14 14"
          fill="currentColor"
          aria-hidden
        >
          <path d="M7 1.2l1.85 3.74 4.15.6-3 2.93.7 4.13L7 10.66 3.3 12.6 4 8.47l-3-2.93 4.15-.6L7 1.2z" />
        </svg>
      ))}
    </span>
  );
}
