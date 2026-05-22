"use client";

import { motion } from "framer-motion";
import { useContactModal } from "@/components/ContactModalProvider";
import { useBookingDemo } from "@/components/preview/BookingDemoDialog";
import {
  ReviewCard,
  SectionEyebrow,
  StarRow,
  type Review,
} from "@/components/preview/shared";
import type { Preview } from "@/data/previews";
import { cn } from "@/lib/cn";

const SERVICES = [
  {
    name: "Knippen",
    price: 25,
    body: "Wassen, knippen en drogen — afgestemd op jouw gezicht en wens.",
    Icon: ScissorsIcon,
  },
  {
    name: "Kleuren",
    price: 45,
    body: "Volledige kleur of highlights. Hoogwaardige producten, fijn resultaat.",
    Icon: ColorIcon,
  },
  {
    name: "Stylen",
    price: 35,
    body: "Voor bruiloften, fotoshoots of gewoon een avond die telt.",
    Icon: SparkleIcon,
  },
] as const;

const REVIEWS: Review[] = [
  {
    name: "Anouk de Vries",
    date: "3 weken geleden",
    text: "Yara luistert écht. Mijn nieuwe kleur zit nog steeds perfect na twee maanden — eindelijk een kapper die het begrijpt.",
  },
  {
    name: "Mark Janssen",
    date: "2 maanden geleden",
    text: "Snel, vriendelijk, en geen onnodig gepraat. Precies wat ik zocht. Kom hier nu al een jaar — altijd top.",
  },
  {
    name: "Lisa van der Berg",
    date: "1 maand geleden",
    text: "De ruimte is rustig en warm, en je voelt je meteen op je gemak. Zonde dat ik niet eerder hier kwam.",
  },
];

const TODAY_SLOTS = [
  { time: "10:00", booked: true },
  { time: "10:30", booked: false },
  { time: "11:00", booked: false },
  { time: "11:30", booked: true },
  { time: "13:00", booked: false },
  { time: "13:30", booked: false },
  { time: "14:00", booked: true },
  { time: "14:30", booked: false },
  { time: "15:00", booked: false },
  { time: "15:30", booked: false },
  { time: "16:00", booked: false },
  { time: "16:30", booked: true },
] as const;

const TOMORROW_SLOTS = [
  { time: "09:00", booked: false },
  { time: "09:30", booked: false },
  { time: "10:00", booked: true },
  { time: "10:30", booked: false },
  { time: "11:00", booked: false },
  { time: "11:30", booked: false },
  { time: "13:00", booked: true },
  { time: "13:30", booked: false },
  { time: "14:00", booked: false },
  { time: "14:30", booked: true },
  { time: "15:00", booked: false },
  { time: "15:30", booked: false },
] as const;

export function KapperTemplate({ preview }: { preview: Preview }) {
  const { trigger: openDemo, dialog } = useBookingDemo(preview.businessName);
  const { open: openContact } = useContactModal();

  const handleContact = () =>
    openContact({ prefill: { bedrijfsnaam: preview.businessName } });

  return (
    <>
      {/* =============================== HERO =============================== */}
      <section className="relative isolate min-h-[88vh] overflow-hidden bg-[#0B0708] text-canvas">
        {/* Warm dark background composition */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(80% 60% at 70% 20%, rgba(122,42,61,0.35) 0%, rgba(11,7,8,0) 60%), radial-gradient(60% 50% at 15% 85%, rgba(201,169,110,0.18) 0%, rgba(11,7,8,0) 60%), linear-gradient(180deg, #0B0708 0%, #14090C 100%)",
          }}
        />
        {/* Subtle grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] mix-blend-overlay"
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
            className="font-display text-[20px] font-medium leading-none tracking-tight text-canvas/85"
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
              className="max-w-[14ch] font-display text-[clamp(2.75rem,6vw+1rem,5.5rem)] font-medium leading-[0.98] tracking-[-0.022em] text-canvas text-balance"
            >
              {preview.tagline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 max-w-[44ch] text-[16px] leading-relaxed text-canvas/65 sm:text-[17.5px]"
            >
              Professioneel knippen &amp; kleuren in {preview.location}. Op
              afspraak, ook &apos;s avonds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 inline-flex items-center gap-3 rounded-full border border-canvas/10 bg-canvas/[0.04] px-4 py-2"
            >
              <StarRow size={15} />
              <span className="text-[13.5px] text-canvas/75 tabular">
                4,8 · 127 Google reviews
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                onClick={openDemo}
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
                className="inline-flex items-center justify-center gap-2 rounded-button border border-canvas/20 px-6 py-3.5 text-[14.5px] font-medium text-canvas transition-colors duration-200 hover:border-canvas/40 hover:bg-canvas/[0.05]"
              >
                Bel {preview.phone}
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.8 }}
              className="mt-12 text-[12.5px] uppercase tracking-eyebrow text-canvas/40"
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
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover sm:p-8"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-burgundy/10 text-burgundy">
                  <s.Icon />
                </span>
                <div className="mt-6 flex items-baseline justify-between">
                  <h3 className="font-display text-[22px] font-medium text-ink">
                    {s.name}
                  </h3>
                  <span className="font-display text-[22px] font-medium text-ink tabular">
                    €{s.price}
                  </span>
                </div>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink/60 text-pretty">
                  {s.body}
                </p>
                <div className="mt-auto pt-6">
                  <button
                    type="button"
                    onClick={openDemo}
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
      <section className="relative bg-[#0E0A0B] py-20 text-canvas sm:py-28">
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
              Vandaag of morgen — kies een tijd.
            </h2>
            <p className="mx-auto mt-5 max-w-[48ch] text-pretty text-[15.5px] leading-relaxed text-canvas/55">
              Snel, makkelijk, ook &apos;s avonds. Geen telefoontjes meer.
            </p>
          </header>

          <BookingWidget
            onSlotClick={openDemo}
            todaySlots={[...TODAY_SLOTS]}
            tomorrowSlots={[...TOMORROW_SLOTS]}
          />
        </div>
      </section>

      {/* ============================ REVIEWS ============================ */}
      <section className="bg-cream py-20 text-ink sm:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <header className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Wat klanten zeggen</SectionEyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,3vw+1rem,3rem)] font-medium leading-[1.05] text-ink text-balance">
              4,8 op Google. Verdiend.
            </h2>
          </header>

          <div className="mx-auto mt-12 grid max-w-[1080px] grid-cols-1 gap-5 sm:mt-16 md:grid-cols-3 md:gap-6">
            {REVIEWS.map((r) => (
              <ReviewCard key={r.name} review={r} />
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
                  onClick={openDemo}
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
/* Booking widget                                                             */
/* -------------------------------------------------------------------------- */

type Slot = { time: string; booked: boolean };

function BookingWidget({
  todaySlots,
  tomorrowSlots,
  onSlotClick,
}: {
  todaySlots: Slot[];
  tomorrowSlots: Slot[];
  onSlotClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-12 max-w-[820px] overflow-hidden rounded-3xl border border-canvas/8 bg-canvas/[0.03] backdrop-blur-sm sm:mt-16"
    >
      <div className="border-b border-canvas/8 px-6 py-5 sm:px-8 sm:py-6">
        <div className="flex items-center justify-between">
          <p className="font-display text-[18px] font-medium text-canvas">
            Beschikbare tijden
          </p>
          <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-eyebrow text-canvas/45">
            <span className="block h-1.5 w-1.5 rounded-full bg-emerald-300" />
            Live
          </span>
        </div>
      </div>

      <div className="grid gap-0 sm:grid-cols-2 sm:divide-x sm:divide-canvas/8">
        <DayColumn label="Vandaag" slots={todaySlots} onSlotClick={onSlotClick} />
        <DayColumn label="Morgen" slots={tomorrowSlots} onSlotClick={onSlotClick} />
      </div>

      <div className="border-t border-canvas/8 px-6 py-4 text-center text-[12.5px] text-canvas/45 sm:px-8">
        Bevestiging via WhatsApp · Annuleren tot 24u van tevoren
      </div>
    </motion.div>
  );
}

function DayColumn({
  label,
  slots,
  onSlotClick,
}: {
  label: string;
  slots: Slot[];
  onSlotClick: () => void;
}) {
  return (
    <div className="px-6 py-6 sm:px-8 sm:py-7">
      <p className="text-[11.5px] uppercase tracking-eyebrow text-canvas/45">
        {label}
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-3">
        {slots.map((s) => (
          <button
            key={`${label}-${s.time}`}
            type="button"
            disabled={s.booked}
            onClick={onSlotClick}
            className={cn(
              "h-11 rounded-lg border text-[13.5px] font-medium tabular transition-all duration-200",
              s.booked
                ? "cursor-not-allowed border-canvas/8 bg-canvas/[0.02] text-canvas/25 line-through"
                : "border-canvas/12 bg-canvas/[0.04] text-canvas hover:-translate-y-0.5 hover:border-burgundy-300 hover:bg-burgundy/40"
            )}
          >
            {s.time}
          </button>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Map placeholder                                                            */
/* -------------------------------------------------------------------------- */

function MapPlaceholder({ location }: { location: string }) {
  return (
    <div className="relative h-full min-h-[320px] overflow-hidden rounded-2xl border border-line bg-[#E8E5DF]">
      {/* Faux street grid */}
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
        {/* Faux roads */}
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
        {/* A "park" */}
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

      {/* Pin */}
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
      <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M8.5 7.5L20 19M20 5L8.5 16.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
