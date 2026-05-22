"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useContactModal } from "@/components/ContactModalProvider";
import { useBookingDemo } from "@/components/preview/BookingDemoDialog";
import {
  AnimatedCounter,
  ReviewCard,
  SectionEyebrow,
  StarRow,
  useFireOnce,
  type Review,
} from "@/components/preview/shared";
import type { Preview } from "@/data/previews";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/* Static data                                                                */
/* -------------------------------------------------------------------------- */

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1600&q=80&auto=format&fit=crop";

const SERVICES = [
  {
    name: "Knippen",
    price: 25,
    body: "Wassen, knippen en drogen — afgestemd op jouw gezicht en wens.",
    Icon: ScissorsIcon,
    bg: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=720&q=70&auto=format&fit=crop",
  },
  {
    name: "Kleuren",
    price: 45,
    body: "Volledige kleur of highlights. Hoogwaardige producten, fijn resultaat.",
    Icon: ColorIcon,
    bg: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=720&q=70&auto=format&fit=crop",
  },
  {
    name: "Stylen",
    price: 35,
    body: "Voor bruiloften, fotoshoots of gewoon een avond die telt.",
    Icon: SparkleIcon,
    bg: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=720&q=70&auto=format&fit=crop",
  },
] as const;

const REVIEWS: Review[] = [
  {
    name: "Anouk de Vries",
    date: "3 weken geleden",
    accent: "burgundy",
    text: "Yara luistert écht. Mijn nieuwe kleur zit nog steeds perfect na twee maanden — eindelijk een kapper die het begrijpt.",
  },
  {
    name: "Mark Janssen",
    date: "2 maanden geleden",
    accent: "gold",
    text: "Snel, vriendelijk, en geen onnodig gepraat. Precies wat ik zocht. Kom hier nu al een jaar — altijd top.",
  },
  {
    name: "Lisa van der Berg",
    date: "1 maand geleden",
    accent: "green",
    text: "De ruimte is rustig en warm, en je voelt je meteen op je gemak. Zonde dat ik niet eerder hier kwam.",
  },
];

// Stable time grid (avoids hydration mismatch from `new Date()`).
const TIMES = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
] as const;

type DayDef = {
  label: string;
  date: string | null;
  /** Indices of `TIMES` that are already booked. */
  booked: readonly number[];
};

// 7 deterministic days. Dates are aesthetic only — same string every render.
const DAYS: readonly DayDef[] = [
  { label: "Vandaag", date: null, booked: [0, 3, 6, 11] },
  { label: "Morgen", date: null, booked: [2, 5, 8] },
  { label: "Wo", date: "28 mei", booked: [1, 4, 7, 10] },
  { label: "Do", date: "29 mei", booked: [0, 5, 9] },
  { label: "Vr", date: "30 mei", booked: [3, 8, 11] },
  { label: "Za", date: "31 mei", booked: [2, 6, 9, 10] },
  { label: "Zo", date: "1 jun", booked: [0, 1, 2, 11] },
];

/* -------------------------------------------------------------------------- */
/* Main template                                                              */
/* -------------------------------------------------------------------------- */

export function KapperTemplate({ preview }: { preview: Preview }) {
  const { trigger: openDemo, dialog } = useBookingDemo(preview.businessName);
  const { open: openContact } = useContactModal();

  const handleContact = () =>
    openContact({ prefill: { bedrijfsnaam: preview.businessName } });

  // Smoothly scroll to the booking widget so visitors can interact with it.
  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else openDemo();
  };

  return (
    <>
      {/* =============================== HERO =============================== */}
      <section className="relative isolate min-h-[88vh] overflow-hidden bg-[#0B0708] text-canvas">
        {/* Real barbershop photo — eagerly loaded, above-the-fold */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
        />
        {/* 70 % dark overlay for legibility */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20"
          style={{ background: "rgba(11,7,8,0.72)" }}
        />
        {/* Warm burgundy + gold glow on top of the overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(80% 60% at 70% 20%, rgba(122,42,61,0.32) 0%, rgba(11,7,8,0) 60%), radial-gradient(60% 50% at 15% 85%, rgba(201,169,110,0.18) 0%, rgba(11,7,8,0) 60%)",
          }}
        />
        {/* Subtle film grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.65 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="mx-auto flex min-h-[88vh] w-full max-w-[1200px] flex-col px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:px-12">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[20px] font-medium leading-none tracking-tight text-canvas/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]"
          >
            {preview.businessName}
          </motion.p>

          <div className="my-auto flex flex-col items-start pt-16 sm:pt-24">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-[14ch] font-display text-[clamp(2.75rem,6vw+1rem,5.5rem)] font-medium leading-[0.98] tracking-[-0.022em] text-canvas text-balance drop-shadow-[0_2px_24px_rgba(0,0,0,0.4)]"
            >
              {preview.tagline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 max-w-[44ch] text-[16px] leading-relaxed text-canvas/75 sm:text-[17.5px]"
            >
              Professioneel knippen &amp; kleuren in {preview.location}. Op
              afspraak, ook &apos;s avonds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 inline-flex items-center gap-3 rounded-full border border-canvas/15 bg-canvas/[0.05] px-4 py-2 backdrop-blur-sm"
            >
              <StarRow size={15} />
              <span className="text-[13.5px] text-canvas/80 tabular">
                4,8 · 127 Google reviews
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.44,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                onClick={scrollToBooking}
                className="group inline-flex items-center justify-center gap-2 rounded-button bg-burgundy px-6 py-3.5 text-[14.5px] font-medium text-canvas shadow-burgundy transition-colors duration-200 hover:bg-burgundy-700 hover:shadow-burgundy-hover"
              >
                Boek een afspraak
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </button>
              <a
                href={`tel:${preview.phone.replace(/\s|-/g, "")}`}
                className="inline-flex items-center justify-center gap-2 rounded-button border border-canvas/25 bg-canvas/[0.04] px-6 py-3.5 text-[14.5px] font-medium text-canvas backdrop-blur-sm transition-colors duration-200 hover:border-canvas/45 hover:bg-canvas/[0.08]"
              >
                Bel {preview.phone}
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-12 text-[12.5px] uppercase tracking-eyebrow text-canvas/55"
            >
              {preview.hours} · {preview.address}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ============================ SERVICES ============================ */}
      <section className="bg-cream py-20 text-ink sm:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <header className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Onze behandelingen</SectionEyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,3vw+1rem,3rem)] font-medium leading-[1.05] text-ink text-balance">
              Vakwerk. Persoonlijk. Op afspraak.
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-pretty text-[15.5px] leading-relaxed text-ink/60">
              Geen haast, geen massa-productie. We nemen de tijd om jouw haar
              écht goed te doen.
            </p>
          </header>

          <ul className="mx-auto mt-12 grid max-w-[1080px] grid-cols-1 gap-5 sm:mt-16 md:grid-cols-3 md:gap-6">
            {SERVICES.map((s, i) => (
              <motion.li
                key={s.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover sm:p-8"
              >
                {/* Subtle, blurred background texture */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.bg}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.08] blur-md saturate-[0.6] transition-opacity duration-500 group-hover:opacity-[0.12]"
                />
                <span className="grid h-11 w-11 place-items-center rounded-full bg-burgundy/10 text-burgundy">
                  <s.Icon />
                </span>
                <div className="mt-6 flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-[22px] font-medium text-ink">
                    {s.name}
                  </h3>
                  <span className="inline-flex shrink-0 items-center rounded-full bg-burgundy px-3 py-1 text-[13px] font-medium text-canvas shadow-burgundy tabular">
                    €{s.price}
                  </span>
                </div>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink/60 text-pretty">
                  {s.body}
                </p>
                <div className="mt-auto pt-6">
                  <button
                    type="button"
                    onClick={scrollToBooking}
                    className="group/btn inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink transition-colors hover:text-burgundy"
                  >
                    Boek {s.name.toLowerCase()}
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
                    >
                      →
                    </span>
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ BOOKING WIDGET ============================ */}
      <section
        id="booking"
        className="relative scroll-mt-24 bg-[#0E0A0B] py-20 text-canvas sm:py-28"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.65 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative mx-auto w-full max-w-[1080px] px-5 sm:px-8 lg:px-12">
          <header className="mx-auto max-w-2xl text-center">
            <SectionEyebrow tone="canvas">Boek online</SectionEyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,3vw+1rem,3rem)] font-medium leading-[1.05] text-canvas text-balance">
              Kies een dag en tijd.
            </h2>
            <p className="mx-auto mt-5 max-w-[48ch] text-pretty text-[15.5px] leading-relaxed text-canvas/55">
              Snel, makkelijk, ook &apos;s avonds. Geen telefoontjes meer.
            </p>
          </header>

          <BookingWidget onConfirm={openDemo} />

          {/* Value-prop strip — explains what the salon owner experiences on
              their side once a customer books. Reinforces the Groei pricing copy. */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mt-5 flex max-w-[820px] items-start gap-4 rounded-2xl border border-canvas/10 bg-canvas/[0.04] px-5 py-4 backdrop-blur-sm sm:items-center sm:px-6 sm:py-5"
          >
            <span
              aria-hidden
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold-400/30 bg-gold-400/10 text-gold-400"
            >
              <CalendarIcon />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-medium text-canvas sm:text-[14.5px]">
                Klanten boeken hier — jij beheert vanaf je telefoon.
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-canvas/55 sm:text-[13.5px]">
                Elke afspraak verschijnt automatisch in je Google Calendar.{" "}
                <span className="text-canvas/80">
                  Geen aparte app om te leren, geen extra abonnement.
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================ REVIEWS ============================ */}
      <ReviewsSection openDemo={openDemo} />

      {/* ============================ CONTACT ============================ */}
      <section className="bg-paper py-20 text-ink sm:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <header className="mb-12 max-w-2xl">
            <SectionEyebrow>Vind ons</SectionEyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,3vw+1rem,3rem)] font-medium leading-[1.05] text-ink text-balance">
              Tot snel in {preview.location}.
            </h2>
          </header>

          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            <div className="rounded-2xl border border-line bg-surface p-7 sm:p-9">
              <dl className="space-y-6 text-[15px] leading-relaxed">
                <Detail
                  label="Adres"
                  value={preview.address ?? "Op afspraak"}
                />
                <Detail
                  label="Telefoon"
                  value={
                    <a
                      href={`tel:${preview.phone.replace(/\s|-/g, "")}`}
                      className="transition-colors hover:text-burgundy"
                    >
                      {preview.phone}
                    </a>
                  }
                />
                <Detail
                  label="E-mail"
                  value={
                    <a
                      href={`mailto:${preview.email}`}
                      className="transition-colors hover:text-burgundy"
                    >
                      {preview.email}
                    </a>
                  }
                />
                <Detail
                  label="Openingstijden"
                  value={preview.hours ?? "Op afspraak"}
                />
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={scrollToBooking}
                  className="inline-flex items-center justify-center gap-2 rounded-button bg-burgundy px-5 py-3 text-[14px] font-medium text-canvas shadow-burgundy transition-colors duration-200 hover:bg-burgundy-700 hover:shadow-burgundy-hover"
                >
                  Boek een afspraak
                  <span aria-hidden>→</span>
                </button>
                <button
                  type="button"
                  onClick={handleContact}
                  className="inline-flex items-center justify-center gap-2 rounded-button border border-ink/15 px-5 py-3 text-[14px] font-medium text-ink transition-colors duration-200 hover:border-ink/40 hover:bg-ink/[0.03]"
                >
                  Stuur een bericht
                </button>
              </div>
            </div>

            <MapPlaceholder location={preview.location} />
          </div>
        </div>
      </section>

      {dialog}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Reviews section (with animated counters)                                   */
/* -------------------------------------------------------------------------- */

function ReviewsSection({ openDemo }: { openDemo: () => void }) {
  const [ref, inView] = useFireOnce<HTMLDivElement>(0.25);

  return (
    <section className="bg-cream py-20 text-ink sm:py-28">
      <div
        ref={ref}
        className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12"
      >
        <header className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Wat klanten zeggen</SectionEyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,3vw+1rem,3rem)] font-medium leading-[1.05] text-ink text-balance">
            <AnimatedCounter to={4.8} decimals={1} inView={inView} /> op
            Google. Verdiend.
          </h2>
          <p className="mx-auto mt-5 inline-flex items-center gap-2 text-[14.5px] text-ink/55">
            Gemiddeld uit{" "}
            <span className="font-medium text-ink">
              <AnimatedCounter to={127} inView={inView} />
            </span>{" "}
            beoordelingen
          </p>
        </header>

        <div className="mx-auto mt-12 grid max-w-[1080px] grid-cols-1 gap-5 sm:mt-16 md:grid-cols-3 md:gap-6">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ReviewCard review={r} />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              openDemo();
            }}
            className="group inline-flex items-center gap-2 text-[13.5px] text-ink/65 underline-offset-4 transition-colors hover:text-burgundy hover:underline"
          >
            Lees alle 127 reviews op Google
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Booking widget                                                             */
/* -------------------------------------------------------------------------- */

function BookingWidget({ onConfirm }: { onConfirm: () => void }) {
  const [dayIdx, setDayIdx] = useState(0);
  const [time, setTime] = useState<string | null>(null);

  const day = DAYS[dayIdx];

  const handleDayChange = (i: number) => {
    if (i === dayIdx) return;
    setDayIdx(i);
    // Reset selection when switching days — a slot only makes sense for one day.
    setTime(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-12 max-w-[820px] overflow-hidden rounded-3xl border border-canvas/10 bg-canvas/[0.04] backdrop-blur-sm sm:mt-16"
    >
      {/* Header */}
      <div className="border-b border-canvas/8 px-5 py-5 sm:px-8 sm:py-6">
        <div className="flex items-center justify-between">
          <p className="font-display text-[18px] font-medium text-canvas">
            Beschikbare tijden
          </p>
          <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-eyebrow text-canvas/55">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-300 opacity-75" />
              <span className="relative block h-1.5 w-1.5 rounded-full bg-emerald-300" />
            </span>
            Live
          </span>
        </div>
      </div>

      {/* 7-day pill selector — horizontally scrollable on mobile */}
      <div className="border-b border-canvas/8">
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-4 sm:px-8">
          {DAYS.map((d, i) => {
            const active = i === dayIdx;
            return (
              <button
                key={d.label + i}
                type="button"
                onClick={() => handleDayChange(i)}
                aria-pressed={active}
                className={cn(
                  "group/day flex h-[52px] min-w-[64px] shrink-0 flex-col items-center justify-center rounded-xl border px-3 text-center transition-all duration-200",
                  active
                    ? "border-burgundy bg-burgundy text-canvas shadow-burgundy"
                    : "border-canvas/12 bg-canvas/[0.02] text-canvas/75 hover:border-canvas/25 hover:bg-canvas/[0.06]"
                )}
              >
                <span
                  className={cn(
                    "text-[12.5px] font-medium leading-none",
                    active ? "text-canvas" : "text-canvas/85"
                  )}
                >
                  {d.label}
                </span>
                <span
                  className={cn(
                    "mt-1 text-[10.5px] uppercase tracking-eyebrow leading-none",
                    active ? "text-canvas/75" : "text-canvas/45"
                  )}
                >
                  {d.date ?? (i === 0 ? "vandaag" : "morgen")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots — re-stagger on day change via key */}
      <div className="px-5 py-6 sm:px-8 sm:py-7">
        <motion.div
          key={dayIdx}
          className="grid grid-cols-3 gap-2 sm:grid-cols-4"
        >
          {TIMES.map((t, i) => {
            const booked = day.booked.includes(i);
            const selected = time === t;
            return (
              <motion.button
                key={t}
                type="button"
                disabled={booked}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.04,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setTime(t)}
                aria-pressed={selected}
                className={cn(
                  "relative flex h-11 items-center justify-center rounded-lg border text-[13.5px] font-medium tabular transition-all duration-200",
                  booked &&
                    "cursor-not-allowed border-canvas/8 bg-canvas/[0.02] text-canvas/25 line-through",
                  !booked &&
                    !selected &&
                    "border-canvas/12 bg-canvas/[0.04] text-canvas hover:-translate-y-0.5 hover:border-canvas/30 hover:bg-canvas/[0.08]",
                  selected &&
                    "border-gold-400 bg-gold-400/15 text-canvas ring-2 ring-gold-400/60"
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="slot-check"
                    aria-hidden
                    className="mr-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-gold-400 text-[#0E0A0B]"
                  >
                    <svg width="9" height="9" viewBox="0 0 12 12" aria-hidden>
                      <path
                        d="M2.5 6.2l2.4 2.3L9.5 3.8"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </motion.span>
                )}
                {t}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Confirm button — appears once a slot is selected */}
      <AnimatePresence initial={false}>
        {time && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-canvas/8"
          >
            <div className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
              <p className="text-[13.5px] text-canvas/70">
                <span className="font-medium text-canvas">{day.label}</span>
                {day.date && (
                  <span className="text-canvas/55"> · {day.date}</span>
                )}{" "}
                · {time} uur
              </p>
              <button
                type="button"
                onClick={onConfirm}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-button bg-burgundy px-6 text-[14.5px] font-medium text-canvas shadow-burgundy transition-colors duration-200 hover:bg-burgundy-700 hover:shadow-burgundy-hover"
              >
                Bevestig afspraak
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="border-t border-canvas/8 px-5 py-4 text-center text-[12.5px] text-canvas/45 sm:px-8">
        Bevestiging via WhatsApp · Annuleren tot 24u van tevoren
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Map placeholder                                                            */
/* -------------------------------------------------------------------------- */

function MapPlaceholder({ location }: { location: string }) {
  return (
    <div className="relative h-full min-h-[320px] overflow-hidden rounded-2xl border border-line bg-[#E8E5DF]">
      <svg
        aria-hidden
        viewBox="0 0 400 300"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="streets"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#D3CFC6"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#streets)" />
        <path
          d="M0 150 L400 130"
          stroke="#F2EFE8"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M0 150 L400 130"
          stroke="#D3CFC6"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <path
          d="M180 0 L210 300"
          stroke="#F2EFE8"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <rect
          x="240"
          y="180"
          width="120"
          height="80"
          rx="6"
          fill="#DCE4D6"
          opacity="0.7"
        />
      </svg>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
        <span className="relative flex h-12 w-12 items-center justify-center">
          <span className="absolute inset-0 motion-safe:animate-ping-slow rounded-full bg-burgundy/30" />
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            aria-hidden
            className="relative drop-shadow-[0_4px_10px_rgba(74,24,37,0.45)]"
          >
            <path
              d="M18 2c-6.6 0-12 5.4-12 12 0 8.5 11 19 11.5 19.4.3.3.8.3 1 0C19 33 30 22.5 30 14 30 7.4 24.6 2 18 2Z"
              fill="#4A1825"
            />
            <circle cx="18" cy="14" r="4.5" fill="#F7F3EE" />
          </svg>
        </span>
      </div>

      <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-surface/95 px-3 py-1.5 text-[12px] font-medium text-ink shadow-card backdrop-blur">
        <span aria-hidden className="text-burgundy">
          ●
        </span>
        Centrum {location}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Tiny pieces                                                                */
/* -------------------------------------------------------------------------- */

function Detail({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-eyebrow text-ink/45">
        {label}
      </dt>
      <dd className="mt-1.5 text-[15px] text-ink/85">{value}</dd>
    </div>
  );
}

function ScissorsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <circle
        cx="6"
        cy="6"
        r="3"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <circle
        cx="6"
        cy="18"
        r="3"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M8.5 7.5L20 19M20 5L8.5 16.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ColorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 3v9a3 3 0 1 1-3 3V3"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="6" cy="8" r="1" fill="currentColor" />
      <circle cx="18" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="6" r="1" fill="currentColor" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 3l1.7 5.1L19 9.7l-4.2 2.7L16 17.7l-4-3.1-4 3.1 1.2-5.3L5 9.7l5.3-1.6L12 3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <rect
        x="3.5"
        y="5"
        width="17"
        height="15"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M3.5 9.5H20.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 3v4M16 3v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="7" y="12" width="3" height="3" rx="0.5" fill="currentColor" />
    </svg>
  );
}
