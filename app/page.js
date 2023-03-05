import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import MainTimeline from "./mainTimeline";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/events`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getUserData(session) {
  console.log(session);
  if (session) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }
}

export default async function Home() {
  const session = await getServerSession(authOptions);

  const { events: eventsArray } = await getData();
  const userData = await getUserData(session);

  const userArray = userData ? userData.user.registeredEvents : [];

  return (
    <>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {session ? <>You are logged in </> : "You are not logged in"}
      </h5>
      <MainTimeline
        userArray={userArray}
        session={session}
        eventsArray={eventsArray}
      ></MainTimeline>
    </>
  );
}
