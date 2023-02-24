"use client";

import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function DetailsForm({ accessTokenBackend }) {
  const lnameRef = useRef("");
  const fnameRef = useRef("");
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);

  const mobileNumberRef = useRef("");
  const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const regtest = /^[1-9][0-9][a-zA-Z]{3}[0-9]{4}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit btn clicked");
    if (
      mobileNumberRef.current.value === "" ||
      mobileNumberRef.current.value.length != 10 ||
      !re.test(String(mobileNumberRef.current?.value))
    ) {
      toast.error("🦄 Please fill 10 digits mobile number");
      return;
    } else if (fnameRef.current.value.trim() === "") {
      toast.error("Please Don't Leave Name as Blank!");
      return;
    }
    setisLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/details`, {
      method: "POST",
      body: JSON.stringify({
        firstName: fnameRef.current.value.trim(),
        lastName: lnameRef.current.value.trim(),
        mobileNumber: mobileNumberRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setisLoading(false);
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
        toast("Details submitted successfully");
        router.push("/");
        return;
      });
  };

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
      <form>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            First name
          </label>
          <input
            type="text"
            id="email"
            ref={fnameRef}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Enter first name here"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="lastn"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Last name
          </label>
          <input
            ref={lnameRef}
            type="last name here"
            id="lastn"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="mob"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Mobile Number
          </label>
          <input
            ref={mobileNumberRef}
            type="number"
            id="mob"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>

        <button
          onClick={(e) => handleSubmit(e)}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}
