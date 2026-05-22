"use client";

import { motion } from "framer-motion";
import { useLang } from "@/components/LanguageProvider";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({
  size = "md",
  tone = "light",
}: {
  size?: "sm" | "md";
  tone?: "light" | "dark";
}) {
  const { lang, setLang, t } = useLang();

  const dimensions =
    size === "sm" ? "h-7 text-[11.5px] px-2.5" : "h-8 text-[12px] px-3";

  const onLight =
    tone === "light"
      ? {
          shell: "border-ink/12 bg-white/70",
          active: "text-white",
          inactive: "text-ink/55 hover:text-ink",
          pill: "bg-ink",
        }
      : {
          shell: "border-white/15 bg-white/[0.04]",
          active: "text-ink",
          inactive: "text-white/65 hover:text-white",
          pill: "bg-white",
        };

  return (
    <div
      role="tablist"
      aria-label={t.langSwitch.label}
      className={cn(
        "relative inline-flex items-center rounded-full border p-[3px]",
        onLight.shell
      )}
    >
      {(["nl", "en"] as const).map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => setLang(code)}
            className={cn(
              "relative inline-flex items-center justify-center rounded-full font-medium tracking-tight transition-colors",
              dimensions,
              active ? onLight.active : onLight.inactive
            )}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className={cn("absolute inset-0 rounded-full", onLight.pill)}
              />
            )}
            <span className="relative">
              {code === "nl" ? t.langSwitch.nl : t.langSwitch.en}
            </span>
          </button>
        );
      })}
    </div>
  );
}
