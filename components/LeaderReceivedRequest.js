"use client";
import LeaderNav from "./leaderNav";
import LeaderReceivedRequestCard from "./LeaderReceivedRequestCard";
import "../styles/landing.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LeaderReceivedReq({ eventName, session, requests, teamId }) {
  return (
    <>
      {" "}
      <div className="teams_sec">
        <ToastContainer />
        <div className="team_card_holder">
          <div className="teamcard_cont">
            {requests.length ? (
              <div>
                {requests.map((x) => {
                  return (
                    <>
                      <LeaderReceivedRequestCard
                        request={x.userId}
                        key={x.userId._id}
                        eventName={eventName}
                        session={session}
                        teamId={teamId}
                      />
                    </>
                  );
                })}
              </div>
            ) : (
              <div className="singlecard">
                <div className="team_text">
                  <p className="team_details">No requests Recieved</p>
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
              <div className="flex justify-center mt-64">
                No Requests Received
              </div>
            )}
          </div>
        </div>
      </div> */}
    </>
  );
}

export default LeaderReceivedReq;
