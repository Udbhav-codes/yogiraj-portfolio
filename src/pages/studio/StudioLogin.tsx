import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { isSupabaseConfigured } from "../../lib/supabase";
import { LOCAL_ADMIN_EMAIL, LOCAL_ADMIN_PASSWORD } from "../../lib/studio/localAuth";

export default function StudioLogin() {
  const { user, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    return <Navigate to="/studio/dashboard" replace />;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error } = await signIn(email, password);
    if (error) setError(error);
    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-midnight px-4">
      <div className="w-full max-w-sm">
        <p className="mb-2 text-center font-display text-2xl tracking-[0.2em] text-pearl">STUDIO</p>

        {!isSupabaseConfigured && (
          <p className="mb-6 text-center font-body text-xs text-pearl/50">
            Local testing mode — data is stored in this browser only.
            <br />
            Sign in with <code className="text-ocean">{LOCAL_ADMIN_EMAIL}</code> /{" "}
            <code className="text-ocean">{LOCAL_ADMIN_PASSWORD}</code>
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="rounded-md border border-red-400/30 bg-red-400/10 px-3 py-2 font-body text-xs text-red-300">
                {error}
              </p>
            )}
            <div>
              <label htmlFor="email" className="mb-1 block font-body text-xs uppercase tracking-[0.1em] text-pearl/50">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-pearl/20 bg-transparent py-2 font-body text-sm text-pearl outline-none transition-colors focus:border-ocean"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block font-body text-xs uppercase tracking-[0.1em] text-pearl/50">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-pearl/20 bg-transparent py-2 font-body text-sm text-pearl outline-none transition-colors focus:border-ocean"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-pearl py-3 font-body text-xs font-medium uppercase tracking-[0.2em] text-midnight transition-all hover:bg-ocean disabled:opacity-60"
            >
              {submitting ? "Signing in…" : "Sign In"}
            </button>
          </form>
      </div>
    </div>
  );
}
