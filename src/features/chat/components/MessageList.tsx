"use client";
import { useMessages } from "@/features/chat/hooks/useMessages";
import { MessageWithUser } from "@/types/types";

export function MessageList({
  initialMessages = [],
}: {
  initialMessages?: MessageWithUser[];
}) {
  const { messages } = useMessages(initialMessages);

  return (
    <div className="overflow-y-auto space-y-3 px-4 py-2">
      {messages.map((message) => (
        <div
          key={message.id}
          className="bg-gray-50 rounded-lg p-3 shadow border border-gray-200"
        >
          <p className="text-sm text-gray-500 mb-1 font-semibold">
            {message.expand?.user?.username ?? "Unknown User"}
          </p>
          <p className="text-base text-gray-800 break-words">{message.text}</p>
        </div>
      ))}
    </div>
  );
}
