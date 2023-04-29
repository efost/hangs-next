import { createClient } from "@supabase/supabase-js";
import cx from "classnames";
import dayjs from "dayjs";
import "dayjs/locale/en"; // or your preferred locale
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useRef } from "react";
import { Message } from "../../types/shared";
import { Database } from "../../types/supabase";
import IsomorphicImage from "../IsomorphicImage";
import styles from "./ChatUI.module.scss";

dayjs.extend(relativeTime);

const supabase = createClient<Database>(
  "https://vfyhcgtmcgcuymcwykgx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmeWhjZ3RtY2djdXltY3d5a2d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk1MzkxOTEsImV4cCI6MTk5NTExNTE5MX0.nOsTPD5471faXRBRF_nouS191-L_2MUfyzFqngoRzgc"
);

const ChatUI = ({
  messageList,
  eventId,
  onDescriptionChange,
}: {
  messageList: Message[];
  eventId: number;
  onDescriptionChange: (description: string) => void;
}) => {
  const chatLog = useRef(null);

  const handleEnterKey = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    eventId: number
  ) => {
    if (e.key === "Enter") {
      const messageText = (e.target as HTMLInputElement).value;
      if (messageText.startsWith("/desc ")) {
        const newDescription = messageText.replace("/desc ", "");
        const { error } = await supabase
          .from("events")
          .update({
            description: newDescription,
          })
          .eq("id", eventId);
        if (!error) {
          onDescriptionChange(newDescription);
          (e.target as HTMLInputElement).value = "";
        }
      } else {
        const { error } = await supabase.from("messages").insert({
          user_id: 1,
          chat_room_id: eventId,
          message_text: messageText,
        });
        if (!error) {
          (e.target as HTMLInputElement).value = "";
        }
      }
    }
  };

  useEffect(() => {
    if (!chatLog.current) return;
    chatLog.current.scrollTop = chatLog.current.scrollHeight;
  }, [messageList]);

  return (
    <div className={styles.chatUI}>
      <ul className={styles.chatLog} ref={chatLog}>
        {messageList &&
          messageList.map((message, i) => {
            const notMe = message.user_id !== 1;
            const date = dayjs(message.created_at);
            const timestamp =
              date.diff(dayjs(), "day") < 1
                ? date.fromNow()
                : date.format("MMM D, YYYY h:mm A");
            return (
              <li
                key={message.id || `message-${i}`}
                className={cx(
                  styles.messageContainer,
                  notMe && styles.incomingMessageContainer
                )}
              >
                <div className={styles.message}>
                  <div className={styles.avatar}>
                    <IsomorphicImage
                      src={message.users.avatar_image}
                      alt={message.users.username}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className={styles.username}>
                    {message.users.username}
                  </div>
                  {message.message_text}
                </div>
                <span className={styles.timestamp}>{timestamp}</span>
              </li>
            );
          })}
      </ul>
      <input
        type="text"
        className={styles.input}
        onKeyDown={(e) => handleEnterKey(e, eventId)}
        placeholder="Type a message. Press <Return> to send."
      />
    </div>
  );
};

export default ChatUI;
