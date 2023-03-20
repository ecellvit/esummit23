"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignBtn({ registered }) {
  const logoutHandler = () => {
    signOut({ callbackUrl: "/" });
  };

  const loginHandler = () => {
    signIn("google", {
      callbackUrl: "/getdetails",
    });
  };
  return (
    <>
      {" "}
      <button
        onClick={() => (registered === 0 ? loginHandler() : logoutHandler())}
        type="button"
        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      >
        {registered === 0 ? "Sign In" : "Sign Out"}
      </button>
    </>
  );
}
