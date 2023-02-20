import Timeline from "./Timeline";
import React from "react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

async function getData(session) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/user`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
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
  const userData = await getData(session);
  console.log(userData);
  console.log(session.user);
  const eventsArray = userData.user.registeredEvents;
  // console.log(eventsArray);
  return (
    <>
      <Timeline eventsArray={eventsArray} session={session}></Timeline>
      {/* {session ? (
          <>
            {eventsArray.map((event) => {
              return <Card data={session.user} event={event} key={event._id} />;
            })}
  
            <SignBtn registered={1}></SignBtn>
          </>
        ) : (
          <>
            {eventsArray.map((event) => {
              return <Card data={null} event={event} key={event._id} />;
            })}
            <SignBtn registered={0}></SignBtn>
          </>
        )} */}
    </>
  );
}
