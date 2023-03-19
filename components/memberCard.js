"use client";
import refreshData from "@/app/utils/refresh";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

function MemberCard({ session, data, teamId, eventName }) {
  const router = useRouter();
  const path = usePathname();

  const userRole = data[eventName + "TeamRole"];

  function handleRemove(teamId) {
    eventName = eventName.toLowerCase();
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/${eventName}/remove/${teamId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ userId: data._id }),
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
        }
        refreshData(router, path);
        // toast("Team member removed Successfully");
      });
  }
  return (
    <div className="h-40 rounded-2xl hover:scale-105 ease-linear bg-white">
      <h2 className="mt-5">{data.email}</h2>
      {userRole ? (
        <button
          onClick={(e) => handleRemove(teamId)}
          className="bg-red-700 mt-40 w-40 rounded-md p-2"
        >
          Remove
        </button>
      ) : (
        <h2>Leader</h2>
      )}
      <ToastContainer />
    </div>
  );
}

export default MemberCard;
