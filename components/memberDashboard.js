"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshData from "@/app/utils/refresh";
import UserCard from "./userCard";
import { usePathname, useRouter } from "next/navigation";

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
        // toast("Team left Successfully");
      });
  }

  return (
    <div className="min-h-screen w-full bg-neutral-100 text-white py-10 px-8">
      <h1 className="font-md text-4xl">{eventName} dashboard</h1>

      <div className="grid grid-cols-2 gap-8  mt-20 mx-auto w-[70rem] text-center">
        {userData?.members?.map((data) => {
          return (
            <UserCard key={data} data={data} userRole={data[eventName + "TeamRole"]} />
          );
        })}
      </div>
      <div className="flex justify-center mt-16">
        <button
          onClick={(e) => handleLeave(userData._id)}
          className="bg-red-700 w-40 rounded-md p-2"
        >
          Leave Team
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}
