"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useBookingDemo } from "@/components/preview/BookingDemoDialog";
import {
  ReviewCard,
  SectionEyebrow,
  StarRow,
  type Review,
} from "@/components/preview/shared";
import type { Preview } from "@/data/previews";
import { cn } from "@/lib/cn";

const MENU = [
  {
    name: "Tagliatelle al tartufo",
    description: "Verse pasta, zomertruffel, Parmigiano 24 maanden.",
    price: 24,
    img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=900&q=80&auto=format&fit=crop",
  },
  {
    name: "Bavette de bœuf",
    description: "Holsteiner bavette, sjalotjus, geroosterde wortel.",
    price: 32,
    img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=900&q=80&auto=format&fit=crop",
  },
  {
    name: "Tiramisù della casa",
    description: "Mascarpone, espresso van Giraffe, Marsala.",
    price: 11,
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=900&q=80&auto=format&fit=crop",
  },
] as const;

const REVIEWS: Review[] = [
  {
    name: "Frederik Bos",
    date: "2 weken geleden",
    text: "Eerlijke borden, attente bediening en wijn die echt past. Onze nieuwe vaste plek voor speciale avonden.",
  },
  {
    name: "Marit Hoekstra",
    date: "1 maand geleden",
    text: "De bavette was perfect bereid en de jus blijft me bij. Sfeer is warm zonder pretentie — precies goed.",
  },
  {
    name: "Joost & Eline",
    date: "3 weken geleden",
    text: "Voor onze verjaardag gereserveerd. Vanaf het eerste glas tot het dessert: alles klopte. Aanrader.",
  },
];

const RESERVATION_DAYS = [
  { day: "Vr", date: "23 mei", available: true },
  { day: "Za", date: "24 mei", available: true },
  { day: "Zo", date: "25 mei", available: true },
  { day: "Ma", date: "26 mei", available: false },
  { day: "Di", date: "27 mei", available: false },
  { day: "Wo", date: "28 mei", available: true },
  { day: "Do", date: "29 mei", available: true },
];

const RESERVATION_TIMES = [
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];

export function RestaurantTemplate({ preview }: { preview: Preview }) {
  const { trigger: openDemo, dialog } = useBookingDemo(preview.businessName);

  return (
    <>
      {/* =============================== HERO =============================== */}
      <section className="relative isolate min-h-[88vh] overflow-hidden bg-[#0B0605] text-canvas">
        {/* Warm gradient + amber glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(70% 55% at 80% 25%, rgba(177,98,46,0.32) 0%, rgba(11,6,5,0) 60%), radial-gradient(55% 50% at 12% 90%, rgba(122,42,61,0.30) 0%, rgba(11,6,5,0) 60%), linear-gradient(180deg, #0B0605 0%, #170B07 100%)",
          }}
        />
        {/* Grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.65 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="mx-auto grid min-h-[88vh] w-full max-w-[1240px] grid-cols-1 items-center gap-12 px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:px-12">
          <div className="relative z-10 flex flex-col items-start">
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-[11.5px] uppercase tracking-eyebrow text-canvas/55"
            >
              {preview.businessName} · {preview.location}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.05 }}
              className="mt-6 max-w-[14ch] font-display text-[clamp(2.75rem,6vw+1rem,5.25rem)] font-medium italic leading-[0.98] tracking-[-0.022em] text-canvas text-balance"
            >
              {preview.tagline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="mt-6 max-w-[44ch] text-[16.5px] leading-relaxed text-canvas/65 sm:text-[17.5px]"
            >
              Een keuken die zich niet haast. Open van woensdag tot zondag,
              vanaf 17:00. Reserveren wordt aangeraden.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                onClick={openDemo}
                className="group inline-flex items-center justify-center gap-2 rounded-button bg-burgundy px-6 py-3.5 text-[14.5px] font-medium text-canvas shadow-burgundy transition-colors duration-200 hover:bg-burgundy-700 hover:shadow-burgundy-hover"
              >
                Reserveer een tafel
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </button>
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 rounded-button border border-canvas/20 px-6 py-3.5 text-[14.5px] font-medium text-canvas transition-colors duration-200 hover:border-canvas/40 hover:bg-canvas/[0.05]"
              >
                Bekijk de kaart
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-canvas/55"
            >
              <span className="inline-flex items-center gap-2">
                <StarRow size={14} />
                <span className="tabular text-canvas/70">4,9 · 89 reviews</span>
              </span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-canvas/25" />
              <span>{preview.hours}</span>
            </motion.div>
          </div>

          {/* Right photo collage */}
          <div className="relative hidden h-full min-h-[440px] lg:block">
            <motion.div
              initial={{ opacity: 0, y: 24, rotate: 1.5 }}
              animate={{ opacity: 1, y: 0, rotate: 1.5 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-4 h-[60%] w-[58%] overflow-hidden rounded-[14px] border border-canvas/10 shadow-mockup"
            >
              <FoodImg
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80&auto=format&fit=crop"
                alt="Sfeerbeeld restaurant"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-4 left-0 h-[55%] w-[58%] overflow-hidden rounded-[14px] border border-canvas/10 shadow-mockup"
            >
              <FoodImg
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=80&auto=format&fit=crop"
                alt="Schaal met gerecht"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* =============================== MENU =============================== */}
      <section id="menu" className="bg-paper py-20 text-ink sm:py-28">
        <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <header className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Uit de keuken</SectionEyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,3vw+1rem,3rem)] font-medium leading-[1.05] text-ink text-balance">
              Een kleine kaart, met{" "}
              <span className="italic text-gold-500">veel zorg</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-pretty text-[15.5px] leading-relaxed text-ink/60">
              De kaart wisselt mee met het seizoen. Hieronder drie gerechten die
              nu op tafel staan.
            </p>
          </header>

          <ul className="mx-auto mt-12 grid max-w-[1180px] grid-cols-1 gap-6 sm:mt-16 md:grid-cols-3">
            {MENU.map((dish, i) => (
              <motion.li
                key={dish.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper">
                  <FoodImg src={dish.img} alt={dish.name} />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-[22px] font-medium leading-tight text-ink">
                      {dish.name}
                    </h3>
                    <span className="font-display text-[22px] font-medium text-ink tabular">
                      €{dish.price}
                    </span>
                  </div>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink/60 text-pretty">
                    {dish.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={openDemo}
              className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-ink underline-offset-4 transition-colors hover:text-burgundy hover:underline"
            >
              Bekijk de hele kaart
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================== RESERVATION ========================== */}
      <section className="relative bg-[#0B0605] py-20 text-canvas sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 40% at 50% 0%, rgba(177,98,46,0.16) 0%, rgba(11,6,5,0) 70%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-[920px] px-5 sm:px-8 lg:px-12">
          <header className="mx-auto max-w-2xl text-center">
            <SectionEyebrow tone="canvas">Reserveren</SectionEyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,3vw+1rem,3rem)] font-medium leading-[1.05] text-canvas text-balance">
              Wij verheugen ons op uw bezoek.
            </h2>
          </header>

          <ReservationWidget onConfirm={openDemo} />
        </div>
      </section>

      {/* ============================ REVIEWS ============================ */}
      <section className="bg-cream py-20 text-ink sm:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <header className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Wat gasten zeggen</SectionEyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,3vw+1rem,3rem)] font-medium leading-[1.05] text-ink text-balance">
              4,9 op Google. Eerlijk verdiend.
            </h2>
          </header>

          <div className="mx-auto mt-12 grid max-w-[1080px] grid-cols-1 gap-5 sm:mt-16 md:grid-cols-3 md:gap-6">
            {REVIEWS.map((r) => (
              <ReviewCard key={r.name} review={r} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================ CONTACT ============================ */}
      <section className="bg-paper py-20 text-ink sm:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 md:grid-cols-2 md:gap-12">
            <div>
              <SectionEyebrow>Tot in {preview.location}</SectionEyebrow>
              <h2 className="mt-5 font-display text-[clamp(2rem,3vw+1rem,2.75rem)] font-medium leading-[1.05] text-ink text-balance">
                Een tafel reserveren, of even bellen?
              </h2>
              <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-ink/60">
                Voor grotere gezelschappen, allergieën of een verzoek vooraf —
                bel ons gerust. We denken graag mee.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={openDemo}
                  className="inline-flex items-center justify-center gap-2 rounded-button bg-burgundy px-5 py-3 text-[14px] font-medium text-canvas shadow-burgundy transition-colors hover:bg-burgundy-700 hover:shadow-burgundy-hover"
                >
                  Reserveer online
                  <span aria-hidden>→</span>
                </button>
                <a
                  href={`tel:${preview.phone.replace(/\s|-/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 rounded-button border border-ink/15 px-5 py-3 text-[14px] font-medium text-ink transition-colors hover:border-ink/40 hover:bg-ink/[0.03]"
                >
                  Bel {preview.phone}
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-7 sm:p-9">
              <p className="text-[11px] uppercase tracking-eyebrow text-ink/45">
                Adres &amp; tijden
              </p>
              <p className="mt-4 text-[15px] text-ink/85">{preview.address}</p>
              <p className="mt-1 text-[15px] text-ink/85">{preview.hours}</p>
              <div className="mt-6 border-t border-line pt-6">
                <p className="text-[11px] uppercase tracking-eyebrow text-ink/45">
                  Contact
                </p>
                <p className="mt-3 text-[14.5px] text-ink/85">
                  <a
                    href={`tel:${preview.phone.replace(/\s|-/g, "")}`}
                    className="transition-colors hover:text-burgundy"
                  >
                    {preview.phone}
                  </a>
                </p>
                <p className="mt-1 text-[14.5px] text-ink/85">
                  <a
                    href={`mailto:${preview.email}`}
                    className="transition-colors hover:text-burgundy"
                  >
                    {preview.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {dialog}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Reservation widget                                                         */
/* -------------------------------------------------------------------------- */

function ReservationWidget({ onConfirm }: { onConfirm: () => void }) {
  const [day, setDay] = useState<number>(0);
  const [time, setTime] = useState<string | null>(null);
  const [guests, setGuests] = useState<number>(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-12 overflow-hidden rounded-3xl border border-canvas/8 bg-canvas/[0.03] backdrop-blur-sm sm:mt-16"
    >
      {/* Top bar — guests selector */}
      <div className="flex flex-col items-stretch gap-3 border-b border-canvas/8 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-[11.5px] uppercase tracking-eyebrow text-canvas/55">
          Aantal gasten
        </p>
        <div className="flex items-center gap-1">
          {[2, 3, 4, 5, 6, 7, 8].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGuests(g)}
              className={cn(
                "h-9 w-9 rounded-full text-[13.5px] font-medium tabular transition-colors",
                guests === g
                  ? "bg-burgundy text-canvas"
                  : "text-canvas/55 hover:bg-canvas/[0.06] hover:text-canvas"
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Days */}
      <div className="border-b border-canvas/8 px-6 py-5 sm:px-8">
        <p className="text-[11.5px] uppercase tracking-eyebrow text-canvas/55">
          Datum
        </p>
        <div className="mt-3 flex flex-nowrap gap-2 overflow-x-auto">
          {RESERVATION_DAYS.map((d, i) => (
            <button
              key={d.date}
              type="button"
              disabled={!d.available}
              onClick={() => {
                setDay(i);
                setTime(null);
              }}
              className={cn(
                "flex min-w-[64px] shrink-0 flex-col items-center rounded-xl border px-3 py-2.5 transition-all duration-200",
                !d.available
                  ? "cursor-not-allowed border-canvas/8 bg-canvas/[0.02] text-canvas/25"
                  : day === i
                    ? "border-burgundy-300 bg-burgundy/30 text-canvas"
                    : "border-canvas/10 bg-canvas/[0.03] text-canvas/75 hover:border-canvas/25 hover:bg-canvas/[0.06]"
              )}
            >
              <span className="text-[10.5px] uppercase tracking-wider opacity-70">
                {d.day}
              </span>
              <span className="mt-1 text-[13.5px] font-medium tabular">
                {d.date}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Times */}
      <div className="px-6 py-6 sm:px-8 sm:py-7">
        <p className="text-[11.5px] uppercase tracking-eyebrow text-canvas/55">
          Tijd
        </p>
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-4 md:grid-cols-8">
          {RESERVATION_TIMES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTime(t)}
              className={cn(
                "h-11 rounded-lg border text-[13px] font-medium tabular transition-colors",
                time === t
                  ? "border-burgundy-300 bg-burgundy/40 text-canvas"
                  : "border-canvas/12 bg-canvas/[0.04] text-canvas/75 hover:border-canvas/25 hover:bg-canvas/[0.07] hover:text-canvas"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onConfirm}
          className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-button bg-burgundy px-6 py-3.5 text-[14.5px] font-medium text-canvas shadow-burgundy transition-colors hover:bg-burgundy-700 hover:shadow-burgundy-hover sm:w-auto"
        >
          {time
            ? `Bevestig: ${guests}× om ${time}`
            : "Kies een tijd"}
          <span aria-hidden>→</span>
        </button>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* FoodImg — Unsplash with graceful fallback to a warm gradient                */
/* -------------------------------------------------------------------------- */

function FoodImg({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-label={alt}
        role="img"
        className="h-full w-full"
        style={{
          background:
            "linear-gradient(135deg, #2A0D15 0%, #4A1825 45%, #6B3923 100%)",
        }}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
    />
  );
}
