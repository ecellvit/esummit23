"use client";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshData from "@/app/utils/refresh";
import "../styles/landing.css";
export default function CreateTeam({ session, eventName }) {
  eventName = eventName.toLowerCase();
  const teamName = useRef("");
  const router = useRouter();
  const path = usePathname();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamName.current.value.trim() === "") {
      toast.error("Please Don't Leave Name as Blank!");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/${eventName}/team`, {
      method: "POST",
      body: JSON.stringify({
        teamName: teamName.current.value.trim(),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      cache: "no-store",
    })
      .then((data) => data.json())
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
        toast("Details submitted successfully");
        return;
      });
  };

  // infinity spin center
  // name on dash

  return (
    <>
      {" "}
      <div className="ehack_cont rounded-md  !bg-slate-200 ">
        <h1 className="join_h1 mt-10">Join a Team</h1>
        <button
          onClick={(e) => {
            router.push(`/manage/${eventName}/join-teams`);
          }}
          className="handleteam w-button"
        >
          Find Team
        </button>
        <h1 className="join_h1 bold"><br></br>Or</h1>
        <h1 className="join_h1">Create Your Team</h1>
        <div className="w-form">
          <input
            type="text"
            className="team w-input rounded-lg"
            name="name"
            ref={teamName}
            data-name="Name"
            placeholder="Enter Team Name"
            id="name"
          />
        </div>
        <button
          type="button"
          onClick={(e) => handleSubmit(e)}
          className="handleteam w-button "
        >
          Create Team
        </button>
        <ToastContainer />
      </div>{" "}
      {/* <div className=" flex justify-center text-center pt-20">

        <div className="w-1/3 md:w-[50%] rounded-md p-4 bg-slate-200 flex justify-center">
          <div className="w-1/2">
            <div className="text-3xl text-black mt-4">Join a Team</div>
            <button
              onClick={(e) => {
                router.push(`/manage/${eventName}/join-teams`);
              }}
              type="button"
              className="mt-4 text-black bg-[#53B3B9] hover:text-black hover:bg-[#43A3A9] focus:ring-4 focus:outline-none dark:focus:ring-blue-800 w-2/3 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2"
            >
              Find Team
            </button>

            <h2 className="text-4xl font-bold my-8">OR</h2>
            <div className="my-2">
              <div className="text-3xl text-black mt-3">
                Create your own Team
              </div>
              <input
                type="text"
                ref={teamName}
                className="bg-gray-50 border my-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Team Name"
                required
              ></input>
              <button
                type="button"
                onClick={(e) => handleSubmit(e)}
                className="mt-8 text-black bg-[#53B3B9] hover:bg-[#43A3A9] hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-2/3 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2"
              >
                Create Team
              </button>
              <ToastContainer />
            </div>
          </div>
        
        </div>
      </div> */}
    </>
  );
}
