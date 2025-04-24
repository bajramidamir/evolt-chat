"use client";
import { useEffect, useState } from "react";
import { pb } from "@/libs/pocketbase";
import { User } from "../types/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const generateUsername = () =>
    `User${Math.random().toString(36).substring(2, 8)}`;

  const initAuth = async () => {
    setLoading(true);
    try {
      if (pb.authStore.record?.id) {
        setUser(pb.authStore.record as unknown as User);
        return;
      }

      const username = generateUsername();
      const userData = await pb.collection("chat_users").create({
        username,
        created: new Date().toISOString(),
      });

      pb.authStore.save(userData.id, userData);
      setUser({
        id: userData.id,
        username: userData.username,
        created: userData.created,
      });
    } catch (err) {
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  return { user, loading };
}
