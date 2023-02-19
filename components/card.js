"use client";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Card({ data, event }) {
  const [id, setEventid] = useState();
  const handleRegister = (e) => {
    if (!data) {
      e.preventDefault();
      console.log("clicked");
      localStorage.setItem("eventId", JSON.stringify(e.currentTarget.id));
      //console.log(e.currentTarget.id);
      signIn("google", {
        callbackUrl: "/getdetails",
      });
      return;
    } else {
      //user logged in => no need to store in localstorage
      //TODO: just hit post backend register route
    }
  };

  useEffect(() => {
    if (localStorage.getItem("eventId")) {
      if (data) {
        //TODO: POST REQUEST HERE to register event
        localStorage.removeItem("eventId");
      }
    }
    return;
  }, []);
  return (
    <>
      {" "}
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
              {data ? <>{event.title}</> : "YOu are not logged in"}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {event.description}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {event.date}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {event.location}
          </p>
          <button
            id={event._id}
            onClick={(e) =>
              !data ? (
                handleRegister(e)
              ) : (
                <>{toast(`${event.title} page i will show`)}</>
              )
            }
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {!data ? <>Register event</> : <>View Details</>}
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
