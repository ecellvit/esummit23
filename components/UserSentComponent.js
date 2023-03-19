"use client";
import UserSentCard from "./userSentCard";
import { useRouter } from "next/navigation";
import styles from "../styles/joinTeams.module.css";

function UserSentComponent({ eventName, requests, session }) {
  const router = useRouter();

  console.log("all requests!!!!!!!!!!!!!!!!!!!!!", requests);
  return (
    <div className={styles.Teams}>
      <div>User Sent </div>
      <div className={styles.Teams}>
        {requests.length ? (
          requests.map((x) => {
            return (
              <UserSentCard
                key={x}
                request={x}
                eventName={eventName}
                session={session}
              />
            );
          })
        ) : (
          <h1>No requests</h1>
        )}
      </div>
    </div>
  );
}

export default UserSentComponent;
