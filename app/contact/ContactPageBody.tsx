"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { useT } from "@/components/LanguageProvider";
import { parsePakket } from "@/lib/leads";

export function ContactPageBody() {
  const params = useSearchParams();
  const pakket = parsePakket(params.get("pakket"));
  const t = useT().contact;

  return (
    <main className="min-h-screen bg-cream pb-24 pt-28 sm:pt-32">
      <div className="mx-auto w-full max-w-[640px] px-4 sm:px-8">
        <header className="mb-8 text-center sm:mb-10">
          <h1 className="font-display text-display-lg font-medium leading-[1.06] text-ink text-balance">
            {t.title}
          </h1>
          <p className="mx-auto mt-4 max-w-[52ch] text-pretty text-[15.5px] leading-relaxed text-ink/60">
            {t.subtitle}
          </p>
        </header>

        <div className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-10">
          <ContactForm initialPakket={pakket} source="page" />
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-[13.5px] text-ink/55 transition-colors hover:text-ink"
          >
            {t.backToHome}
          </Link>
        </div>
      </div>
    </main>
  );
}
