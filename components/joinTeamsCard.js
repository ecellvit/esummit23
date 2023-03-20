"use client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "../styles/landing.css";

// import Avatar, { genConfig } from 'react-nice-avatar'

function JoinTeamsCard({ teamData, session, eventName }) {
  // const config = genConfig(AvatarConfig)

  function handleJoinReq(teamId) {
    eventName = eventName.toLowerCase();
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/user/${eventName}/requests/${teamId}`,
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
          toast.success("Join Request Sent Successfully");
        }
      });
  }

  let teamLeader;

  teamData?.members.map((x) => {
    if (eventName == "ehack") {
      if (x.eHackTeamRole == 0) {
        teamLeader = x;
      }
    } else if (eventName == "innoventure") {
      if (x.innoventureTeamRole == 0) {
        teamLeader = x;
      }
    } else if (eventName == "impetus") {
      if (x.impetusTeamRole == 0) {
        teamLeader = x;
      }
    }
  });

  return (
    <>
      <div className="singlecard">
        <div className="team_text">
          <p className="team_details font-semibold break-all">
            TeamName : {" "}
            {teamData?.teamName}
          </p>
          <p className="team_details font-semibold break-all">
            Team Leader : {" "}
            {teamLeader?.firstName + " " + teamLeader?.lastName}
          </p>
          <p className="team_details font-semibold break-all">
            Email : {" "}
            {teamLeader?.email}
          </p>
        </div>
        <button
          className="join_team w-button  text-white "
          onClick={(e) => handleJoinReq(teamData?._id)}
        >
          Join Team
        </button>
      </div>
      {/* <div className={styles.Cards}>
        <div className={styles.infogroup}>
          <div>
            <h3 className={styles.Cardsh3}>TeamName: {teamData?.teamName}</h3>
            <h3 className={styles.Cardsh3}>
              Team Leader Email: {teamLeader?.email}
            </h3>
            <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[#53B3B9] rounded-lg hover:bg-[#43A3A9] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={(e) => handleJoinReq(teamData?._id)}
            >
              Join Team
            </button>
            <ToastContainer />
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
    //       Team Name: {teamData?.teamName}
    //     </h5>
    //     <span className="text-sm text-gray-500 dark:text-gray-400">
    //       Leader email: {teamLeader?.email}
    //     </span>
    //     <div className="flex mt-4 space-x-3 md:mt-6">
    //       <button
    //         onClick={(e) => handleJoinReq(teamData?._id)}
    //         className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //       >
    //         Join Team
    //       </button>
    //     </div>
    //   </div>
    // </div>
    // <h1>hi</h1>
  );
}

export default JoinTeamsCard;
