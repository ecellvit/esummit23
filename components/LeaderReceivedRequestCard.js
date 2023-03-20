"use client";
import { toast } from "react-toastify";
import refreshData from "@/app/utils/refresh";
import { usePathname, useRouter } from "next/navigation";
import "../styles/landing.css";

// import Avatar, { genConfig } from 'react-nice-avatar'

function LeaderReceivedRequestCard({ request, eventName, session, teamId }) {
  // const config = genConfig(AvatarConfig)
  const router = useRouter();
  const path = usePathname();

  function handleDecline(userId) {
    eventName = eventName.toLowerCase();
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/${eventName}/requests/${teamId}`,
      {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
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
        toast("Invite Deleted Successfully");
        // //console.log("Invite Deleted");
      });
  }

  function handleAccept(userId) {
    eventName = eventName.toLowerCase();
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/${eventName}/requests/${teamId}`,
      {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
          status: 1,
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
        toast("Invite Accepted Successfully");
        // //console.log("Invite Accepted");
      });
  }

  return (
    <>
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
          className="join_team w-button"
          onClick={(e) => handleAccept(request._id)}
        >
          {" "}
          Accept Request
        </button>
        <button
          className="join_team w-button mt-2"
          onClick={(e) => handleDecline(request._id)}
        >
          {" "}
          Decline Request
        </button>
      </div>

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
                onClick={(e) => handleAccept(request._id)}
              >
                Accept Request
              </button>
              <button
                className="inline-flex bg-[#53B3B9] items-center px-4 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-[#43A3A9] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={(e) => handleDecline(request._id)}
              >
                Decline Request
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
    //       {request.firstName} {request.lastName}
    //     </h5>
    //     <span className="text-sm text-gray-500 dark:text-gray-400">
    //       {request.email}
    //     </span>
    //     <div className="flex mt-4 space-x-3 md:mt-6">
    //       <button
    //         onClick={(e) => handleAccept(request._id)}
    //         className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //       >
    //         Accept Request
    //       </button>
    //       <button
    //         onClick={(e) => handleDecline(request._id)}
    //         className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //       >
    //         Decline Request
    //       </button>
    //       <ToastContainer />
    //     </div>
    //   </div>
    // </div>
  );
}

export default LeaderReceivedRequestCard;
