"use client";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import refreshData from "@/app/utils/refresh";
import "../../../styles/landing.css";

export default function RegButton({ userArray, check }) {
  const path = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const handleRegisterwithLogin = (id) => {
    // //console.log("clicked");
    localStorage.setItem("eventId", JSON.stringify(id));
    // //console.log(id);
    signIn("google", {
      callbackUrl: "/getdetails",
    });
    return;
  };

  function handleRegister(eventCode) {
    if (!session) {
      handleRegisterwithLogin(1);
    }
    if (session) {
      //console.log("here");
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/register`, {
        method: "PATCH",
        body: JSON.stringify({
          op: 0,
          eventCode: eventCode,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
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
            return false;
          }
          toast("Event registered Successfully");
          refreshData(router, path);
          router.push(`/schedule`);
          return true;
        });
      return true;
    }
  }

  useEffect(() => {
    //console.log("hello");
    if (localStorage.getItem("eventId")) {
      // //console.log(localStorage.getItem("eventId"));
      if (session) {
        handleRegister(localStorage.getItem("eventId")) &&
          localStorage.removeItem("eventId");
      }
    }
    refreshData(router, path);
    return;
  }, []);

  return (
    <button
      className="eventbtn w-button"
      onClick={() => {
        // //console.log(isRegistered);
        if (userArray) {
          //console.log(userArray);
          if (userArray[1]) {
            router.push("/manage/ehack");
          } else {
            //console.log("here");
            return handleRegister(1);
          }
        } else {
          //console.log("here");
          return handleRegister(1);
        }
      }}
    >
      {`${check ? "Go to Dashboard" : "Register Now"}`}
    </button>
  );
}
