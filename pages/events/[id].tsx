import ChatUI from "@/components/ChatUI";
import EventMap from "@/components/EventMap";
import HeroSection from "@/components/HeroSection";
import RSVPList from "@/components/RSVPList";
import { Event, Message } from "@/types/shared";
import { createClient } from "@supabase/supabase-js";
import { NextPageContext } from "next";
import { useEffect, useState } from "react";

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  const supabase = createClient(
    "https://vfyhcgtmcgcuymcwykgx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmeWhjZ3RtY2djdXltY3d5a2d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk1MzkxOTEsImV4cCI6MTk5NTExNTE5MX0.nOsTPD5471faXRBRF_nouS191-L_2MUfyzFqngoRzgc"
  );
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  const { data: messages, error: messagesError } = await supabase
    .from("messages")
    .select(
      `
      user_id,
      users: user (id, name, avatar_image)
    `
    )
    .eq("chat_room_id", id);

  return {
    props: {
      event,
      messages,
    },
  };
}

const EventPage = ({
  event,
  messages,
}: {
  event: Event;
  messages: Message[];
}) => {
  const supabase = createClient(
    "https://vfyhcgtmcgcuymcwykgx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmeWhjZ3RtY2djdXltY3d5a2d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk1MzkxOTEsImV4cCI6MTk5NTExNTE5MX0.nOsTPD5471faXRBRF_nouS191-L_2MUfyzFqngoRzgc"
  );

  const [messageList, setMessageList] = useState<Message[]>(messages);
  const [eventDescription, setEventDescription] = useState<string>(
    event.description
  );

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Query the messages table to get the messages for the chat room id
        const { data: messages } = await supabase
          .from("messages")
          .select(
            `
          user_id,
          message_text,
          created_at,
          users (id, name, avatar_image)
        `
          )
          .eq("chat_room_id", event?.id);

        const newMessages = messages as Message[];

        if (newMessages !== null) {
          setMessageList(newMessages);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Call fetchMessages once to get the initial messages
    fetchMessages();

    // Subscribe to new messages
    const messagesSubscription = supabase
      .channel(`${event.name}-messages`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        async (payload) => {
          const { data: message } = await supabase
            .from("messages")
            .select(
              `
                user_id,
                message_text,
                created_at,
                users (id, name, avatar_image)
              `
            )
            .eq("id", payload.new.id)
            .single();

          const newMessage = message as Message;

          setMessageList((prevMessages: Message[]) => [
            ...prevMessages,
            newMessage,
          ]);
        }
      )
      .subscribe();

    supabase.realtime;

    // Unsubscribe from the subscription when the component unmounts
    return () => {
      supabase.removeChannel(messagesSubscription);
    };
  }, []);

  return (
    <div className="bodyWrapper">
      <div className="column">
        <HeroSection event={event} eventDescription={eventDescription} />
        <ChatUI
          messageList={messageList}
          eventId={event.id}
          onDescriptionChange={setEventDescription}
        />
      </div>
      <div className="column">
        <RSVPList />
        <EventMap />
      </div>
    </div>
  );
};

export default EventPage;
