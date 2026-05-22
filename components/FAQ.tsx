"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useT } from "@/components/LanguageProvider";
import { cn } from "@/lib/cn";

export function FAQ() {
  const { faq } = useT();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-paper py-20 text-ink sm:py-28">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <span className="eyebrow text-ink/55">{faq.eyebrow}</span>
            <h2 className="mt-6 max-w-[16ch] font-display text-display-lg font-medium leading-[1.04] text-ink text-balance">
              {faq.headline}
            </h2>
            <p className="mt-5 max-w-[36ch] text-pretty text-[15px] leading-relaxed text-ink/60">
              {faq.subhead}
            </p>
            <a
              href={`mailto:${faq.contactLink}`}
              className="group mt-8 inline-flex items-center gap-3 border-b border-ink/15 pb-2 text-[14.5px] text-ink transition-colors hover:border-burgundy hover:text-burgundy"
            >
              {faq.contactLink}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path
                  d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Reveal>

          <div className="divide-y divide-line border-y border-line md:col-span-7">
            {faq.items.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "font-display text-[20px] font-medium leading-snug transition-colors sm:text-[22px]",
                        isOpen ? "text-ink" : "text-ink/75 hover:text-ink"
                      )}
                    >
                      {f.q}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                        isOpen
                          ? "rotate-45 border-burgundy/40 bg-burgundy/8 text-burgundy"
                          : "border-line bg-surface text-ink/55"
                      )}
                    >
                      <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M7 2v10M2 7h10"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[58ch] pb-6 pr-10 text-[14.5px] leading-relaxed text-ink/60 text-pretty">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
