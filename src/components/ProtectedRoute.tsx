import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-midnight">
        <span className="font-body text-xs uppercase tracking-[0.3em] text-pearl/50">Loading…</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/studio" replace />;
  }

  return <>{children}</>;
}
