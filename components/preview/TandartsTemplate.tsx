"use client";

import { motion } from "framer-motion";
import { useBookingDemo } from "@/components/preview/BookingDemoDialog";
import {
  ReviewCard,
  SectionEyebrow,
  StarRow,
  type Review,
} from "@/components/preview/shared";
import type { Preview } from "@/data/previews";
import { cn } from "@/lib/cn";

const TREATMENTS = [
  {
    name: "Halfjaarlijkse controle",
    body: "Routine check-up inclusief röntgenfoto's wanneer nodig.",
    duration: "20 min",
    Icon: CheckBadgeIcon,
  },
  {
    name: "Professionele reiniging",
    body: "Mondhygiënist verwijdert tandsteen en aanslag — voor frisse adem.",
    duration: "40 min",
    Icon: SparkleIcon,
  },
  {
    name: "Vullingen",
    body: "Tand- en kiezenherstel met witte composietvullingen.",
    duration: "30 min",
    Icon: ShieldIcon,
  },
  {
    name: "Esthetisch bleken",
    body: "Veilige in-praktijk bleekbehandeling onder professionele begeleiding.",
    duration: "60 min",
    Icon: SmileIcon,
  },
] as const;

const TEAM = [
  {
    name: "Dr. Henk Bakker",
    role: "Tandarts · BIG-geregistreerd",
    bio: "23 jaar ervaring. Gespecialiseerd in cosmetische tandheelkunde.",
    initials: "HB",
    accent: "from-burgundy-100 to-burgundy-200",
  },
  {
    name: "Sanne de Wit",
    role: "Mondhygiënist",
    bio: "Rust en geduld — speciaal voor wie het spannend vindt.",
    initials: "SW",
    accent: "from-paper to-gold-100",
  },
] as const;

const REVIEWS: Review[] = [
  {
    name: "Marieke van Dijk",
    date: "1 maand geleden",
    text: "Nooit gedacht dat ik dit zou zeggen over een tandartsbezoek: ontspannen. Het team neemt écht de tijd om uit te leggen.",
  },
  {
    name: "Tom Bakker",
    date: "2 weken geleden",
    text: "Mijn dochter van 7 was bang en kwam lachend naar buiten. Dat zegt alles.",
  },
  {
    name: "Yvonne Smit",
    date: "3 weken geleden",
    text: "Helder uitgelegd, eerlijk over kosten, en het werk zelf is netjes. Precies wat je wilt van je tandarts.",
  },
];

const SLOTS = [
  { date: "Ma 26 mei", time: "08:30", available: true },
  { date: "Ma 26 mei", time: "10:00", available: false },
  { date: "Di 27 mei", time: "09:00", available: true },
  { date: "Di 27 mei", time: "14:30", available: true },
  { date: "Wo 28 mei", time: "11:00", available: false },
  { date: "Wo 28 mei", time: "15:30", available: true },
  { date: "Do 29 mei", time: "08:30", available: true },
  { date: "Do 29 mei", time: "13:00", available: true },
];

export function TandartsTemplate({ preview }: { preview: Preview }) {
  const { trigger: openDemo, dialog } = useBookingDemo(preview.businessName);

  return (
    <>
      {/* =============================== HERO =============================== */}
      <section className="relative isolate overflow-hidden bg-canvas text-ink">
        {/* Soft cream + blue-grey wash for clinical calm */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 75% 20%, rgba(74,24,37,0.06) 0%, rgba(250,250,249,0) 60%), radial-gradient(50% 45% at 12% 85%, rgba(201,169,110,0.10) 0%, rgba(250,250,249,0) 60%), linear-gradient(180deg, #FCFBF8 0%, #F7F3EE 100%)",
          }}
        />

        <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-12 px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-12">
          <div className="relative z-10">
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 rounded-full border border-burgundy/20 bg-burgundy/5 px-3 py-1 text-[11.5px] uppercase tracking-eyebrow text-burgundy"
            >
              <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-burgundy" />
              Erkend door KNMT
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.05 }}
              className="mt-6 max-w-[18ch] font-display text-[clamp(2.5rem,5vw+1rem,4.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-ink text-balance"
            >
              {preview.tagline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="mt-6 max-w-[48ch] text-[16px] leading-relaxed text-ink/60 sm:text-[17px]"
            >
              Een rustige praktijk in {preview.location}. Heldere uitleg, eerlijke
              kosten, en een team dat de tijd neemt — ook voor kinderen en wie
              het spannend vindt.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                onClick={openDemo}
                className="group inline-flex items-center justify-center gap-2 rounded-button bg-burgundy px-6 py-3.5 text-[14.5px] font-medium text-canvas shadow-burgundy transition-colors duration-200 hover:bg-burgundy-700 hover:shadow-burgundy-hover"
              >
                Maak een afspraak
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </button>
              <a
                href={`tel:${preview.phone.replace(/\s|-/g, "")}`}
                className="inline-flex items-center justify-center gap-2 rounded-button border border-ink/15 px-6 py-3.5 text-[14.5px] font-medium text-ink transition-colors duration-200 hover:border-ink/40 hover:bg-ink/[0.03]"
              >
                Bel {preview.phone}
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-ink/55"
            >
              <li className="inline-flex items-center gap-2">
                <TrustCheck />
                Nieuwe patiënten welkom
              </li>
              <li className="inline-flex items-center gap-2">
                <TrustCheck />
                Vergoeding via uw verzekering
              </li>
              <li className="inline-flex items-center gap-2">
                <TrustCheck />
                Eigen parkeerplaats
              </li>
            </motion.ul>
          </div>

          {/* Decorative clinical visual — abstract calm composition */}
          <div className="relative hidden h-full min-h-[420px] lg:block">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-6 w-[78%] overflow-hidden rounded-3xl border border-line bg-surface p-7 shadow-mockup"
            >
              <p className="text-[10.5px] uppercase tracking-eyebrow text-ink/45">
                Volgende afspraak
              </p>
              <p className="mt-3 font-display text-[28px] font-medium leading-tight text-ink">
                Marieke van Dijk
              </p>
              <p className="mt-1 text-[14px] text-ink/60">
                Controle · Di 27 mei · 09:30
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {["08:30", "09:00", "09:30"].map((t, i) => (
                  <div
                    key={t}
                    className={cn(
                      "rounded-lg border px-2 py-2 text-center text-[12.5px] font-medium tabular",
                      i === 2
                        ? "border-burgundy bg-burgundy text-canvas"
                        : "border-line bg-paper text-ink/55"
                    )}
                  >
                    {t}
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-burgundy/12 text-[11px] font-medium text-burgundy">
                  HB
                </span>
                <span className="text-[13px] text-ink/65">
                  Dr. Henk Bakker
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 left-2 w-[58%] overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-card"
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-eyebrow text-ink/45">
                <span className="block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Vandaag open
              </div>
              <p className="mt-3 font-display text-[20px] font-medium text-ink">
                4 vrije plekken deze week
              </p>
              <p className="mt-1 text-[13px] text-ink/55">
                Snel boeken voorkomt wachten.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================== TREATMENTS ========================== */}
      <section className="bg-surface py-20 text-ink sm:py-28">
        <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <header className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Behandelingen</SectionEyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,3vw+1rem,3rem)] font-medium leading-[1.05] text-ink text-balance">
              Alles wat u nodig heeft, onder één dak.
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-pretty text-[15.5px] leading-relaxed text-ink/60">
              Van halfjaarlijkse controle tot esthetische behandelingen — geen
              doorverwijzingen, geen omwegen.
            </p>
          </header>

          <ul className="mx-auto mt-12 grid max-w-[1100px] grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {TREATMENTS.map((tr, i) => (
              <motion.li
                key={tr.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex h-full flex-col rounded-2xl border border-line bg-cream p-6 transition-all duration-500 hover:-translate-y-1 hover:border-burgundy/20 hover:shadow-card-hover sm:p-7"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-burgundy/10 text-burgundy">
                  <tr.Icon />
                </span>
                <h3 className="mt-5 font-display text-[19px] font-medium leading-tight text-ink">
                  {tr.name}
                </h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink/60 text-pretty">
                  {tr.body}
                </p>
                <p className="mt-5 text-[11.5px] uppercase tracking-eyebrow text-ink/40">
                  Duur · {tr.duration}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================== TEAM ============================== */}
      <section className="bg-cream py-20 text-ink sm:py-28">
        <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <header className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Het team</SectionEyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,3vw+1rem,3rem)] font-medium leading-[1.05] text-ink text-balance">
              Vertrouwde gezichten, jaar in jaar uit.
            </h2>
          </header>

          <div className="mx-auto mt-12 grid max-w-[920px] grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2">
            {TEAM.map((m, i) => (
              <motion.article
                key={m.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-card"
              >
                <div
                  className={cn(
                    "relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br",
                    m.accent
                  )}
                >
                  <span className="font-display text-[72px] font-medium leading-none text-ink/55">
                    {m.initials}
                  </span>
                </div>
                <div className="flex-1 p-7 sm:p-8">
                  <p className="text-[11px] uppercase tracking-eyebrow text-ink/45">
                    {m.role}
                  </p>
                  <h3 className="mt-2 font-display text-[24px] font-medium leading-tight text-ink">
                    {m.name}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink/60 text-pretty">
                    {m.bio}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ BOOKING ============================ */}
      <section className="bg-surface py-20 text-ink sm:py-28">
        <div className="mx-auto w-full max-w-[960px] px-5 sm:px-8 lg:px-12">
          <header className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Maak een afspraak</SectionEyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,3vw+1rem,3rem)] font-medium leading-[1.05] text-ink text-balance">
              Een tijd kiezen, klaar.
            </h2>
            <p className="mx-auto mt-5 max-w-[48ch] text-pretty text-[15.5px] leading-relaxed text-ink/60">
              Geen bellen tijdens werkuren, geen wachtmuziek. Boek wanneer het
              u uitkomt.
            </p>
          </header>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 overflow-hidden rounded-3xl border border-line bg-cream sm:mt-16"
          >
            <div className="border-b border-line px-6 py-5 sm:px-8 sm:py-6">
              <div className="flex items-center justify-between">
                <p className="text-[11.5px] uppercase tracking-eyebrow text-ink/55">
                  Beschikbare momenten
                </p>
                <span className="inline-flex items-center gap-2 text-[12px] text-ink/55">
                  <span className="block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Vandaag
                </span>
              </div>
            </div>
            <ul className="divide-y divide-line">
              {SLOTS.map((s) => (
                <li
                  key={`${s.date}-${s.time}`}
                  className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 sm:px-8"
                >
                  <div>
                    <p className="text-[14.5px] font-medium text-ink">
                      {s.date}
                    </p>
                    <p className="mt-0.5 text-[13px] text-ink/55 tabular">
                      {s.time} · 20 minuten
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={!s.available}
                    onClick={openDemo}
                    className={cn(
                      "inline-flex h-10 items-center gap-2 rounded-button px-4 text-[13.5px] font-medium transition-colors",
                      s.available
                        ? "bg-burgundy text-canvas shadow-burgundy hover:bg-burgundy-700 hover:shadow-burgundy-hover"
                        : "cursor-not-allowed bg-paper text-ink/35"
                    )}
                  >
                    {s.available ? "Kies dit moment" : "Volgeboekt"}
                    {s.available && <span aria-hidden>→</span>}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ============================ REVIEWS ============================ */}
      <section className="bg-cream py-20 text-ink sm:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <header className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Wat patiënten zeggen</SectionEyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,3vw+1rem,3rem)] font-medium leading-[1.05] text-ink text-balance">
              4,9 op Zorgkaart Nederland.
            </h2>
            <div className="mt-5 flex items-center justify-center gap-3">
              <StarRow size={18} />
              <span className="text-[14px] text-ink/55 tabular">
                52 beoordelingen
              </span>
            </div>
          </header>

          <div className="mx-auto mt-12 grid max-w-[1080px] grid-cols-1 gap-5 sm:mt-16 md:grid-cols-3 md:gap-6">
            {REVIEWS.map((r) => (
              <ReviewCard key={r.name} review={r} />
            ))}
          </div>
        </div>
      </section>

      {dialog}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

function TrustCheck() {
  return (
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
  );
}

function CheckBadgeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 2l8.5 4v6c0 5-3.5 9.3-8.5 10C7 21.3 3.5 17 3.5 12V6L12 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M8 12l3 3 5-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
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

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 3l8 3v6c0 5-3.5 9-8 9-4.5 0-8-4-8-9V6l8-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

function SmileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M8 14c1.2 1.5 2.5 2.2 4 2.2s2.8-.7 4-2.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
    </svg>
  );
}
