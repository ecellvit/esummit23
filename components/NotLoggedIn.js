"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";

// just a component to redirect back to root ("/")
export default function NotLoggedIn() {
  useEffect(() => {
    signIn("google", { callbackUrl: "/getdetails" })
  }, []);
}
