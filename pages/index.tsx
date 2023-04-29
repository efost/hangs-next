import IsomorphicImage from "@/components/IsomorphicImage";
import styles from "@/styles/Home.module.css";
import { createClient } from "@supabase/supabase-js";
import { NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";

export async function getServerSideProps(context: NextPageContext) {
  const supabase = createClient(
    "https://vfyhcgtmcgcuymcwykgx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmeWhjZ3RtY2djdXltY3d5a2d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk1MzkxOTEsImV4cCI6MTk5NTExNTE5MX0.nOsTPD5471faXRBRF_nouS191-L_2MUfyzFqngoRzgc"
  );
  const { data: events } = await supabase.from("events").select("*");
  if (!events) {
    return;
  }
  const avatarCount: number[] = [];
  for (let i = 1; i <= events?.length; i++) {
    avatarCount[i] = Math.round(Math.random() * 3 + 1);
  }
  return {
    props: {
      events,
      avatarCount,
    },
  };
}

export default function Home({
  events,
  avatarCount,
}: {
  events: any[];
  avatarCount: number[];
}) {
  return (
    <>
      <Head>
        <title>Hangs</title>
        <meta
          name="description"
          content="Hangs - for doing stuff you love with people you love"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.columns}>
        <div className={(styles.column, styles.feed)}>
          <h2>Friends&apos; Upcoming Events</h2>
          <ul className={styles.friendEventList}>
            {events &&
              events.map((event, i) => (
                <li className={styles.friendEventWrapper} key={`event-${i}`}>
                  <div className={styles.eventImageContainer}>
                    <IsomorphicImage
                      alt="Event Image"
                      src={`https://loremflickr.com/640/480/${
                        event.name.toLowerCase().split(" ")[0]
                      }`}
                      width={640}
                      height={480}
                      fill
                    />
                  </div>
                  <div className={styles.friendEventInfoWrapper}>
                    <div className={styles.friendAvatars}>
                      {(() => {
                        const images = [];
                        for (let i = 1; i <= avatarCount[event.id]; i++) {
                          const src = `https://i.pravatar.cc/96?img=${Math.round(
                            Math.random() * 50
                          )}`;
                          images.push(
                            <IsomorphicImage
                              src={src}
                              alt={`Friend ${i}`}
                              key={`friend-${i}`}
                              width={96}
                              height={96}
                              fill
                            />
                          );
                        }
                        return <>{images}</>;
                      })()}
                    </div>
                    <div className={styles.friendEvent}>
                      <div className={styles.friendEventInfo}>
                        <h3 style={{ marginBlockEnd: 0 }}>
                          <Link href={`/events/${event.id}`}>{event.name}</Link>
                        </h3>
                        <p
                          style={{
                            fontSize: "0.9em",
                            fontWeight: "bold",
                            marginBlockEnd: "1em",
                          }}
                        >
                          {new Date(event.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                        {/* <p style={{ marginBlockEnd: '1em'}}><a href="#">Eric</a> is going • <a href="#">Jenna</a> is interested</p> */}
                        <p>{event.description}</p>
                      </div>
                    </div>
                    {/* <div className={styles.eventActions}>
                      <button className={styles.interestedBtn}>
                        Interested
                      </button>
                      <button className={styles.goingBtn}>
                        <Icon icon={faCheck} />
                        Going
                      </button>
                    </div> */}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
