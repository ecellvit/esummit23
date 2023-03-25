"use client";
import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import refreshData from "../utils/refresh";

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

  let whatsappLink;
  if (event.title === "Innoventure") {
    whatsappLink = "https://chat.whatsapp.com/GMzHaKmhcvA9TPLWrlpG4Z";
  } else if (event.title === "Impetus") {
    whatsappLink = "https://chat.whatsapp.com/KZAspzBzz6vG49ZPIwWt2w";
  } else if (event.title === "E-Talk") {
    whatsappLink = "https://chat.whatsapp.com/Gzlla7Uc89HK5f8n4cybXr";
  } else if (event.title === "E-Hack") {
    whatsappLink = "https://chat.whatsapp.com/FIybjLHMJiPK7KSgjTTl8Y";
  } else if (event.title === "Trading Workshop") {
    whatsappLink = "https://chat.whatsapp.com/KLM4P8UksZy7ZuIjjb8HCF";
  } else {
    whatsappLink = "";
  }

  function handleDeRegister(eventCode) {
    const newArray = userArray;
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
        // //console.log(newArray);
        // setUserArray(newArray);
        refreshData(router, path);
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
          <div className="card_btn w-button mb-4">
            <a href={whatsappLink}>Join Whatsapp Group</a>
          </div>
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
            <>De-Register event</>
            <strong>→</strong>{" "}
          </button>

          <button
            className={`btn_card_last w-button ${
              (id == 4 || id === 3) && "hidden"
            }`}
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
