"use client";
import LeaderNav from "./leaderNav";
import LeaderReceivedRequestCard from "./LeaderReceivedRequestCard";
import styles from "../styles/joinTeams.module.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LeaderReceivedReq({ eventName, session, requests, teamId }) {
  return (
    <div>
      <ToastContainer />
      <LeaderNav eventName={eventName} />
      <div className={styles.Teams}>
        <div className={styles.Teams}>
          {requests.length ? (
            <div>
              {requests.map((x) => {
                return (
                  <LeaderReceivedRequestCard
                    request={x.userId}
                    key={x.userId._id}
                    eventName={eventName}
                    session={session}
                    teamId={teamId}
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex justify-center mt-64">No Requests Received</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeaderReceivedReq;
