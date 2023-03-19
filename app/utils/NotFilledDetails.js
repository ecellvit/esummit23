"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// just a component to redirect back to root ("/")
export default function NotFilledDetails() {
  const router = useRouter();

  useEffect(() => {
    router.push("/getdetails");
  }, []);
  return null;
}
