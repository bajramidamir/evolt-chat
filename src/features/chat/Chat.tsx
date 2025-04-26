import { MessageList } from "./components/MessageList";
import { MessageInput } from "./components/MessageInput";
import { fetchInitialMessages } from "./utils/actions";

export async function Chat() {
  const initialMessages = await fetchInitialMessages();

  return (
    <div className="flex flex-col h-full">
      <MessageList initialMessages={initialMessages} />
      <MessageInput />
    </div>
  );
}
