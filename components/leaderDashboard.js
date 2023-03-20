"use client";
import MemberCard from "./memberCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshData from "@/app/utils/refresh";
import { usePathname, useRouter } from "next/navigation";
import "../styles/landing.css";
export default function LeaderDashboard({ userData, eventName, session }) {
  const router = useRouter();
  const path = usePathname();

  function handleDelete(teamId) {
    eventName = eventName.toLowerCase();
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/${eventName}/team/${teamId}`, {
      method: "DELETE",

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
          return;
        }
        refreshData(router, path);
        toast("Team deleted Successfully");
      });
  }

  return (
    <>
      {/* <div className=" px-8">
        <div className="text-center mt-8 font-medium text-2xl">
          Team Name : {userData.teamName}
        </div>
        <div className="grid grid-cols-2 gap-8  mt-10 mx-auto w-[50rem] text-center">
          {userData?.members?.map((data) => {
            return (
              <MemberCard
                key={data}
                data={data}
                teamId={userData._id}
                eventName={eventName}
                session={session}
              />
            );
          })}
        </div>
        {userData?.members?.length < 4 ? (
          <div className="flex justify-center mt-10">
            <button
              onClick={(e) => {
                eventName = eventName.toLowerCase();
                router.push(`/manage/${eventName}/add-members`);
              }}
              className="bg-white w-40 rounded-md p-2"
            >
              Add Members
            </button>
          </div>
        ) : (
          <div></div>
        )}
        <div className="flex justify-center mt-8">
          <button
            onClick={(e) => handleDelete(userData._id)}
            className="bg-red-700 w-40 text-white rounded-md p-2"
          >
            Delete Team
          </button>
          <ToastContainer />
        </div>
      </div>{" "} */}
      <div className="teams_sec">
        <ToastContainer />
        <div className="mt-[10px]">
          <div className="w-form text-center w-[100%] text-[2rem]">
            Team Name : {userData.teamName}
          </div>
        </div>
        <div className="team_card_holder">
          <div className="teamcard_cont">
            {userData?.members?.map((data) => {
              return (
                <MemberCard
                  key={data}
                  data={data}
                  teamId={userData._id}
                  eventName={eventName}
                  session={session}
                />
              );
            })}
          </div>
        </div>
        <div className="navigation_cont ">
          {userData?.members?.length < 4 ? (
            <button
              onClick={(e) => {
                eventName = eventName.toLowerCase();
                router.push(`/manage/${eventName}/add-members`);
              }}
              className="navigation_card_btn w-button"
            >
              Add Members
            </button>
          ) : (
            <div></div>
          )}
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
            className="navigation_card_btn w-button !bg-red-700 w-40 text-white"
            onClick={(e) => handleDelete(userData._id)}
          >
            {" "}
            Delete Team
          </button>
        </div>{" "}
      </div>
    </>
  );
}
