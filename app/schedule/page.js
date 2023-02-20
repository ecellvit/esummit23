import Timeline from "./Timeline";
import React from "react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import NotLoggedIn from "../NotLoggedIn";

async function getEventsData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/events`,
    {
      method: "GET",
    },
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const eventData = await getEventsData();

  const eventsArray = await eventData.events;
  if (session) {
    return (
      <>
        <Timeline
          eventsArray={eventsArray}
          // userArray={userArray}
          session={session}
        ></Timeline>
      </>
    );
  } else {
    return <NotLoggedIn />;
  }
}
