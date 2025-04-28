"use client";

import { useEffect, useState } from "react";
import { pb } from "@/libs/pocketbase";
import { MessageWithUser } from "@/types/types";

const PAGE_SIZE = 10;

export function useMessages(initialMessages: MessageWithUser[] = []) {
  const [allMessages, setAllMessages] =
    useState<MessageWithUser[]>(initialMessages);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const subscribe = async () => {
      const unsub = await pb
        .collection("messages")
        .subscribe("*", async (e) => {
          if (e.action === "create") {
            // Fetch the full expanded message
            const fullMessage = await pb
              .collection("messages")
              .getOne<MessageWithUser>(e.record.id, {
                expand: "user",
              });

            setAllMessages((prev) => {
              const updated = [...prev, fullMessage];
              updated.sort(
                (a, b) =>
                  new Date(b.created).getTime() - new Date(a.created).getTime()
              );
              return updated;
            });
          }
        });

      return unsub;
    };

    const unsubPromise = subscribe();

    return () => {
      unsubPromise.then((unsub) => unsub());
    };
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const hasMore = visibleCount < allMessages.length;
  const visibleMessages = allMessages.slice(0, visibleCount);

  return { messages: visibleMessages, loadMore, hasMore };
}
