import { getSupabaseClient } from "./supabase";

export type Pakket = "starter" | "groei" | "eenmalig" | "onbekend";

export const PAKKET_VALUES: readonly Pakket[] = [
  "starter",
  "groei",
  "eenmalig",
  "onbekend",
] as const;

/** Map an arbitrary string (e.g. from a URL query param) onto a valid Pakket. */
export function parsePakket(raw: string | null | undefined): Pakket {
  if (!raw) return "onbekend";
  const lower = raw.toLowerCase().trim();
  // Allow a couple of common variants in URLs ("growth" → "groei").
  if (lower === "growth") return "groei";
  return (PAKKET_VALUES as readonly string[]).includes(lower)
    ? (lower as Pakket)
    : "onbekend";
}

export type LeadSource = "modal" | "page";

export type LeadInput = {
  bedrijfsnaam: string;
  naam: string;
  email: string;
  telefoon?: string;
  website?: string;
  pakket_interesse: Pakket;
  source?: LeadSource;
  language?: "nl" | "en";
};

/**
 * Insert a single lead into `public.leads_form`. Trims whitespace, lower-cases
 * the email and stores a truncated user-agent for future fraud/analytics work.
 *
 * Throws if Supabase rejects the insert (RLS, network, etc.) — callers should
 * surface a user-friendly error message.
 */
export async function submitLead(input: LeadInput): Promise<void> {
  const client = getSupabaseClient();

  const row = {
    bedrijfsnaam: input.bedrijfsnaam.trim(),
    naam: input.naam.trim(),
    email: input.email.trim().toLowerCase(),
    telefoon: nullableString(input.telefoon),
    website: nullableString(input.website),
    pakket_interesse: input.pakket_interesse,
    source: input.source ?? "modal",
    language: input.language ?? "nl",
    user_agent:
      typeof navigator !== "undefined"
        ? navigator.userAgent.slice(0, 500)
        : null,
  };

  const { error } = await client.from("leads_form").insert(row);
  if (error) {
    // Surface enough info to debug from the browser console but keep the
    // thrown message generic — the UI shows its own friendly copy.
    // eslint-disable-next-line no-console
    console.error("[lumeq] submitLead failed", error);
    throw new Error(error.message ?? "submitLead failed");
  }
}

function nullableString(v: string | undefined | null): string | null {
  if (!v) return null;
  const trimmed = v.trim();
  return trimmed ? trimmed : null;
}
