"use client";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import refreshData from "../utils/refresh";

export default function NewCard({
  event,
  id,
  isRegistered,
  userArray,
  eventsArray,
}) {
  const path = usePathname();
  const router = useRouter();
  //console.log("event id !!!!", id);
  //console.log("event Name !!!!", event);
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
      handleRegisterwithLogin(id);
    }


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

  useEffect(() => {
    console.log(localStorage.getItem("eventId"));
    if (localStorage.getItem("eventId")) {
      console.log(session);
      console.log(localStorage.getItem("eventId"));
      if (session) {
        if (localStorage.getItem("eventId") == 2) {
          if (userArray[0] === 0) {
            handleRegister(localStorage.getItem("eventId")) &&
              localStorage.removeItem("eventId");
          } else {
            console.log("Events Clashing");
            toast("Event's Clashing");
            localStorage.removeItem("eventId");
          }
        }
        if (localStorage.getItem("eventId") == 0) {
          if (userArray[2] === 0) {
            handleRegister(localStorage.getItem("eventId")) &&
              localStorage.removeItem("eventId");
          } else {
            console.log("Events Clashing");
            toast("Event's Clashing");
            localStorage.removeItem("eventId");
          }
        }

        if (
          localStorage.getItem("eventId") == 1 ||
          localStorage.getItem("eventId") == 3 ||
          localStorage.getItem("eventId") == 4
        ) {
          handleRegister(localStorage.getItem("eventId")) &&
            localStorage.removeItem("eventId");
        }
      }
    }
    refreshData(router, path);
    return;
  }, []);

  return (
    <>
      <div className="timeline_wrapper">
        <h1 className="date">{event.date}</h1>
        <div
          className={`card_cont`}
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
            onClick={() => {
              // console.log(isRegistered);
              // if (event === eventsArray[4]) {
              //   return;
              // }
              

              if (id === 0 && userArray !== undefined && userArray[2] === 1) {
                return;
              }
              if (id === 2 && userArray !== undefined && userArray[0] === 1) {
                return;
              }
              if (isRegistered === 0) {
                return handleRegister(id);
              }
              router.push("/schedule");
            }}
          >
            {!session ? (
              // (event === eventsArray[4]) ? <>Maximum Capacity Reached</> : <>Register event</>
              <>Register event</>
            ) : (event != eventsArray[4]) ? (id === 0 ? (
              <>
                {
                  isRegistered === 0 ? (
                    userArray[2] != 1 ? (
                      <>
                        Register<strong>→</strong>{" "}
                      </>
                    ) : (
                      <>Clashing with Innoventure</>
                    )
                  ) : (
                    <>
                      Go to schedule<strong>→</strong>{" "}
                    </>
                  )}
              </>
            ) : id === 2 ? (
              <>
                {isRegistered === 0 ? (
                  userArray[0] != 1 ? (
                    <>
                      Register<strong>→</strong>{" "}
                    </>
                  ) : (
                    <>Clashing with Impetus</>
                  )
                ) : (
                  <>
                    Go to schedule<strong>→</strong>{" "}
                  </>
                )}
              </>
            ) : (
              <>
                {isRegistered === 0 ? (
                  <>
                    Register<strong>→</strong>{" "}
                  </>
                ) : (
                  <>
                    Go to schedule<strong>→</strong>{" "}
                  </>
                )}
              </>
            // )) : (<>Maximum Capacity Reached</>)}
            )) : (<> Go to schedule<strong>→</strong>{" "}</>)}
            {/* <strong>→</strong>{" "} */}
          </button>
          {/* <button className="btn_card_last w-button">
                        View Details<strong>→</strong>{" "}
                      </button> */}
        </div>
      </div>
    </>
  );
}
