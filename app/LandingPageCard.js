"use client";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import refreshData from "./utils/refresh";

export default function Card({ event, id, isRegistered, tit }) {
  const path = usePathname();
  const router = useRouter();

  const { data: session, status } = useSession();
  const handleRegisterwithLogin = (id) => {
    console.log("clicked");
    localStorage.setItem("eventId", JSON.stringify(id));
    console.log(id);
    signIn("google", {
      callbackUrl: "/getdetails",
    });
    return;
  };

  function handleRegister(eventCode) {
    if (!session) {
      handleRegisterwithLogin(id);
    }

    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/register`, {
      method: "PATCH",
      body: JSON.stringify({
        op: 0,
        eventCode: eventCode,
      }),
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
          return false;
        }
        toast("Event registered Successfully");
        refreshData(router,path);

        return true;
      });
    return true;
  }

  useEffect(() => {
    if (localStorage.getItem("eventId")) {
      console.log(localStorage.getItem("eventId"));
      if (session) {
        handleRegister(localStorage.getItem("eventId")) &&
          localStorage.removeItem("eventId");
      }
    }
    refreshData();

    return;
  }, []);

  // if (localStorage.getItem("eventId")) {
  //   console.log(localStorage.getItem("eventId"));
  //   if (session) {
  //     handleRegister(localStorage.getItem("eventId")) &&
  //       localStorage.removeItem("eventId");
  //   }
  // }
  console.log(isRegistered);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg" src="" alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {tit}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {event.description}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {event.date} {isRegistered}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {event.location}
          </p>
          <button
            onClick={() => {
              console.log(isRegistered);
              if (isRegistered === 0) {
                return handleRegister(id);
              }
              router.push("/schedule");
            }}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {!session ? (
              <>Register event</>
            ) : (
              <>{isRegistered === 0 ? <>Register</> : <>Go to schedule</>}</>
            )}
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <button
            onClick={(e) => <>{toast(`${event.title} page i will show`)}</>}
            className="inline-flex items-center px-3 ml-10 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View Details
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
