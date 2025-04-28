"use client";
import { useEffect, useState } from "react";
import { pb } from "@/libs/pocketbase";
import { toast } from "react-hot-toast";
import { User } from "@/types/types";

export function useActiveUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    let unsub: (() => void) | undefined;

    async function fetchUsers() {
      const res = await pb.collection("chat_users").getFullList({
        sort: "-lastActive",
      });
      setUsers(
        res.map((record) => ({
          id: record.id,
          username: record.username,
          created: record.created,
          status: record.status,
          lastActive: record.lastActive,
        }))
      );
    }

    fetchUsers();

    pb.collection("chat_users")
      .subscribe("*", (e) => {
        if (e.action === "create") {
          const newUser = e.record;
          if (newUser.id !== pb.authStore.record?.id) {
            toast.success(`${newUser.username} has joined the chat! 🎉`);
          }
        }

        fetchUsers();
      })
      .then((unsubscribe) => {
        unsub = unsubscribe;
      });

    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, []);

  const activeUsers = users.filter((user) => {
    if (!user.lastActive) return false;
    const lastActive = new Date(user.lastActive).getTime();
    const now = Date.now();
    return now - lastActive <= 30_000;
  });

  return activeUsers;
}
