"use client";

import { useEffect, useRef } from "react";
import { useMessages } from "@/features/chat/hooks/useMessages";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { MessageWithUser } from "@/types/types";

export function MessageList({
  initialMessages = [],
}: {
  initialMessages?: MessageWithUser[];
}) {
  const { messages, loadMore, hasMore } = useMessages(initialMessages);
  messages.reverse();
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto h-full space-y-3 px-2 sm:px-4 py-2"
    >
      {hasMore && (
        <button
          onClick={loadMore}
          className="py-2 px-3 mb-4 text-sm sm:text-base text-white bg-blue-500 rounded-lg hover:bg-blue-400 transition-colors"
        >
          Load More
        </button>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-2 sm:p-3 rounded-lg shadow border max-w-[85%] sm:max-w-[70%] ${
            message.expand?.user?.id === user?.id
              ? "ml-auto bg-blue-100 border-blue-300"
              : "mr-auto bg-gray-50 border-gray-200"
          }`}
        >
          <p className="text-xs sm:text-sm text-gray-500 mb-1 font-semibold">
            {message.expand?.user?.username ?? "Unknown User"}
          </p>
          <p className="text-sm sm:text-base text-gray-800 break-words">
            {message.text}
          </p>
        </div>
      ))}
    </div>
  );
}
