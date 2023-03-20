"use client";
import LeaderNav from "./leaderNav";
import LeaderSentReqCard from "./LeaderSentReqCard";
import { useRouter } from "next/navigation";
import styles from "../styles/joinTeams.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/landing.css";
function LeaderSentReq({ eventName, session, requests }) {
  const router = useRouter();
  return (
    <>
      <div className="teams_sec">
        <ToastContainer />
        <div className="team_card_holder">
          <div className="teamcard_cont">
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
              <div className="singlecard">
                <div className="team_text">
                  <p className="team_details">No requests sent</p>
                </div>
                {/* <button className="join_team w-button ">Back</button> */}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <div>
        <ToastContainer />

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
      </div> */}
    </>
  );
}

export default LeaderSentReq;
