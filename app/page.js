import { Inter } from "@next/font/google";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
const inter = Inter({ subsets: ["latin"] });

import Section1 from "./Landing/Section1";
import Section3 from "./Landing/Section3";
import Faq from "./Landing/Faq";
import "../styles/landing.css";
import Section2 from "./Landing/Section2";
import MainTimeline from "./mainTimeline";
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
      <Section1 />
      <Section2 />
      <Faq />
      <MainTimeline eventsArray={eventsArray}></MainTimeline>
      <Section3 />
    </>
  );
}
