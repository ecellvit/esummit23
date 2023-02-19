import Image from "next/image";
import { Inter } from "@next/font/google";
import Card from "@/components/card";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
const inter = Inter({ subsets: ["latin"] });
import SignBtn from "@/components/SignBtn";
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

  const eventsArray = eventData.events;
  // console.log(eventsArray);
  return (
    <>
      {session ? (
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
      )}
    </>
  );
}
