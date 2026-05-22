"use client";

import { motion } from "framer-motion";
import { Reveal, staggerChild, staggerParent } from "@/components/ui/Reveal";
import { useT } from "@/components/LanguageProvider";

export function Features() {
  const { features } = useT();

  return (
    <section
      id="features"
      className="relative bg-paper py-20 text-ink sm:py-28"
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow text-ink/55">{features.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-display-lg font-medium leading-[1.04] text-ink text-balance">
              {features.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-[52ch] text-pretty text-[16px] leading-relaxed text-ink/60">
              {features.subhead}
            </p>
          </Reveal>
        </div>

        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-14 grid max-w-[1100px] grid-cols-1 gap-5 sm:mt-16 md:grid-cols-3 md:gap-6"
        >
          {features.items.map((item, i) => (
            <motion.li
              key={item.title}
              variants={staggerChild}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover"
            >
              {/* Mini illustrated visual */}
              <div className="mb-7">
                {i === 0 && <DesignMini />}
                {i === 1 && <BookingMini />}
                {i === 2 && <CareMini />}
              </div>

              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-[24px] font-medium leading-tight text-ink">
                  {item.title}
                </h3>
                <span className="rounded-full border border-line bg-paper px-2.5 py-0.5 text-[10.5px] uppercase tracking-eyebrow text-ink/50">
                  {item.tag}
                </span>
              </div>

              <p className="mt-3 text-[14.5px] leading-relaxed text-ink/60 text-pretty">
                {item.body}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Mini illustrations                                                          */
/* -------------------------------------------------------------------------- */

function DesignMini() {
  return (
    <div className="relative h-[140px] overflow-hidden rounded-xl border border-line bg-canvas">
      <div className="flex items-center gap-1.5 border-b border-line/80 px-3 py-2">
        <span className="block h-1.5 w-1.5 rounded-full bg-ink/15" />
        <span className="block h-1.5 w-1.5 rounded-full bg-ink/15" />
        <span className="block h-1.5 w-1.5 rounded-full bg-ink/15" />
      </div>
      <div className="grid grid-cols-5 gap-2 p-3">
        <div className="col-span-2 space-y-1.5">
          <div className="h-2 w-3/4 rounded bg-ink/10" />
          <div className="h-2 w-1/2 rounded bg-ink/10" />
          <div className="mt-3 h-6 w-full rounded bg-burgundy/15" />
        </div>
        <div className="col-span-3 rounded-md bg-gradient-to-br from-burgundy-50 to-paper p-2">
          <div className="h-2 w-2/3 rounded bg-ink/15" />
          <div className="mt-2 h-2 w-1/2 rounded bg-ink/10" />
          <div className="mt-4 inline-flex h-5 items-center rounded-button bg-burgundy px-2.5 text-[9px] font-medium text-canvas">
            Boek
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingMini() {
  const days = ["Ma", "Di", "Wo", "Do", "Vr", "Za"];
  return (
    <div className="relative h-[140px] overflow-hidden rounded-xl border border-line bg-canvas p-4">
      <div className="flex items-center justify-between">
        <span className="text-[10.5px] uppercase tracking-eyebrow text-ink/45">
          Mei 2026
        </span>
        <div className="flex gap-1">
          <Arrow direction="left" />
          <Arrow direction="right" />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-6 gap-1.5">
        {days.map((d, i) => {
          const isSelected = i === 3;
          return (
            <div
              key={d}
              className={`flex flex-col items-center rounded-lg py-1.5 transition-colors ${
                isSelected ? "bg-burgundy text-canvas" : "bg-paper text-ink/65"
              }`}
            >
              <span className="text-[9px] uppercase tracking-wider opacity-70">
                {d}
              </span>
              <span className="mt-0.5 text-[12px] font-medium tabular">
                {12 + i}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["10:00", "11:30", "14:00", "16:30"].map((t, i) => (
          <span
            key={t}
            className={`rounded-full px-2 py-0.5 text-[10px] tabular ${
              i === 2
                ? "bg-burgundy text-canvas"
                : "border border-line bg-surface text-ink/65"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function CareMini() {
  return (
    <div className="relative h-[140px] overflow-hidden rounded-xl border border-line bg-canvas p-4">
      <div className="space-y-2.5">
        <UpdateRow status="done" text="Tekst homepage bijgewerkt" time="2u" />
        <UpdateRow status="done" text="SSL-certificaat vernieuwd" time="1d" />
        <UpdateRow status="active" text="Reviews-flow geactiveerd" time="nu" />
      </div>
    </div>
  );
}

function UpdateRow({
  status,
  text,
  time,
}: {
  status: "done" | "active";
  text: string;
  time: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-paper/60 px-2.5 py-1.5">
      <div className="flex items-center gap-2">
        <span
          className={`grid h-4 w-4 place-items-center rounded-full ${
            status === "active"
              ? "bg-burgundy text-canvas"
              : "bg-burgundy/15 text-burgundy"
          }`}
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
        <span className="text-[11.5px] text-ink/75">{text}</span>
      </div>
      <span className="text-[10px] tabular text-ink/40">{time}</span>
    </div>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <span className="grid h-4 w-4 place-items-center rounded-full bg-paper text-ink/50">
      <svg width="8" height="8" viewBox="0 0 12 12" aria-hidden>
        {direction === "left" ? (
          <path
            d="M7.5 3l-3 3 3 3"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ) : (
          <path
            d="M4.5 3l3 3-3 3"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        )}
      </svg>
    </span>
  );
}
