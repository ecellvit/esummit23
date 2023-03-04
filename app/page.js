import { Inter } from "@next/font/google";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
const inter = Inter({ subsets: ["latin"] });
import MainTimeline from "../components/landing/mainTimeline";
async function getData() {
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
  const eventData = await getData();

  const eventsArray = await eventData.events;
  return (
    <>
     
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {session ? <>You are logged in</> : "YOu are not logged in"}
      </h5>
      <MainTimeline eventsArray={eventsArray}></MainTimeline>
    </>
  );
}
