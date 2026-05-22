"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useContactModal } from "@/components/ContactModalProvider";

/**
 * "Dit is een demo" interrupter that appears when a visitor taps one of the
 * fake booking slots. Confirms the page is a Lumeq mock-up and hands them
 * over to the real contact form (pre-filled with the business name).
 */
export function BookingDemoDialog({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  // Close on ESC for keyboard users.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="demo-dialog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          role="dialog"
          aria-modal="true"
          onClick={onClose}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/55 px-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[460px] overflow-hidden rounded-2xl bg-cream p-7 shadow-[0_30px_80px_-32px_rgba(24,24,27,0.5)] sm:p-9"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Sluiten"
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-ink/55 transition-colors hover:bg-ink/[0.06] hover:text-ink"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden>
                <path
                  d="M3 3l8 8M11 3l-8 8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <span className="inline-flex items-center gap-2 rounded-full border border-burgundy/30 bg-burgundy/8 px-2.5 py-0.5 text-[10.5px] uppercase tracking-eyebrow text-burgundy">
              <span aria-hidden className="block h-1 w-1 rounded-full bg-burgundy" />
              Demo
            </span>

            <h3 className="mt-4 font-display text-[24px] font-medium leading-tight text-ink text-balance sm:text-[26px]">
              Dit is een demo.
            </h3>
            <p className="mt-3 max-w-[44ch] text-[14.5px] leading-relaxed text-ink/65">
              Wil je echt online boeken voor jouw zaak?{" "}
              <span className="text-ink">Lumeq regelt dit voor jou.</span>
            </p>

            <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 items-center justify-center rounded-button px-4 text-[14px] text-ink/65 transition-colors hover:text-ink"
              >
                Verder kijken
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-button bg-burgundy px-5 text-[14px] font-medium text-canvas shadow-burgundy transition-colors duration-200 hover:bg-burgundy-700 hover:shadow-burgundy-hover"
              >
                Neem contact op
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Convenience hook that wires the demo dialog into a template.
 * Returns a `trigger` function (call it from any "Boek nu" / time-slot
 * button) and the JSX to render once at the bottom of the template.
 */
export function useBookingDemo(businessName: string) {
  const [isOpen, setIsOpen] = useState(false);
  const { open: openContact } = useContactModal();

  const trigger = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const confirm = useCallback(() => {
    setIsOpen(false);
    openContact({ prefill: { bedrijfsnaam: businessName } });
  }, [businessName, openContact]);

  const dialog = (
    <BookingDemoDialog isOpen={isOpen} onClose={close} onConfirm={confirm} />
  );

  return { trigger, dialog };
}
