"use client";
import { toast } from "react-toastify";
import styles from "../styles/joinTeams.module.css";

import refreshData from "@/app/utils/refresh";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
// import Avatar, { genConfig } from 'react-nice-avatar'
function AddMemberCard({ user, session, eventName }) {
  const router = useRouter();
  const path = usePathname();
  // const config = genConfig(AvatarConfig)

  function handleInvite(userId) {
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
        cache: "no-store",
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
        } else {
          refreshData(router, path);
          toast.success("Invite Sent Successfully");
        }
      });
  }
  return (
    <>
      {/* <div className={styles.Cards}>
        <div className={styles.infogroup}>
          <div>
            <h3 className={styles.Cardsh3}>
              {user.firstName} {user.lastName}
            </h3>
            <h3 className={styles.Cardsh3}>{user.email}</h3>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <button
                className="inline-flex bg-[#53B3B9] items-center px-4 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-[#43A3A9] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={(e) => handleInvite(user?._id)}
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      </div>{" "} */}
      <div className="singlecard">
        <div className="team_text">
          <p className="team_details">
            Name: <br />
            {user.firstName} {user.lastName}
          </p>
          <p className="team_details">
            Email: <br />
            {user.email}
          </p>
        </div>
        <button
          className="join_team w-button"
          onClick={(e) => handleInvite(user?._id)}
        >
          {" "}
          Send Invite
        </button>
      </div>
    </>
  );
}

export default AddMemberCard;
