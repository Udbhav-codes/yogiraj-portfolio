/**
 * Local, offline stand-in for Supabase Auth — used automatically when
 * VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY aren't set. One fixed dummy
 * admin account, session flag kept in localStorage. Swapped out entirely
 * for real Supabase auth the moment real credentials are added — nothing
 * else in the app needs to change.
 */

export const LOCAL_ADMIN_EMAIL = "yogiraj@studio.local";
export const LOCAL_ADMIN_PASSWORD = "studio2026";

const SESSION_KEY = "studio_local_session";

export interface LocalUser {
  email: string;
}

export function getLocalSession(): LocalUser | null {
  return localStorage.getItem(SESSION_KEY) === "true" ? { email: LOCAL_ADMIN_EMAIL } : null;
}

export function localSignIn(email: string, password: string): { error: string | null } {
  if (email.trim().toLowerCase() !== LOCAL_ADMIN_EMAIL || password !== LOCAL_ADMIN_PASSWORD) {
    return { error: "Invalid email or password." };
  }
  localStorage.setItem(SESSION_KEY, "true");
  window.dispatchEvent(new Event("studio-local-auth-change"));
  return { error: null };
}

export function localSignOut() {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("studio-local-auth-change"));
}
