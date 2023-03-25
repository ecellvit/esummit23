"use client";
import React from "react";
import { useRouter } from "next/navigation";

function UserNav({ eventName }) {
  const router = useRouter();
  eventName = eventName.toLowerCase();
  return (
    <>
      {" "}
      <div className="subnav">
        <div className="left_sub ml-[-1.2rem] md:ml-[6rem]  lg:ml-[-3.4rem]">
          <button
            onClick={() => {
              router.push(`/manage/${eventName}`);
            }}
            className="managebtn w-button"
          >
            Back
          </button>
          <h1 className="subnav_h1">
            {" "}
            {eventName === "ehack" ? "E-Hack" : eventName.toUpperCase()}
          </h1>
        </div>
        <div className="right_subnav">
          <button
            onClick={(e) => router.push(`/manage/${eventName}/user-sent`)}
            className="send w-button"
          >
            Sent
          </button>
          <button
            onClick={(e) => {
              router.push(`/manage/${eventName}/user-received`);
            }}
            className="recieved w-button mr-[1.5rem] "
          >
            Received
          </button>
        </div>
      </div>
    </>
  );
}
{
  /* <div>
<div>
  <nav
    className="flex-no-wrap sticky top-0 flex w-full items-center justify-around bg-neutral-100 py-4 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start"
    data-te-navbar-ref
  >
    <div className="w-full flex">
      <div className="flex ml-5">
        {
          <button
            onClick={() => {
              router.push(`/manage/${eventName}`);
            }}
            className="flex bg-[#53B3B9] items-center rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
          >
            Back
          </button>
        }
      </div>
      <div className="flex-1 ml-[45vw] text-xl font-semibold">
        {eventName.toUpperCase()}
      </div>
      <div className="relative flex justify-end pr-10">
        <div className="flex justify-center space-x-2 ml-2 ">
          <div>
            <button
              onClick={(e) =>
                router.push(`/manage/${eventName}/user-sent`)
              }
              data-te-ripple-init
              data-te-ripple-color="light"
              className="flex bg-[#53B3B9] items-center rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                  clipRule="evenodd"
                />
              </svg>
           
              <div className="text-black">Sent</div>
            </button>
          </div>
        </div>
        <div className="flex justify-center space-x-2 ml-2">
          <div>
            <button
              onClick={(e) => {
                router.push(`/manage/${eventName}/user-received`);
              }}
              data-te-ripple-init
              data-te-ripple-color="light"
              className="flex  bg-[#53aab9] items-center rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-black">Received</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</div>
</div> */
}
export default UserNav;
