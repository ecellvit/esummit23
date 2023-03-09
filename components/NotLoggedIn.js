"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// just a component to redirect back to root ("/")
export default function NotLoggedIn() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);
  return null;
}
