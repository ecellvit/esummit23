"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotLoggedIn() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);
  return null;
}
