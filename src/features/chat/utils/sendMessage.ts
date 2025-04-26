import { pb } from "@/libs/pocketbase";

export async function sendMessage(text: string) {
  const userString = sessionStorage.getItem("chat_user");
  if (!userString) {
    throw new Error("User not found in sessionStorage");
  }

  const user = JSON.parse(userString);

  const messageData = {
    text,
    user: user.id,
  };

  return await pb.collection("messages").create(messageData);
}
