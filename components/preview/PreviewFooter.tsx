"use client";

import { useContactModal } from "@/components/ContactModalProvider";
import type { Preview } from "@/data/previews";

/**
 * Subtle footer that closes every preview template. Carries the business's
 * own contact info plus a quiet "Gemaakt door Lumeq.eu" credit that doubles
 * as a CTA back to the contact modal.
 */
export function PreviewFooter({ preview }: { preview: Preview }) {
  const { open: openContact } = useContactModal();

  return (
    <footer className="border-t border-line bg-canvas text-ink">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display text-[24px] font-medium leading-none text-ink">
              {preview.businessName}
            </p>
            <p className="mt-3 max-w-[36ch] text-[14px] leading-relaxed text-ink/55">
              {preview.tagline}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-eyebrow text-ink/45">
              Contact
            </p>
            <ul className="mt-3 space-y-1.5 text-[13.5px] text-ink/70">
              {preview.address && <li>{preview.address}</li>}
              <li>
                <a
                  href={`tel:${preview.phone.replace(/\s|-/g, "")}`}
                  className="transition-colors hover:text-ink"
                >
                  {preview.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${preview.email}`}
                  className="transition-colors hover:text-ink"
                >
                  {preview.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-eyebrow text-ink/45">
              Openingstijden
            </p>
            <p className="mt-3 text-[13.5px] text-ink/70">
              {preview.hours ?? "Op afspraak"}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-[12px] text-ink/40 sm:flex-row sm:items-center">
          <p>© 2026 {preview.businessName}</p>
          <button
            type="button"
            onClick={() =>
              openContact({
                prefill: { bedrijfsnaam: preview.businessName },
              })
            }
            className="text-[12px] tracking-tight text-ink/45 underline-offset-4 transition-colors hover:text-burgundy hover:underline"
          >
            Gemaakt door Lumeq.eu
          </button>
        </div>
      </div>
    </footer>
  );
}
