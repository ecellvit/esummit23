"use client";
import { ToastContainer, toast } from "react-toastify";
import styles from "../styles/joinTeams.module.css";

import "react-toastify/dist/ReactToastify.css";
import refreshData from "@/app/utils/refresh";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
// import Avatar, { genConfig } from 'react-nice-avatar'
function AddMemberCard({ user, session, eventName }) {
  const router = useRouter();
  const path = usePathname();
  // const config = genConfig(AvatarConfig)

  function handleInvite(userId) {
    console.log("userid", userId);
    console.log("gg", user._id);
    eventName = eventName.toLowerCase();
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/${eventName}/addMember/${userId}`,
      {
        method: "POST",

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
        } else {
          refreshData(router, path);
          toast.success("Invite Sent Successfully");
          console.log("invite sent");
        }
      });
  }
  return (
    <div className={styles.Cards}>
      <div className={styles.infogroup}>
        <div>
          <h3 className={styles.Cardsh3}>
            {user.firstName} {user.lastName}
          </h3>
          <h3 className={styles.Cardsh3}>{user.email}</h3>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={(e) => handleInvite(user?._id)}
            >
              Send Invite
            </button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
    // <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    //   <div className="flex flex-col items-center pb-10">
    //     <div className="w-24 h-24 mb-3 rounded-full shadow-lg">
    //       {/* <Avatar className="w-32 h-32" {...config} /> */}
    //     </div>
    //     <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
    //       {user.firstName} {user.lastName}
    //     </h5>
    //     <span className="text-sm text-gray-500 dark:text-gray-400">
    //       {user.email}
    //     </span>
    //     <div className="flex mt-4 space-x-3 md:mt-6">
    //       <button
    //         onClick={(e) => handleInvite(user?._id)}
    //         className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //       >
    //         Send invite
    //       </button>
    //       <ToastContainer />
    //     </div>
    //   </div>
    // </div>
  );
}

export default AddMemberCard;
