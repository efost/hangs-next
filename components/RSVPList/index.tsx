import { IconChevronUp } from "@tabler/icons-react";
import cx from "classnames";
import { SetStateAction, useState } from "react";
import sharedStyles from "../../styles/shared/shared.module.scss";
import IsomorphicImage from "../IsomorphicImage";
import styles from "./RSVPList.module.scss";

interface AttendeeGroup {
  attendees: string[];
  isListExpanded: boolean;
}

interface AttendeeGroups {
  going: AttendeeGroup;
  maybe: AttendeeGroup;
  notGoing: AttendeeGroup;
}

const RSVPList = () => {
  const [attendeeGroups, setAttendeeGroups] = useState<
    SetStateAction<AttendeeGroups>
  >({
    going: { attendees: [], isListExpanded: true },
    maybe: { attendees: [], isListExpanded: false },
    notGoing: { attendees: [], isListExpanded: false },
  });

  const toggleList = (section: keyof AttendeeGroups) => {
    setAttendeeGroups((prevState: AttendeeGroups) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        isListExpanded: !prevState[section].isListExpanded,
      },
    }));
  };

  return (
    <div className={styles.rsvpList}>
      <h2 className={styles.title}>Attendees</h2>
      <h3 className={styles.sectionHeader} onClick={() => toggleList("going")}>
        <div>
          Going <div className={styles.attendeeCount}>3</div>
        </div>{" "}
        <IconChevronUp
          className={cx(attendeeGroups.going.isListExpanded && styles.open)}
        />
      </h3>
      <div
        className={cx(
          styles.attendeeContainer,
          attendeeGroups.going.isListExpanded && styles.open
        )}
      >
        <ul className={cx(styles.attendeeGroup)}>
          <li className={styles.attendee}>
            <div className={sharedStyles.avatar}>
              <IsomorphicImage
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Person 1"
                width={48}
                height={48}
              />
            </div>
            Person 1
          </li>
          <li className={styles.attendee}>
            <div className={sharedStyles.avatar}>
              <IsomorphicImage
                src="https://randomuser.me/api/portraits/men/68.jpg"
                alt="Person 2"
                width={48}
                height={48}
              />
            </div>
            Person 2
          </li>
          <li className={styles.attendee}>
            <div className={sharedStyles.avatar}>
              <IsomorphicImage
                src="https://randomuser.me/api/portraits/men/21.jpg"
                alt="Person 3"
                width={48}
                height={48}
              />
            </div>
            Person 3
          </li>
        </ul>
      </div>
      <h3 className={styles.sectionHeader} onClick={() => toggleList("maybe")}>
        <div>
          Maybe <div className={styles.attendeeCount}>2</div>
        </div>
        <IconChevronUp
          className={cx(attendeeGroups.maybe.isListExpanded && styles.open)}
        />
      </h3>
      <div
        className={cx(
          styles.attendeeContainer,
          attendeeGroups.maybe.isListExpanded && styles.open
        )}
      >
        <ul className={styles.attendeeGroup}>
          <li className={styles.attendee}>
            <div className={sharedStyles.avatar}>
              <IsomorphicImage
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Person 1"
                width={48}
                height={48}
              />
            </div>
            Person 1
          </li>
          <li className={styles.attendee}>
            <div className={sharedStyles.avatar}>
              <IsomorphicImage
                src="https://randomuser.me/api/portraits/men/68.jpg"
                alt="Person 2"
                width={48}
                height={48}
              />
            </div>
            Person 2
          </li>
        </ul>
      </div>
      <h3
        className={styles.sectionHeader}
        onClick={(e) => toggleList("notGoing")}
      >
        <div>
          Can&apos;t Make It <div className={styles.attendeeCount}>1</div>
        </div>
        <IconChevronUp
          className={cx(attendeeGroups.notGoing.isListExpanded && styles.open)}
        />
      </h3>
      <div
        className={cx(
          styles.attendeeContainer,
          attendeeGroups.notGoing.isListExpanded && styles.open
        )}
      >
        <ul className={styles.attendeeGroup}>
          <li className={styles.attendee}>
            <div className={sharedStyles.avatar}>
              <IsomorphicImage
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Person 1"
                width={48}
                height={48}
              />
            </div>
            Person 1
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RSVPList;
RSVPList.displayName = "RSVPList";
