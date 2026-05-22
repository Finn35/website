"use client";

import {
  AnimatePresence,
  motion,
  type HTMLMotionProps,
} from "framer-motion";
import {
  forwardRef,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { useLang, useT } from "@/components/LanguageProvider";
import { submitLead, type LeadSource, type Pakket } from "@/lib/leads";
import { cn } from "@/lib/cn";

// Simple, intentionally permissive RFC-style check. The hard validation lives
// server-side in the database constraint; this is just to catch typos.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PAKKET_ORDER: readonly Pakket[] = [
  "starter",
  "groei",
  "eenmalig",
  "onbekend",
];

export type ContactFormProps = {
  /** Pre-selected package, e.g. from a pricing card or `?pakket=` URL param. */
  initialPakket?: Pakket;
  /** Pre-filled company name (e.g. when opening from a /preview/[slug] page). */
  initialBedrijfsnaam?: string;
  initialNaam?: string;
  initialEmail?: string;
  /** Where this form is being shown — gets stored alongside the lead. */
  source?: LeadSource;
  /** Called after a successful insert (e.g. by the modal to enable auto-close). */
  onSuccess?: () => void;
  className?: string;
};

export function ContactForm({
  initialPakket = "onbekend",
  initialBedrijfsnaam = "",
  initialNaam = "",
  initialEmail = "",
  source = "modal",
  onSuccess,
  className,
}: ContactFormProps) {
  const t = useT().contact;
  const { lang } = useLang();

  const [bedrijfsnaam, setBedrijfsnaam] = useState(initialBedrijfsnaam);
  const [naam, setNaam] = useState(initialNaam);
  const [email, setEmail] = useState(initialEmail);
  const [telefoon, setTelefoon] = useState("");
  const [website, setWebsite] = useState("");
  const [pakket, setPakket] = useState<Pakket>(initialPakket);

  // If the modal is re-opened with different initial values, sync them in.
  useEffect(() => {
    setPakket(initialPakket);
  }, [initialPakket]);
  useEffect(() => {
    if (initialBedrijfsnaam) setBedrijfsnaam(initialBedrijfsnaam);
  }, [initialBedrijfsnaam]);
  useEffect(() => {
    if (initialNaam) setNaam(initialNaam);
  }, [initialNaam]);
  useEffect(() => {
    if (initialEmail) setEmail(initialEmail);
  }, [initialEmail]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState<
    { naam: string; bedrijfsnaam: string } | null
  >(null);
  // Optional fields (telefoon / website) are collapsed by default to keep
  // the mobile form short. Auto-expand if the user has already filled one
  // — e.g. when re-opening the form after a validation error.
  const [showOptional, setShowOptional] = useState<boolean>(
    Boolean(telefoon || website)
  );

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!bedrijfsnaam.trim()) next.bedrijfsnaam = t.errors.bedrijfsnaam;
    if (!naam.trim()) next.naam = t.errors.naam;
    if (!email.trim()) next.email = t.errors.email;
    else if (!EMAIL_RE.test(email.trim())) next.email = t.errors.emailFormat;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      await submitLead({
        bedrijfsnaam,
        naam,
        email,
        telefoon,
        website,
        pakket_interesse: pakket,
        source,
        language: lang,
      });
      setSuccess({ naam: naam.trim(), bedrijfsnaam: bedrijfsnaam.trim() });
      onSuccess?.();
    } catch {
      setSubmitError(t.errors.submit);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <SuccessState
        name={success.naam}
        company={success.bedrijfsnaam}
        className={className}
        titleTemplate={t.success.title}
        bodyTemplate={t.success.body}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn("flex flex-col gap-4", className)}
    >
      <Field
        id="bedrijfsnaam"
        label={t.fields.bedrijfsnaam}
        required
        error={errors.bedrijfsnaam}
      >
        <TextInput
          id="bedrijfsnaam"
          value={bedrijfsnaam}
          onChange={(e) => setBedrijfsnaam(e.target.value)}
          autoComplete="organization"
          hasError={!!errors.bedrijfsnaam}
        />
      </Field>

      <Field id="naam" label={t.fields.naam} required error={errors.naam}>
        <TextInput
          id="naam"
          value={naam}
          onChange={(e) => setNaam(e.target.value)}
          autoComplete="name"
          hasError={!!errors.naam}
        />
      </Field>

      <Field id="email" label={t.fields.email} required error={errors.email}>
        <TextInput
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          inputMode="email"
          hasError={!!errors.email}
        />
      </Field>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-0 text-[13px] font-medium text-ink/70">
          {t.fields.pakketLabel}{" "}
          <span aria-hidden className="text-burgundy">
            *
          </span>
        </legend>
        <div
          role="radiogroup"
          aria-label={t.fields.pakketLabel}
          className="grid grid-cols-2 gap-2.5 sm:gap-3"
        >
          {PAKKET_ORDER.map((p) => (
            <PakketCard
              key={p}
              value={p}
              active={pakket === p}
              label={t.pakket[p].label}
              price={t.pakket[p].price}
              onSelect={() => setPakket(p)}
            />
          ))}
        </div>
      </fieldset>

      {/* Optional fields — hidden by default so the mobile form stays short. */}
      <AnimatePresence initial={false} mode="popLayout">
        {showOptional ? (
          <motion.div
            key="optional-fields"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              <Field id="telefoon" label={t.fields.telefoon}>
                <TextInput
                  id="telefoon"
                  type="tel"
                  value={telefoon}
                  onChange={(e) => setTelefoon(e.target.value)}
                  autoComplete="tel"
                  inputMode="tel"
                  autoFocus
                />
              </Field>
              <Field id="website" label={t.fields.website}>
                <TextInput
                  id="website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  autoComplete="url"
                  inputMode="url"
                  placeholder="https://"
                />
              </Field>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="optional-toggle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            type="button"
            onClick={() => setShowOptional(true)}
            className="group inline-flex items-center gap-2 self-start text-[13.5px] text-ink/55 transition-colors hover:text-burgundy"
          >
            <span
              aria-hidden
              className="grid h-[18px] w-[18px] place-items-center rounded-full border border-ink/25 text-[14px] leading-none text-ink/65 transition-colors group-hover:border-burgundy group-hover:text-burgundy"
            >
              +
            </span>
            {t.optionalToggle}
          </motion.button>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={submitting}
        className={cn(
          "group relative mt-2 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-button bg-burgundy px-6 py-3.5 text-[14.5px] font-medium tracking-tight text-canvas shadow-burgundy transition-colors duration-200",
          "hover:bg-burgundy-700 hover:shadow-burgundy-hover",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
          "disabled:cursor-not-allowed disabled:opacity-60"
        )}
      >
        {submitting ? (
          <>
            <Spinner />
            <span>{t.submitting}</span>
          </>
        ) : (
          <>
            <span>{t.submit}</span>
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </>
        )}
      </button>

      <AnimatePresence>
        {submitError && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            role="alert"
            className="-mt-1 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-center text-[13px] leading-relaxed text-red-700"
          >
            {submitError}
          </motion.p>
        )}
      </AnimatePresence>

      <p className="text-center text-[12px] leading-relaxed text-ink/45">
        {t.privacy}
      </p>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/* Sub-components                                                             */
/* -------------------------------------------------------------------------- */

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-ink/70">
        {label}
        {required && (
          <span aria-hidden className="text-burgundy">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.span
            key="err"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            role="alert"
            className="overflow-hidden text-[12.5px] leading-tight text-red-700"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({ hasError, className, ...rest }, ref) {
    return (
      <input
        ref={ref}
        {...rest}
        className={cn(
          // 48px tap target on mobile, slightly larger on desktop
          "h-12 w-full rounded-[10px] border bg-surface px-4 text-[15px] text-ink placeholder:text-ink/35 transition-colors duration-200",
          "focus:outline-none focus-visible:outline-none",
          hasError
            ? "border-red-400 focus:border-red-500"
            : "border-ink/12 focus:border-gold-400",
          className
        )}
      />
    );
  }
);

function PakketCard({
  value,
  active,
  label,
  price,
  onSelect,
}: {
  value: Pakket;
  active: boolean;
  label: string;
  price?: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      data-value={value}
      onClick={onSelect}
      className={cn(
        "group relative flex min-h-[64px] w-full items-center gap-3 rounded-[10px] border bg-surface px-3 py-2.5 text-left transition-all duration-200 sm:px-3.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
        active
          ? "border-burgundy bg-selected"
          : "border-ink/12 hover:border-ink/30 hover:bg-ink/[0.015]"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border transition-colors duration-200",
          active ? "border-burgundy bg-burgundy" : "border-ink/25 bg-surface"
        )}
      >
        {active && <span className="block h-[7px] w-[7px] rounded-full bg-canvas" />}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[14px] font-medium leading-tight text-ink">
          {label}
        </span>
        {price ? (
          <span className="mt-0.5 truncate text-[12.5px] leading-tight text-ink/55 tabular">
            {price}
          </span>
        ) : null}
      </span>
    </button>
  );
}

function SuccessState({
  name,
  company,
  titleTemplate,
  bodyTemplate,
  className,
}: {
  name: string;
  company: string;
  titleTemplate: string;
  bodyTemplate: string;
  className?: string;
}) {
  const title = titleTemplate.replace("{name}", name);
  const body = bodyTemplate.replace("{company}", company);

  const motionProps: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <motion.div
      {...motionProps}
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center gap-4 py-6 text-center",
        className
      )}
    >
      <span
        aria-hidden
        className="grid h-14 w-14 place-items-center rounded-full bg-burgundy/12 text-burgundy"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M5 12.5l4.5 4.5L19 7"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <h3 className="max-w-[28ch] font-display text-[28px] font-medium leading-tight text-ink text-balance sm:text-[32px]">
        {title}
      </h3>
      <p className="max-w-[44ch] text-pretty text-[15px] leading-relaxed text-ink/65">
        {body}
      </p>
    </motion.div>
  );
}

function Spinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden
      className="animate-spin"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
