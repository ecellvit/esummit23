"use client";
// import React, { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Card from "@/app/LandingPageCard";

export default function MainTimeline({ userArray, eventsArray, session }) {
  // const [userArray, setuserArray] = useState([]);
  // const [handler, setHandler] = useState(false);
  // const [regHandler, setegHandler] = useState(false);
  const eventCodes = [
    "IMPETUS",
    "EHACK",
    "INNOVENTURE",
    "EVENT_4",
    "EVENT_5",
    "EVENT_6",
  ];

  // this can be fetched on ssr
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
  //       .then((data) => setuserArray(data.user.registeredEvents));
  // }, [handler, session]);

  return (
    <VerticalTimeline lineColor={"black"}>
      <>
        <>
          {session ? (
            <>
              {eventsArray.map((event, index) => {
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
                      isRegistered={userArray[index]}
                      event={event}
                      key={event._id}
                      tit={eventCodes[index]}
                      id={index}
                    />
                  </VerticalTimelineElement>
                );
              })}
            </>
          ) : (
            <>
              {eventsArray.map((event, index) => {
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
                      event={event}
                      key={event._id}
                      tit={eventCodes[index]}
                      id={index}
                      isRegistered={0}
                    />
                  </VerticalTimelineElement>
                );
              })}
            </>
          )}
        </>
      </>
    </VerticalTimeline>
  );
}
