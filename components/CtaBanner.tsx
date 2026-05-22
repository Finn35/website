"use client";

import { Button, ArrowRight } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { useContactModal } from "@/components/ContactModalProvider";
import { useT } from "@/components/LanguageProvider";

export function CtaBanner() {
  const { ctaBanner } = useT();
  const { open: openContact } = useContactModal();

  return (
    <section
      id="contact"
      className="relative isolate w-full overflow-hidden bg-canvas pb-24 pt-10 sm:pb-32"
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-16 text-canvas sm:px-16 sm:py-20">
          {/* burgundy glow accent */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-55 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(74,24,37,0.85), rgba(74,24,37,0) 70%)",
            }}
          />
          {/* gold whisper */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-12 top-12 h-[220px] w-[220px] rounded-full opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(201,169,110,0.55), rgba(201,169,110,0) 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 -bottom-32 h-[360px] w-[360px] rounded-full opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(250,250,249,0.4), rgba(250,250,249,0) 70%)",
            }}
          />
          {/* subtle grain */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.65 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="eyebrow text-canvas/55">
                {ctaBanner.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-display-lg font-medium leading-[1.04] text-canvas text-balance sm:text-[clamp(2.25rem,3vw+1rem,3.5rem)]">
                {ctaBanner.headlinePre}{" "}
                <span className="italic text-gold-400">
                  {ctaBanner.headlineEmphasis}
                </span>{" "}
                {ctaBanner.headlinePost}
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mx-auto mt-6 max-w-[52ch] text-pretty text-[16px] leading-relaxed text-canvas/70">
                {ctaBanner.subhead}
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Button
                  href="/contact"
                  variant="burgundy"
                  size="lg"
                  onClick={(e) => {
                    e.preventDefault();
                    openContact();
                  }}
                >
                  {ctaBanner.button}
                  <ArrowRight />
                </Button>
                <Button
                  href="mailto:hello@lumeq.eu"
                  variant="ghost-light"
                  size="lg"
                >
                  hello@lumeq.eu
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.34}>
              <p className="mt-8 text-[12.5px] text-canvas/40">
                {ctaBanner.note}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
