"use client";

import { useEffect, useState } from "react";
import { pb } from "@/libs/pocketbase";
import { User } from "@/types/types";

const SESSION_STORAGE_KEY = "chat_user";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generateUsername = () =>
    `User${Math.random().toString(12).substring(2, 8)}`;

  const initAuth = async () => {
    setLoading(true);
    try {
      const sessionUser = sessionStorage.getItem(SESSION_STORAGE_KEY);

      if (sessionUser) {
        const parsedUser = JSON.parse(sessionUser) as User;
        setUser(parsedUser);
        console.log("Found user in sessionStorage:", parsedUser);
      } else {
        const username = generateUsername();
        const userData = await pb.collection("chat_users").create({
          username,
          created: new Date().toISOString(),
        });

        const newUser: User = {
          id: userData.id,
          username: userData.username,
          created: userData.created,
        };

        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newUser));

        setUser(newUser);
        console.log("Created new user:", newUser);
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to initialize authentication"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  return { user, loading, error };
}
