"use client";
import UserReceivedReqCard from "./UserReceivedReqCard";
import "../styles/landing.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserReceivedReq({ eventName, requests, session }) {
  return (
    <div className="team_card_holder">
      <ToastContainer />
      <div className="teamcard_cont">
        {requests.length ? (
          requests.map((x) => {
            return (
              <UserReceivedReqCard
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
              <p className="team_details">No requests Recieved</p>
            </div>
            {/* <button className="join_team w-button ">Back</button> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserReceivedReq;
