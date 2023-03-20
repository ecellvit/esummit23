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
      <div class="teams_sec">
        <ToastContainer />
        <div class="team_card_holder">
          <div class="teamcard_cont">
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
              <div class="singlecard">
                <div class="team_text">
                  <p class="team_details">No requests Recieved</p>
                </div>
                {/* <button class="join_team w-button ">Back</button> */}
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
