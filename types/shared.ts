export interface Message {
  id?: number | null;
  user_id: number | null;
  message_text: string | null;
  created_at: string | null;
  users: {
    id: number;
    username: string;
    avatar_image: string;
  };
}

export interface Event {
  id: number;
  name: string;
  image: string;
  date: string;
  description: string;
}
