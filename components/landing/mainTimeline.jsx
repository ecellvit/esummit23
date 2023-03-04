"use client";
import React, { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Card from "@/components/landing/LandingPageCard";
import { signIn, signOut, useSession } from "next-auth/react";
import SignBtn from "@/components/SignBtn";
export default function MainTimeline({ eventsArray }) {
  const { data: session, status } = useSession();
  const [registeredEventsArray, setregisteredEventsArray] = useState([]);
  const [handler, setHandler] = useState(false);
  const [regHandler, setegHandler] = useState(false);
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
  }, [handler, session]);
  return (

  
    <VerticalTimeline lineColor={"black"}>
      <>
        <>
          {status === "authenticated" ? (
           
            <> {registeredEventsArray}
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
                      isRegistered={(registeredEventsArray[index])}
                   
                      setHandler={setHandler}
                      regHandler={regHandler}
                      setegHandler={setegHandler}
                      handler={handler}
                      event={event}
                      key={event._id}
                      tit={eventCodes[index]}
                      id={index}
                    />
                    
                  </VerticalTimelineElement>
                );
              })}

              <SignBtn registered={1}></SignBtn>
            </>
          ) : (
            <>
              {eventsArray.map((event, index) => {
                console.log(event);
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
                      setHandler={setHandler}
                      regHandler={regHandler}
                      setegHandler={setegHandler} 
                      handler={handler}
                      id={index}
                      isRegistered
                    />
                    
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
