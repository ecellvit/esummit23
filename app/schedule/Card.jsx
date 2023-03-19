"use client";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Card({
  session,
  event,
  id,
  tit,
  userArray,
  setUserArray,
}) {
  const router = useRouter();
  const path = usePathname();
  const refreshData = () => {
    router.replace(path);
  };
  function handleDeRegister(eventCode) {
    const newArray = userArray;
    console.log(eventCode);
    console.log(userArray);
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/register`, {
      method: "PATCH",
      body: JSON.stringify({
        op: 1,
        eventCode: eventCode,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
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
        // newArray.splice(eventCode, 1, 0);
        // console.log(newArray);
        // setUserArray(newArray);
        refreshData();
        toast("Event deregistered Successfully");

        return true;
      });
    return true;
  }

  function handleNavigation(title) {
    const route = title.toLowerCase();
    router.push(`/manage/${route}`);
  }

  return (
    <>
      {" "}
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
      <div className="timeline_wrapper">
        <h1 className="date">{event.date}</h1>
        <div
          className="card_cont"
          style={{
            backgroundImage: `url(${event.imgUrl})`,
          }}
        >
          <h1 className="card_h1">{event.title} </h1>
          <p className="card_para">{event.description}</p>
          <div className="card_time">
            <div className="card_l">
              <img src="clock.svg" alt="" className="svg_card" />
              <p className="timepara">{event.time} hours</p>
            </div>
            <div className="card_r">
              <img src="location.svg" alt="" className="svg_card" />
              <p className="timepara">{event.location}</p>
            </div>
          </div>
          <button
            className="card_btn w-button"
            onClick={(e) => handleDeRegister(id)}
          >
            <>DeRegister event</>
            <strong>→</strong>{" "}
          </button>
          <button
            className="btn_card_last w-button"
            onClick={(e) =>
              !session ? handleRegisterwithLogin(e, id) : handleNavigation(tit)
            }
          >
            Manage Event<strong>→</strong>{" "}
          </button>
        </div>
      </div>
    </>
  );
}
