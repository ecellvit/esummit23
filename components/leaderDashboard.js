"use client";
import MemberCard from "./memberCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshData from "@/app/utils/refresh";
import { usePathname, useRouter } from "next/navigation";

export default function LeaderDashboard({ userData, eventName, session }) {
  const router = useRouter();
  const path = usePathname();

  // const userData = {
  //   _id:123,
  //   members:[
  //     {data:"asdf", eventName:"fdsa", session:session}
  //   ]
  // }

  function handleDelete(teamId) {
    eventName = eventName.toLowerCase();
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/${eventName}/team/${teamId}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error?.errorCode) {
          console.log(data.error);
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
    <div className="min-h-screen w-full bg-white text-black py-10 px-8">
      <h1 className="font-md text-4xl">{eventName} dashboard</h1>
      {userData?.members?.length < 4 ? (
        <div className="flex justify-center mt-16">
          <button
            onClick={(e) => {
              eventName = eventName.toLowerCase();
              router.push(`/manage/${eventName}/add-members`);
            }}
            className="bg-green-700 w-40 rounded-md p-2"
          >
            Add Members
          </button>
        </div>
      ) : (
        <div></div>
      )}
      <div className="grid grid-cols-2 gap-8  mt-20 mx-auto w-[70rem] text-center">
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
      <div className="flex justify-center mt-16">
        <button
          onClick={(e) => handleDelete(userData._id)}
          className="bg-red-700 w-40 rounded-md p-2"
        >
          Delete Team
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}
