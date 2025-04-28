export interface User {
  id?: string;
  username: string;
  created: string;
  lastActive?: string;
  status: "online" | "offline";
}

export interface Message {
  id: string;
  text: string;
  user: string;
  created: string;
}

export type MessageWithUser = Message & {
  expand?: {
    user?: User;
  };
};
