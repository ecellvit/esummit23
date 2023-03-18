"use client";
// import React, { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Card from "@/app/LandingPageCard";
import NewTimeline from "./Landing/NewTimeline";

export default function MainTimeline({
  userArray,
  eventsArray,
  session,
  setUserArray,
}) {
  return (
    <>
      <NewTimeline></NewTimeline>
      <VerticalTimeline lineColor={"black"}>
        <>
          <>
            {session ? (
              <>
                {eventsArray.map((event, index) => {
                  console.log(userArray[index]);
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
                        id={index}
                        isRegistered={-1}
                      />
                    </VerticalTimelineElement>
                  );
                })}
              </>
            )}
          </>
        </>
      </VerticalTimeline>
    </>
  );
}
