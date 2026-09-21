import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * `null` until VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are set (e.g. before
 * the project is deployed with a real Supabase backend). Every call site must
 * handle the null case — the public site falls back to static data, and the
 * studio/admin UI shows a "not configured" state instead of crashing.
 */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

export const isSupabaseConfigured = supabase !== null;
