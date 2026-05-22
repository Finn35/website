"use client";

import { animate, AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal, staggerChild, staggerParent } from "@/components/ui/Reveal";
import { useT } from "@/components/LanguageProvider";
import { cn } from "@/lib/cn";

type BillingMode = "monthly" | "onetime";

const PLAN_PRICES = [
  { monthly: 49, onetime: 399, hosting: 19 },
  { monthly: 79, onetime: 699, hosting: 29 },
] as const;

export function Pricing() {
  const t = useT();
  const [mode, setMode] = useState<BillingMode>("monthly");

  return (
    <section
      id="pricing"
      className="relative bg-canvas py-20 text-ink sm:py-28"
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow text-ink/55">{t.pricing.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-display-lg font-medium leading-[1.04] text-ink text-balance">
              {t.pricing.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-[52ch] text-pretty text-[16px] leading-relaxed text-ink/60">
              {t.pricing.subhead}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.24} className="mt-10 flex justify-center sm:mt-12">
          <BillingToggle mode={mode} setMode={setMode} />
        </Reveal>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto mt-12 grid max-w-[920px] grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
        >
          {t.pricing.plans.map((plan, i) => (
            <motion.div key={plan.name} variants={staggerChild}>
              <PricingCard
                plan={plan}
                prices={PLAN_PRICES[i]}
                mode={mode}
                featured={i === 1}
              />
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-[14px] leading-relaxed text-ink/70">
            {t.pricing.footnoteMain}
          </p>
          <p className="mt-3 text-[13.5px] leading-relaxed text-ink/50">
            {t.pricing.footnoteCompareLead}{" "}
            <span className="text-ink/80">{t.pricing.footnoteCompareTail}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Toggle                                                                     */
/* -------------------------------------------------------------------------- */

function BillingToggle({
  mode,
  setMode,
}: {
  mode: BillingMode;
  setMode: (m: BillingMode) => void;
}) {
  const t = useT();
  return (
    <div className="relative">
      {/* "Save 20%" floating badge */}
      <span
        className={cn(
          "absolute -top-7 right-1 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10.5px] uppercase tracking-eyebrow transition-colors duration-300",
          mode === "onetime"
            ? "border-burgundy/40 bg-burgundy/8 text-burgundy"
            : "border-line bg-surface text-ink/55"
        )}
      >
        <span className="block h-1 w-1 rounded-full bg-current" />
        {t.pricing.saveBadge}
      </span>

      <div
        role="tablist"
        aria-label="Billing"
        className="relative inline-flex rounded-full border border-line bg-surface p-1 shadow-[0_1px_0_rgba(24,24,27,0.03)]"
      >
        <ToggleOption
          active={mode === "monthly"}
          onClick={() => setMode("monthly")}
          label={t.pricing.monthly}
        />
        <ToggleOption
          active={mode === "onetime"}
          onClick={() => setMode("onetime")}
          label={t.pricing.onetime}
        />
      </div>
    </div>
  );
}

function ToggleOption({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className="relative z-10 inline-flex h-9 items-center justify-center rounded-full px-6 text-[13px] font-medium tracking-tight transition-colors"
    >
      {active && (
        <motion.span
          layoutId="billing-pill"
          transition={{ type: "spring", stiffness: 360, damping: 32 }}
          className="absolute inset-0 rounded-full bg-ink"
        />
      )}
      <span
        className={cn(
          "relative",
          active ? "text-canvas" : "text-ink/55 hover:text-ink"
        )}
      >
        {label}
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Card                                                                       */
/* -------------------------------------------------------------------------- */

function PricingCard({
  plan,
  prices,
  mode,
  featured,
}: {
  plan: {
    name: string;
    tagline: string;
    description: string;
    features: string[];
    cta: string;
  };
  prices: { monthly: number; onetime: number; hosting: number };
  mode: BillingMode;
  featured: boolean;
}) {
  const t = useT();
  const target = mode === "monthly" ? prices.monthly : prices.onetime;
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    const controls = animate(display, target, {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-all duration-500 sm:p-9",
        featured
          ? "border-2 border-burgundy bg-featured shadow-burgundy hover:-translate-y-1 hover:shadow-burgundy-hover"
          : "border border-line bg-surface shadow-card hover:-translate-y-1 hover:shadow-card-hover"
      )}
    >
      {/* "Most popular" badge */}
      {featured && (
        <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-burgundy/30 bg-burgundy/8 px-2.5 py-0.5 text-[10.5px] uppercase tracking-eyebrow text-burgundy">
          <span className="block h-1 w-1 rounded-full bg-burgundy" />
          {t.pricing.mostPopular}
        </span>
      )}

      <div className="relative">
        <h3 className="font-display text-[28px] font-medium leading-none text-ink">
          {plan.name}
        </h3>
        <p className="mt-2 text-[12px] uppercase tracking-eyebrow text-ink/45">
          {plan.tagline}
        </p>
        <p className="mt-5 max-w-[36ch] text-[14.5px] leading-relaxed text-ink/65">
          {plan.description}
        </p>
      </div>

      {/* Price */}
      <div className="relative mt-8 flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[52px] font-medium leading-none tabular text-ink">
            €{display}
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={mode}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="text-[13px] text-ink/45"
            >
              {mode === "monthly" ? t.pricing.perMonth : t.pricing.onceSuffix}
            </motion.span>
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {mode === "onetime" && (
            <motion.p
              key="hosting-note"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden text-[12.5px] text-ink/50"
            >
              {t.pricing.hostingPrefix}
              {prices.hosting}
              {t.pricing.hostingSuffix}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <span
        aria-hidden
        className={cn(
          "relative mt-8 block h-px w-full",
          featured ? "bg-burgundy/15" : "bg-line"
        )}
      />

      {/* Features */}
      <ul className="relative mt-6 flex flex-1 flex-col gap-3 text-[14px]">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <Check />
            <span className="text-ink/75">{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="relative mt-8">
        <Button
          href="#contact"
          variant={featured ? "burgundy" : "ink"}
          size="lg"
          className="w-full justify-center"
        >
          {plan.cta}
        </Button>
      </div>
    </div>
  );
}

function Check() {
  return (
    <span
      aria-hidden
      className="mt-[3px] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-burgundy/12 text-burgundy"
    >
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
  );
}
