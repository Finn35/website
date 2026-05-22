"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useT } from "@/components/LanguageProvider";
import { cn } from "@/lib/cn";

export function Navbar() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu only — desktop header is deliberately minimal (logo + lang + CTA)
  const mobileLinks = [
    { href: "#features", label: t.nav.features },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled
          ? "border-b border-line/80 bg-canvas/85 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-[64px] w-full max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Brand — wordmark only, no icon */}
        <a
          href="#top"
          aria-label="Lumeq"
          className="font-display text-[24px] font-medium leading-none tracking-tight text-ink"
        >
          Lumeq
        </a>

        {/* Right cluster — desktop: 2 items only */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher size="sm" tone="light" />
          <Button href="#contact" variant="burgundy" size="sm">
            {t.nav.cta}
          </Button>
        </div>

        {/* Mobile trigger */}
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="relative grid h-10 w-10 place-items-center rounded-button border border-ink/12 text-ink md:hidden"
        >
          <span
            className={cn(
              "block h-px w-4 bg-current transition-transform",
              open ? "translate-y-[3px] rotate-45" : "-translate-y-[3px]"
            )}
          />
          <span
            className={cn(
              "absolute block h-px w-4 bg-current transition-transform",
              open ? "-rotate-45" : "translate-y-[3px]"
            )}
          />
        </button>
      </div>

      {/* Mobile menu — keeps all nav links accessible */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="border-t border-line bg-canvas/98 backdrop-blur-xl md:hidden"
          >
            <div className="mx-auto flex max-w-[1240px] flex-col gap-1 px-5 py-5">
              {mobileLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-[15.5px] text-ink/85 hover:bg-ink/[0.04] hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
                <LanguageSwitcher size="md" tone="light" />
                <Button
                  href="#contact"
                  variant="burgundy"
                  size="md"
                  className="flex-1 justify-center"
                  onClick={() => setOpen(false)}
                >
                  {t.nav.cta}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
