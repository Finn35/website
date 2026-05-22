"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ContactForm } from "@/components/ContactForm";
import { useT } from "@/components/LanguageProvider";
import type { Pakket } from "@/lib/leads";

export type ContactPrefill = {
  bedrijfsnaam?: string;
  naam?: string;
  email?: string;
};

export type OpenContactOptions = {
  pakket?: Pakket;
  prefill?: ContactPrefill;
};

type ContactModalContextValue = {
  /**
   * Open the contact modal. Accepts either a shorthand `Pakket` string
   * (preserves the old API) or an options object with optional `pakket`
   * and `prefill` fields.
   */
  open: (arg?: Pakket | OpenContactOptions) => void;
  close: () => void;
  isOpen: boolean;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(
  null
);

/**
 * Wrap the app so any descendant component can call `useContactModal().open()`.
 * The modal itself lives here and animates in/out via Framer Motion.
 */
export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pakket, setPakket] = useState<Pakket>("onbekend");
  const [prefill, setPrefill] = useState<ContactPrefill>({});

  const open = useCallback((arg?: Pakket | OpenContactOptions) => {
    if (typeof arg === "string") {
      setPakket(arg);
      setPrefill({});
    } else if (arg) {
      setPakket(arg.pakket ?? "onbekend");
      setPrefill(arg.prefill ?? {});
    } else {
      setPakket("onbekend");
      setPrefill({});
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  // Lock background scroll while the modal is open so iOS Safari doesn't
  // bounce-scroll the page underneath.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Close on ESC for keyboard users.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <ContactModalContext.Provider value={{ open, close, isOpen }}>
      {children}
      <ContactModal
        isOpen={isOpen}
        onClose={close}
        initialPakket={pakket}
        prefill={prefill}
      />
    </ContactModalContext.Provider>
  );
}

export function useContactModal(): ContactModalContextValue {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error(
      "useContactModal must be used inside <ContactModalProvider>."
    );
  }
  return ctx;
}

/* -------------------------------------------------------------------------- */
/* Modal                                                                      */
/* -------------------------------------------------------------------------- */

function ContactModal({
  isOpen,
  onClose,
  initialPakket,
  prefill,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialPakket: Pakket;
  prefill: ContactPrefill;
}) {
  const t = useT().contact;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="lumeq-contact-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={t.title}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/45 px-4 py-6 backdrop-blur-md sm:items-center sm:py-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto w-full max-w-[560px] overflow-hidden rounded-2xl bg-cream shadow-[0_30px_80px_-32px_rgba(24,24,27,0.45)]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full text-ink/55 transition-colors hover:bg-ink/[0.06] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/40"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path
                  d="M3 3l8 8M11 3l-8 8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="px-5 pb-6 pt-7 sm:px-10 sm:pb-10 sm:pt-10">
              <header className="mb-5 pr-8 sm:mb-7">
                <h2 className="font-display text-[24px] font-medium leading-tight text-ink text-balance sm:text-[30px]">
                  {t.title}
                </h2>
                <p className="mt-1.5 max-w-[52ch] text-[14px] leading-relaxed text-ink/60 sm:mt-2 sm:text-[14.5px]">
                  {t.subtitle}
                </p>
              </header>

              <ContactForm
                initialPakket={initialPakket}
                initialBedrijfsnaam={prefill.bedrijfsnaam}
                initialNaam={prefill.naam}
                initialEmail={prefill.email}
                source="modal"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
