import { Event } from "@/types/shared";
import { IconCalendarPlus, IconTicket } from "@tabler/icons-react";
import cx from "classnames";
import styles from "./HeroSection.module.scss";

interface Props {
  event: Event;
  eventDescription: string;
}

const HeroSection = (props: Props) => {
  const { event, eventDescription } = props;

  return (
    <>
      <div className={styles.heroContainer}>
        <div className={styles.column}>
          <div className={styles.eventInfo}>
            <h1>{event.name}</h1>
            <p className={styles.date}>
              {new Date(event.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className={styles.column}>
          <button className={cx(styles.button, styles.rsvpButton)}>
            <div className={styles.buttonIcon}>
              <IconCalendarPlus size={16} />
            </div>
            RSVP
          </button>
          <button className={cx(styles.button, styles.ticketsButton)}>
            <div className={styles.buttonIcon}>
              <IconTicket size={16} />
            </div>
            Tickets
          </button>
        </div>
        {/* <HeroImage image={event.image} /> */}
      </div>
      <p>{eventDescription}</p>
    </>
  );
};

export default HeroSection;
