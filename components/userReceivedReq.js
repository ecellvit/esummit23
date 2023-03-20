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
          <h1>No requests</h1>
        )}
      </div>
    </div>
  );
}

export default UserReceivedReq;
