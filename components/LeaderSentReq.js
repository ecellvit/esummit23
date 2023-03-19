"use client";
import LeaderNav from "./leaderNav";
import LeaderSentReqCard from "./LeaderSentReqCard";
import { useRouter } from "next/navigation";
import styles from "../styles/joinTeams.module.css";

function LeaderSentReq({ eventName, session, requests }) {
  const router = useRouter();
  return (
    <div>
      <LeaderNav eventName={eventName} />
      {requests.length ? (
        <div className={styles.Teams}>
          {requests.map((x) => {
            return (
              <LeaderSentReqCard
                request={x.userId}
                key={x.userId._id}
                eventName={eventName}
                session={session}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center mt-64">No Requests Sent</div>
      )}
    </div>
  );
}

export default LeaderSentReq;
