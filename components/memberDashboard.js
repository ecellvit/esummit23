"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshData from "@/app/utils/refresh";
import UserCard from "./userCard";
import MemberCard from "./memberCard";
import { usePathname, useRouter } from "next/navigation";
import "../styles/landing.css";
export default function MemberDashboard({ userData, eventName, session }) {
  const router = useRouter();
  const path = usePathname();

  function handleLeave(teamId) {
    eventName = eventName.toLowerCase();
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/${eventName}/${teamId}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      cache: "no-store",
    })
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
        }
        refreshData(router, path);
        toast("Team left Successfully");
      });
  }

  return (
    // <div className="min-h-screen w-full bg-neutral-100 text-white py-10 px-8">
    //   <h1 className="font-md text-4xl">{eventName} dashboard</h1>

    //   <div className="grid grid-cols-2 gap-8  mt-20 mx-auto w-[70rem] text-center">
    //     {userData?.members?.map((data) => {
    //       return (
    //         <UserCard key={data} data={data} userRole={data[eventName + "TeamRole"]} />
    //       );
    //     })}
    //   </div>
    //   <div className="flex justify-center mt-16">
    //     <button
    //       onClick={(e) => handleLeave(userData._id)}
    //       className="bg-red-700 w-40 rounded-md p-2"
    //     >
    //       Leave Team
    //     </button>
    //     <ToastContainer />
    //   </div>
    // </div>
    <>
      {" "}
      <div className="teams_sec mt-[-5vh]">
        <ToastContainer />
        <div className="search">
          <div className="w-form text-center w-[100%] text-[2rem]">
            Team Name : {userData.teamName}
          </div>
        </div>
        <div className="team_card_holder">
          <div className="teamcard_cont">
            {userData?.members?.map((data) => {
              return (
                <UserCard
                  key={data}
                  data={data}
                  userRole={data[eventName + "TeamRole"]}
                />
              );
            })}
          </div>
        </div>
        <div className="navigation_cont ">
          {/* <button
            className="navigation_card_btn w-button"
            onClick={(e) => {
              eventName = eventName.toLowerCase();
              router.push(`/manage/${eventName}/add-members`);
            }}
          >
            {" "}
            Add Members
          </button> */}
          <button
            className="navigation_card_btn w-button !bg-red-700  text-white"
            onClick={(e) => handleLeave(userData._id)}
          >
            {" "}
            Leave Team
          </button>
        </div>{" "}
      </div>
      {/* <div className=" px-8">
        <div className="text-center mt-8 font-medium text-2xl">
          Team Name : {userData.teamName}
        </div>
        <div className="grid grid-cols-2 gap-8  mt-10 mx-auto w-[50rem] text-center">
          {userData?.members?.map((data) => {
            return (
              <UserCard
                key={data}
                data={data}
                userRole={data[eventName + "TeamRole"]}
              />
            );
          })}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={(e) => handleLeave(userData._id)}
            className="bg-red-700 w-40 text-white rounded-md p-2"
          >
            Leave Team
          </button>
          <ToastContainer />
        </div>
      </div> */}
    </>
  );
}
