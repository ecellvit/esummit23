import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import MainTimeline from "../components/landing/mainTimeline";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/events`,
    {
      method: "GET",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const session = await getServerSession(authOptions);

  const { events: eventsArray } = await getData();

  return (
    <>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {session ? <>You are logged in </> : "You are not logged in"}
      </h5>
      <MainTimeline session={session} eventsArray={eventsArray}></MainTimeline>
    </>
  );
}
