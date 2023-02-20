"use client";
import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Card from "@/components/card";
import SignBtn from "@/components/SignBtn";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/events`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const session = await getServerSession(authOptions);
  const eventData = await getData();
  console.log(eventData);

  const eventsArray = eventData.events;
  console.log(eventsArray);

  return res.json();
}
export default function Timeline({ eventsArray, session }) {
  console.log(session);
  return (
    <VerticalTimeline lineColor={"black"}>
      <>
        <>
          {session ? (
            <>
              {eventsArray.map((event) => {
                return (
                  <VerticalTimelineElement
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
                    <Card data={session.user} event={event} key={event._id} />;
                  </VerticalTimelineElement>
                );
              })}

              <SignBtn registered={1}></SignBtn>
            </>
          ) : (
            <>
              {eventsArray.map((event) => {
                return (
                  <VerticalTimelineElement
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
                    <Card data={null} event={event} key={event._id} />;
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
