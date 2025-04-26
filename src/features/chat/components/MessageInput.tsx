"use client";

import { useState } from "react";
import { sendMessage } from "@/features/chat/utils/sendMessage";

export function MessageInput() {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return; // optional: prevent empty messages

    setSending(true);
    try {
      await sendMessage(text.trim());
      setText(""); // clear input only if successful
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
        className="flex-1 p-2 border rounded"
        placeholder="Type a message..."
        disabled={sending}
      />
      <button
        onClick={handleSubmit}
        className="p-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        disabled={sending}
      >
        {sending ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
