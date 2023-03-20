"use client";
import { toast } from "react-toastify";
import refreshData from "@/app/utils/refresh";
import { usePathname, useRouter } from "next/navigation";
import "../styles/landing.css";

// import Avatar, { genConfig } from 'react-nice-avatar'

function LeaderSentReqCard({ request, eventName, session }) {
  // const config = genConfig(AvatarConfig)
  const router = useRouter();
  const path = usePathname();
  function handleDeleteInvite(userId) {
    eventName = eventName.toLowerCase();
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/${eventName}/addMember/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error?.errorCode) {
          toast.error(`${data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return;
        }
        refreshData(router, path);
        toast("Invite Deleted Successfully");
        // //console.log("Invite Deleted");
      });
  }
  return (
    <>
      {/* <div className={styles.Cards}>
        <div className={styles.infogroup}>
          <div>
            <h3 className={styles.Cardsh3}>
              {" "}
              {request.firstName} {request.lastName}
            </h3>
            <h3 className={styles.Cardsh3}>{request.email}</h3>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <button
                className="inline-flex bg-[#53B3B9] items-center px-4 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-[#43A3A9] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={(e) => handleDeleteInvite(request._id)}
              >
                Delete Invite
              </button>
            </div>
          </div>
        </div>
      </div> */}
      <div className="singlecard">
        <div className="team_text">
          <p className="team_details">
            Name: <br />
            {request.firstName} {request.lastName}
          </p>
          <p className="team_details">
            Email: <br />
            {request.email}
          </p>
        </div>
        <button
          className="join_team w-button bg-red-500"
          onClick={(e) => handleDeleteInvite(request._id)}
        >
          {" "}
          Delete Invite
        </button>
      </div>
    </>
  );
}

export default LeaderSentReqCard;
