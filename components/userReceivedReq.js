"use client";
import UserReceivedReqCard from "./UserReceivedReqCard";
import "../styles/landing.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserReceivedReq({ eventName, requests, session }) {
  return (
    <div class="team_card_holder">
      <ToastContainer />
      <div class="teamcard_cont">
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
          <div class="singlecard">
            <div class="team_text">
              <p class="team_details">No requests Recieved</p>
            </div>
            {/* <button class="join_team w-button ">Back</button> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserReceivedReq;
