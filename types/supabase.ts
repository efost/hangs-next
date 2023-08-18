export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      chat_rooms: {
        Row: {
          created_at: string | null;
          event_id: number | null;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string | null;
          event_id?: number | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string | null;
          event_id?: number | null;
          id?: number;
          name?: string | null;
        };
      };
      events: {
        Row: {
          created_at: string | null;
          created_by: number | null;
          date: string | null;
          description: string | null;
          group_id: number | null;
          id: number;
          image: string | null;
          location: string | null;
          name: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: number | null;
          date?: string | null;
          description?: string | null;
          group_id?: number | null;
          id?: number;
          image?: string | null;
          location?: string | null;
          name?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: number | null;
          date?: string | null;
          description?: string | null;
          group_id?: number | null;
          id?: number;
          image?: string | null;
          location?: string | null;
          name?: string | null;
        };
      };
      followers: {
        Row: {
          followee_id: number | null;
          follower_id: number | null;
          id: number;
        };
        Insert: {
          followee_id?: number | null;
          follower_id?: number | null;
          id?: number;
        };
        Update: {
          followee_id?: number | null;
          follower_id?: number | null;
          id?: number;
        };
      };
      groups: {
        Row: {
          avatar_image: string | null;
          created_at: string | null;
          created_by: number | null;
          description: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          avatar_image?: string | null;
          created_at?: string | null;
          created_by?: number | null;
          description?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          avatar_image?: string | null;
          created_at?: string | null;
          created_by?: number | null;
          description?: string | null;
          id?: number;
          name?: string | null;
        };
      };
      messages: {
        Row: {
          chat_room_id: number | null;
          created_at: string | null;
          id: number;
          message_text: string | null;
          user_id: number | null;
        };
        Insert: {
          chat_room_id?: number | null;
          created_at?: string | null;
          id?: number;
          message_text?: string | null;
          user_id?: number | null;
        };
        Update: {
          chat_room_id?: number | null;
          created_at?: string | null;
          id?: number;
          message_text?: string | null;
          user_id?: number | null;
        };
      };
      user_event_followers: {
        Row: {
          event_id: number | null;
          id: number;
          user_id: number | null;
        };
        Insert: {
          event_id?: number | null;
          id?: number;
          user_id?: number | null;
        };
        Update: {
          event_id?: number | null;
          id?: number;
          user_id?: number | null;
        };
      };
      user_events: {
        Row: {
          event_id: number | null;
          feed_visible: boolean;
          id: number;
          rsvp_status: string | null;
          user_id: number | null;
        };
        Insert: {
          event_id?: number | null;
          feed_visible?: boolean;
          id?: number;
          rsvp_status?: string | null;
          user_id?: number | null;
        };
        Update: {
          event_id?: number | null;
          feed_visible?: boolean;
          id?: number;
          rsvp_status?: string | null;
          user_id?: number | null;
        };
      };
      user_groups: {
        Row: {
          group_id: number | null;
          id: number;
          user_id: number | null;
        };
        Insert: {
          group_id?: number | null;
          id?: number;
          user_id?: number | null;
        };
        Update: {
          group_id?: number | null;
          id?: number;
          user_id?: number | null;
        };
      };
      users: {
        Row: {
          avatar_image: string | null;
          created_at: string | null;
          email: string | null;
          id: number;
          password: string | null;
          name: string | null;
          username: string | null;
        };
        Insert: {
          avatar_image?: string | null;
          created_at?: string | null;
          email?: string | null;
          id?: number;
          password?: string | null;
          name?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_image?: string | null;
          created_at?: string | null;
          email?: string | null;
          id?: number;
          password?: string | null;
          name?: string | null;
          username?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
