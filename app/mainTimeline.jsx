"use client";
import React, { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Card from "@/components/LandingPageCard";
import SignBtn from "@/components/SignBtn";

export default function MainTimeline({ eventsArray, session }) {
  const [registeredEventsArray, setregisteredEventsArray] = useState([]);
  const eventCodes = [
    "IMPETUS",
    "EHACK",
    "INNOVENTURE",
    "EVENT_4",
    "EVENT_5",
    "EVENT_6",
  ];

  useEffect(() => {
    session &&
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => response.json())

        .then((data) => setregisteredEventsArray(data.user.registeredEvents));
  }, [session, registeredEventsArray]);
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
                      isRegistered={registeredEventsArray[index + 1]}
                      session={session}
                      event={event}
                      key={event._id}
                      tit={eventCodes[index]}
                      id={index + 1}
                    />
                    ;
                  </VerticalTimelineElement>
                );
              })}

              <SignBtn registered={1}></SignBtn>
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
                      session={null}
                      event={event}
                      key={event._id}
                      tit={eventCodes[index]}
                      id={index + 1}
                      isRegistered={0}
                    />
                    ;
                  </VerticalTimelineElement>
                );
              })}
              <SignBtn registered={0}></SignBtn>
            </>
          )}
        </>
      </>
    </VerticalTimeline>
  );
}
