export interface User {
  id?: string;
  username: string;
  created: string;
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
