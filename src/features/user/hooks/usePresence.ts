"use client";
import { useEffect } from "react";
import { pb } from "@/libs/pocketbase";

export function usePresence(userId: string) {
  useEffect(() => {
    if (!userId) return;

    const interval = setInterval(async () => {
      try {
        await pb.collection("chat_users").update(userId, {
          lastActive: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Presence update failed", error);
      }
    }, 10000); // every 10 seconds

    return () => clearInterval(interval);
  }, [userId]);
}
