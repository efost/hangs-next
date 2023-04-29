import { Event } from "@/types/shared";
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
        <div className={styles.eventInfo}>
          <h1>{event.name}</h1>
          <p className={styles.date}>
            {/* <Icon
              icon={faCalendarAlt}
              style={{
                color: "var(--color-primary)",
                marginRight: "0.5rem",
                fontSize: "0.8em",
              }}
            /> */}
            {new Date(event.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p>{eventDescription}</p>
        </div>
        {/* <HeroImage image={event.image} /> */}
      </div>
    </>
  );
};

export default HeroSection;
