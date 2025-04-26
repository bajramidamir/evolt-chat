"use client";
import { useEffect, useState } from "react";
import { pb } from "@/libs/pocketbase";
import { MessageWithUser } from "@/types/types";

export function useMessages(initialMessages: MessageWithUser[] = []) {
  const [messages, setMessages] = useState<MessageWithUser[]>(initialMessages);

  useEffect(() => {
    const sub = pb.collection("messages").subscribe("*", async (e) => {
      const newMsg = await pb
        .collection("messages")
        .getOne<MessageWithUser>(e.record.id, {
          expand: "user",
        });

      setMessages((prev) => [newMsg, ...prev]);
    });

    return () => {
      pb.collection("messages").unsubscribe();
    };
  }, []);

  return { messages };
}
