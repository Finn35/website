"use client";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useT } from "@/components/LanguageProvider";

export function Footer() {
  const t = useT();

  const navLinks = [
    { href: "#features", label: t.nav.features },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="relative bg-canvas pb-10 text-ink">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-10 border-t border-line pt-12 md:flex-row md:items-end">
          <div className="max-w-[44ch]">
            <a
              href="#top"
              className="font-display text-[24px] font-medium leading-none text-ink"
            >
              Lumeq
            </a>
            <p className="mt-4 text-[14px] leading-relaxed text-ink/55">
              {t.footer.tagline}
            </p>
            <a
              href="mailto:hello@lumeq.eu"
              className="mt-5 inline-block text-[14px] text-ink/85 underline-offset-4 transition-colors hover:text-burgundy hover:underline"
            >
              hello@lumeq.eu
            </a>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end">
            <nav className="flex flex-wrap items-center gap-x-7 gap-y-3">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-[13px] text-ink/55 transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <LanguageSwitcher size="sm" tone="light" />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 text-[12px] uppercase tracking-eyebrow text-ink/35 sm:flex-row sm:items-center">
          <p>
            {t.footer.copy} · lumeq.eu
          </p>
          <p>{t.footer.suffix}</p>
        </div>
      </div>
    </footer>
  );
}
