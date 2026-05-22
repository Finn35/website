"use client";

import { useContactModal } from "@/components/ContactModalProvider";

/**
 * Sticky top banner that lives above every preview template.
 * Makes it instantly obvious this is a demo built by Lumeq, and offers a
 * single, very direct CTA into the contact modal.
 */
export function PreviewBanner({ businessName }: { businessName: string }) {
  const { open: openContact } = useContactModal();

  const handleContact = () =>
    openContact({ prefill: { bedrijfsnaam: businessName } });

  return (
    <div className="sticky top-0 z-50 w-full bg-burgundy text-canvas">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-stretch gap-2 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-0">
        <p className="flex min-h-[24px] items-center justify-center gap-2 text-center text-[13px] leading-snug text-canvas/95 sm:min-h-[48px] sm:justify-start sm:text-left sm:text-[13.5px]">
          <span aria-hidden className="text-gold-400">
            ✦
          </span>
          <span>
            Dit is een gratis voorbeeldwebsite voor{" "}
            <span className="font-medium text-canvas">{businessName}</span>
          </span>
        </p>

        <button
          type="button"
          onClick={handleContact}
          className="group inline-flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-button bg-gold-400 px-4 text-[13px] font-medium text-ink transition-colors duration-200 hover:bg-gold-300 sm:my-1.5 sm:w-auto sm:px-5 sm:text-[13.5px]"
        >
          Bevalt het? Neem contact op
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            →
          </span>
        </button>
      </div>
    </div>
  );
}
