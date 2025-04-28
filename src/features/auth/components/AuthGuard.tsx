"use client";
import { useAuth } from "../hooks/useAuth";
import { usePresence } from "@/features/user";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, error } = useAuth();
  usePresence(user?.id ?? "");

  if (loading) return <div>Initializing session...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!user) return <div>Failed to start chat session</div>;

  return children;
}
