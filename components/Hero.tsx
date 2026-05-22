"use client";

import { motion } from "framer-motion";
import { Button, ArrowRight } from "@/components/ui/Button";
import { BrowserMockup } from "@/components/BrowserMockup";
import { useT } from "@/components/LanguageProvider";
import { staggerChild, staggerParent } from "@/components/ui/Reveal";

export function Hero() {
  const { hero } = useT();

  return (
    <section
      id="top"
      className="relative isolate w-full overflow-hidden bg-canvas pt-28 sm:pt-32"
    >
      {/* Soft burgundy glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] -z-10 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(74,24,37,0.20), rgba(74,24,37,0) 70%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1240px] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        {/* Split at md (768px+) so tablet also sees the mockup; refined ratio at lg */}
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* LEFT — text + CTA */}
          <motion.div
            variants={staggerParent}
            initial="hidden"
            animate="show"
            className="relative z-10"
          >
            <motion.span variants={staggerChild} className="eyebrow text-ink/55">
              {hero.eyebrow}
            </motion.span>

            <motion.h1
              variants={staggerChild}
              className="mt-6 max-w-[18ch] font-display text-display-xl font-medium text-ink text-balance"
            >
              {hero.headlinePre}{" "}
              <span className="italic text-gold-500">
                {hero.headlineEmphasis}
              </span>
              {hero.headlinePost}
            </motion.h1>

            <motion.p
              variants={staggerChild}
              className="mt-6 max-w-[52ch] text-pretty text-[16px] leading-relaxed text-ink/60 sm:text-[17px]"
            >
              {hero.subhead}
            </motion.p>

            <motion.div
              variants={staggerChild}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button href="#contact" variant="burgundy" size="lg">
                {hero.ctaPrimary}
                <ArrowRight />
              </Button>
              <Button href="#pricing" variant="ghost" size="lg">
                {hero.ctaSecondary}
              </Button>
            </motion.div>

            {/* Trust line */}
            <motion.ul
              variants={staggerChild}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              {[hero.trust.fast, hero.trust.price, hero.trust.risk].map(
                (item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 text-[13px] text-ink/65"
                  >
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-burgundy/12 text-burgundy">
                      <svg width="9" height="9" viewBox="0 0 12 12" aria-hidden>
                        <path
                          d="M2.5 6.5l2.3 2.3L9.5 3.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                )
              )}
            </motion.ul>
          </motion.div>

          {/* RIGHT — browser mockup */}
          <div className="relative">
            <BrowserMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
