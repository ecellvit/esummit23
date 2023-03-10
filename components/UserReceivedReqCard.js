"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshData from "@/app/utils/refresh";
import { usePathname, useRouter } from "next/navigation";

// import Avatar, { genConfig } from 'react-nice-avatar'
function UserReceivedReqCard({ request, eventName, session }) {
  // const config = genConfig()

  const router = useRouter();
  const path = usePathname();

  function handleRejectInvite(teamId) {
    eventName = eventName.toLowerCase();
    console.log(teamId);
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/user/${eventName}/addMember/${teamId}`,
      {
        method: "POST",
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
        console.log(data);
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
        toast("Invite Rejected Successfully");
        refreshData(router, path);
        console.log("Invite Rejected");
      });
  }
  function handleAcceptInvite(teamId) {
    eventName = eventName.toLowerCase();
    console.log(teamId);
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/user/${eventName}/addMember/${teamId}`,
      {
        method: "POST",
        body: JSON.stringify({
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
        console.log(data);
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
        toast("Invite Accepted Successfully");
        router.push(`/manage/${eventName}`);
        console.log("Invite Accepted");
      });
  }
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <div className="w-24 h-24 mb-3 rounded-full shadow-lg">
          {/* <Avatar className="w-32 h-32" {...config} /> */}
        </div>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {request.teamId.teamName}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {request.teamId.teamLeaderId.email}
        </span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <button
            onClick={(e) => handleRejectInvite(request.teamId?._id)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Reject invite
          </button>
          <button
            onClick={(e) => handleAcceptInvite(request.teamId?._id)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Accept invite
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default UserReceivedReqCard;
