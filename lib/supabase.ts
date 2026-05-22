import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Lazily instantiated browser client. We avoid creating it at module-load
// time so the rest of the site still renders if the env vars are missing
// (e.g. on a preview build that hasn't been wired up yet) — instead, the
// missing config only surfaces on form submit, where we can show a friendly
// error.

let _client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment."
    );
  }

  _client = createClient(url, key, {
    auth: {
      // This is a public lead form — no users, no sessions.
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return _client;
}
