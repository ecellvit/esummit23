"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import Card from "./Card";

export default function Timeline({ userArray, eventsArray, session }) {
  // const { data: session, status } = useSession();
  // console.log(user);
  // const [userArray, setUserArray] = useState(user.registeredEvents);
  // console.log(userArray);
  // async function getData() {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_SERVER}/api/events`,
  //     {
  //       method: "GET",
  //     }
  //   );
  //   if (!res.ok) {
  //     throw new Error("Failed to fetch data");
  //   }

  //   return res.json();
  // }
  // useEffect(() => {
  //   session &&
  //     fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${session.accessTokenBackend}`,
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     })
  //       .then((response) => response.json())

  //       .then((data) => setUserArray(data.user.registeredEvents));
  // }, [handler, session]);

  console.log(userArray);
  const eventCodes = [
    "IMPETUS",
    "EHACK",
    "INNOVENTURE",
    "EVENT_4",
    "EVENT_5",
    "EVENT_6",
  ];

  // console.log(eventsArray);
  if (userArray.includes(1)) {
    return (
      <VerticalTimeline lineColor={"black"}>
        <>
          <>
            <>
              {userArray.map((registered, index) => {
                if (registered === 1) {
                  console.log(eventsArray[index]);
                  console.log(registered + " " + index);

                    return (
                      <VerticalTimelineElement
                        key={index}
                        contentStyle={{
                          background: "rgb(33, 150, 243)",
                          color: "#000",
                        }}
                        contentArrowStyle={{
                          borderRight: "7px solid  rgb(33, 150, 243)",
                        }}
                        iconStyle={{
                          background: "rgb(33, 150, 243)",
                          color: "#000",
                        }}
                      >
                        <Card
                          event={eventsArray[index]}
                          session={session}
                          tit={eventCodes[index]}
                          id={index}
                          // setUserArray={setUserArray}
                          userArray={userArray}
                        />
                      </VerticalTimelineElement>
                    );
                  }
                }
              })}
            </>
          </>
        </>
      </VerticalTimeline>
    );
  } else {
    return <div>Please register something</div>;
  }
}
