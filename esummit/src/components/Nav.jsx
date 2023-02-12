import React, { useEffect, useState } from "react";
import cart from "./cart.png";
import { useSelector } from "react-redux";

export default function Nav() {
  const cartItems = useSelector((state) => state.cart.ids);
  const cartLength = cartItems.length;
  // const { data: session, status } = useSession();
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const END_TIME = new Date(2023, 3, 5, 23, 59, 59);

  useEffect(() => {
    let timer = setInterval(() => {
      let now = new Date();
      let remainingTime = END_TIME - now;
      if (remainingTime < 0) {
        clearInterval(timer);
        return;
      }
      let dys = Math.floor(remainingTime / 1000 / 60 / 60 / 24);
      let hrs = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
      let mins = Math.floor(remainingTime / 1000 / 60) % 60;
      let secs = Math.floor(remainingTime / 1000) % 60;

      setDays(dys);
      setHours(hrs);
      setMinutes(mins);
      setSeconds(secs);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [END_TIME]);

  return (
    <>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
          <a href="" class="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-6 mr-3 sm:h-9"
              alt="logo"
            />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Esummit
            </span>
          </a>
          <div class="flex items-center">
            <a
              href="/"
              class="mr-6 text-sm font-medium text-gray-500 dark:text-white hover:underline"
            >
              Home
            </a>

            <a
              href="#"
              class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Login
            </a>
            <a
              //   href="#"
              class="ml-6 text-sm font-medium text-white hover:underline"
            >
              {/* <img class="w-8 h-8 rounded-full" src={cart} alt="Cart" /> */}
              Cart Count- {cartLength}
            </a>
          </div>
        </div>
      </nav>
      <nav class="bg-gray-50 dark:bg-gray-700">
        <div class="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
          <div class="flex items-center justify-center text-gray-900 dark:text-white hover:underline">
            Registration Ending in {days}:{hours}:{minutes}:{seconds}
            {/* <ul class="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
              <li>
                <a
                  href="#"
                  class="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  REGISTRATIONS ENDED
                </a>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
    </>
  );
}
