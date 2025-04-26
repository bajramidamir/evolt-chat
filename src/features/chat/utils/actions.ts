"use server";
import { pb } from "@/libs/pocketbase";
import { MessageWithUser } from "@/types/types";

export async function fetchInitialMessages(): Promise<MessageWithUser[]> {
  const records = await pb.collection("messages").getFullList<MessageWithUser>({
    sort: "-created",
    expand: "user",
  });

  return records;
}
