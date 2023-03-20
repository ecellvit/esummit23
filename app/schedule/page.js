import Timeline from "./Timeline";
import React from "react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import "../../styles/landing.css";
async function getUserData(session) {
  if (session) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }
}

async function getEventsData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/events`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const eventData = await getEventsData();
  const session = await getServerSession(authOptions);
  const eventsArray = eventData.events;
  const userData = await getUserData(session);
  const userArray = userData?.user.registeredEvents;

  // //console.log(userArray);
  return (
    <>
      <Timeline
        userArray={userArray}
        eventsArray={eventsArray}
        session={session}
      ></Timeline>
    </>
  );
}
