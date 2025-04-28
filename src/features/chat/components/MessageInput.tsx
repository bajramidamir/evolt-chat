"use client";

import { useState } from "react";
import { sendMessage } from "@/features/chat/utils/sendMessage";

export function MessageInput() {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setSending(true);
    try {
      await sendMessage(text.trim());
      setText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 bg-white border border-blue-300 active:border-blue-600 focus:border-blue-600 shadow-sm"
        placeholder="Type a message..."
        disabled={sending}
      />
      <button
        onClick={handleSubmit}
        className="p-2 bg-blue-500 text-white disabled:bg-blue-300"
        disabled={sending}
      >
        {sending ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
