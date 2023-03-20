"use client";
import { toast } from "react-toastify";
import refreshData from "@/app/utils/refresh";
import styles from "../styles/joinTeams.module.css";

import { usePathname, useRouter } from "next/navigation";

// import Avatar, { genConfig } from 'react-nice-avatar'
function UserSentCard({ request, eventName, session }) {
  // const config = genConfig()

  const router = useRouter();
  const path = usePathname();

  function handleRemoveRequest(teamId) {
    eventName = eventName.toLowerCase();
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/user/${eventName}/requests/${teamId}`,
      {
        method: "DELETE",
        body: JSON.stringify({
          status: 0,
        }),
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
        toast("Request Removed Successfully");
        // //console.log("Request Removed");
      });
  }

  return (
    <>
      {" "}
      <div className="singlecard">
        <div className="team_text">
          <p className="team_details">
            TeamName: <br />
            {request.teamId.teamName}
          </p>
          <p className="team_details">
            Team Leader: <br />
            {request?.teamId?.teamLeaderId?.email}
          </p>
          {/* <p className="team_details">
        Email: <br />
        naitikjkapadia@gmail.com
      </p> */}
        </div>
        <button
          className="join_team w-button"
          onClick={(e) => handleRemoveRequest(request.teamId?._id)}
        >
          {" "}
          Remove Request
        </button>
      </div>
      {/* <div className={styles.Cards}>
        <div className={styles.infogroup}>
          <div>
            <h3 className={styles.Cardsh3}> {request.teamId.teamName}</h3>
            <h3 className={styles.Cardsh3}>
              {request?.teamId?.teamLeaderId?.email}
            </h3>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <button
                className="inline-flex bg-[#53B3B9] items-center px-4 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-[#43A3A9] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={(e) => handleRemoveRequest(request.teamId?._id)}
              >
                Remove Request
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </>
    // <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    //   <div className="flex flex-col items-center pb-10">
    //     <div className="w-24 h-24 mb-3 rounded-full shadow-lg">
    //       {/* <Avatar className="w-32 h-32" {...config} /> */}
    //     </div>
    //     <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
    //       {request.teamId.teamName}
    //     </h5>
    //     <span className="text-sm text-gray-500 dark:text-gray-400">
    //       {request.teamId.teamLeaderId.email}
    //     </span>
    //     <div className="flex mt-4 space-x-3 md:mt-6">
    //       <button
    //         onClick={(e) => handleRemoveRequest(request.teamId?._id)}
    //         className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //       >
    //         Remove Request
    //       </button>
    //       <ToastContainer />
    //     </div>
    //   </div>
    // </div>
  );
}

export default UserSentCard;
