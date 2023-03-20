"use client";
import UserSentCard from "./userSentCard";
import styles from "../styles/joinTeams.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserSentComponent({ eventName, requests, session }) {
  return (
    <>
      {" "}
      <div className="team_card_holder">
        {" "}
        <ToastContainer />
        <div className="teamcard_cont">
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
            <div className="singlecard">
              <div className="team_text">
                <p className="team_details">No requests </p>
              </div>
              {/* <button className="join_team w-button ">Back</button> */}
            </div>
          )}
        </div>
      </div>{" "}
      {/* <div className={styles.Teams}>
        <ToastContainer />
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
      </div> */}
    </>
  );
}

export default UserSentComponent;
