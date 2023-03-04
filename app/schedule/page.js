import Timeline from "./Timeline";
import React from "react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

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
  const eventData = await getEventsData();

  const eventsArray = await eventData.events;
  return (
    <>
      <Timeline
        eventsArray={eventsArray}
      ></Timeline>
    </>
  );
}
