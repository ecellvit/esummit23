import React from "react";
import { useRouter } from "next/navigation";

function LeaderNav({ eventName }) {
  eventName = eventName.toLowerCase();
  const router = useRouter();
  return (
    <div>
      <div>
        <nav
          className="flex-no-wrap sticky top-0 flex w-full bg-neutral-100 py-4 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-end  "
          data-te-navbar-ref
        >
          <div className="w-full">
            <div className="relative flex justify-end pr-10">
              <div className="flex justify-center space-x-2 ml-2 ">
                <div>
                  <button
                    onClick={(e) =>
                    router.push(`/manage/${eventName}/leader-sent`)
                  }
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className="flex bg-blue-400 items-center rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg">
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
                    {/* <span className="absolute -mt-2.5 ml-2 rounded-full bg-red-700 py-0 px-1.5 text-xs text-white">
                    1
                  </span> */}
                    <div className="text-black">Sent</div>
                  </button>
                </div>
                </div>
              <div className="flex justify-center space-x-2 ml-2">
                <div>
                  <button
                  onClick={(e) =>
                    router.push(`/manage/${eventName}/received-join-request`)
                  }

                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className="flex  bg-blue-400 items-center rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg">
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
    </div>
  );
}

export default LeaderNav;
