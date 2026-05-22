"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useContactModal } from "@/components/ContactModalProvider";

/**
 * Persistent "Wil jij ook zo'n website?" CTA pinned to the bottom of the
 * preview page. On mobile it spans the full width as a bar; on desktop it
 * floats as a rounded pill bottom-right with a subtle attention pulse.
 *
 * Fades in after the user has scrolled past the hero so it doesn't compete
 * with the first impression.
 */
export function FloatingCta({ businessName }: { businessName: string }) {
  const { open: openContact } = useContactModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () =>
    openContact({ prefill: { bedrijfsnaam: businessName } });

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 12,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      // Mobile: full-width bottom bar. Desktop (sm+): floating pill bottom-right.
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:px-0 sm:pb-0"
    >
      <div className="relative">
        {/* Subtle attention pulse — uses the global animate-ping-slow utility. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full bg-burgundy/40 motion-safe:animate-ping-slow"
        />
        <button
          type="button"
          onClick={handleClick}
          className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-burgundy px-5 py-3.5 text-[14.5px] font-medium text-canvas shadow-burgundy ring-1 ring-canvas/10 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-burgundy-700 hover:shadow-burgundy-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/40 focus-visible:ring-offset-2 sm:w-auto sm:px-6"
        >
          <span className="relative">Wil jij ook zo&apos;n website?</span>
          <span
            aria-hidden
            className="relative transition-transform duration-300 group-hover:translate-x-0.5"
          >
            →
          </span>
        </button>
      </div>
    </motion.div>
  );
}
