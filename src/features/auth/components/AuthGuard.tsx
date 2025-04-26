"use client";
import { useAuth } from "../hooks/useAuth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, error } = useAuth();

  if (loading) return <div>Initializing session...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!user) return <div>Failed to start chat session</div>;

  return children;
}
