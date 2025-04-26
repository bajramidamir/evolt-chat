"use client";
import { useEffect, useState } from "react";
import { pb } from "@/libs/pocketbase";
import { MessageWithUser } from "@/types/types";

export function useMessages(initialMessages: MessageWithUser[] = []) {
  const [messages, setMessages] = useState<MessageWithUser[]>(() =>
    [...initialMessages].sort(
      (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
    )
  );

  useEffect(() => {
    const sub = pb.collection("messages").subscribe("*", async (e) => {
      const newMsg = await pb
        .collection("messages")
        .getOne<MessageWithUser>(e.record.id, {
          expand: "user",
        });

      setMessages((prev) =>
        [...prev, newMsg].sort(
          (a, b) =>
            new Date(a.created).getTime() - new Date(b.created).getTime()
        )
      );
    });

    return () => {
      pb.collection("messages").unsubscribe();
    };
  }, []);

  return { messages };
}
