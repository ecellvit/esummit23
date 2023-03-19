import Section1 from "./Landing/Section1";
import Section3 from "./Landing/Section3";
import "../styles/landing.css";
import Section2 from "./Landing/Section2";
// import MainTimeline from "./mainTimeline";
import Section4 from "./Landing/Section4";
import Section6 from "./Landing/Section6";
import Faqsection from "./Landing/Faqsection";
import Header from "./Landing/Header";
import Footer from "./Landing/Footer";
import Temp from "./Landing/temp";
import DetailsForm from "./getdetails/DetailsForm";
import { getSession } from "@/lib/session";
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

async function getUserData(session) {
  console.log("---------------------------!!!!", session);
  if (session) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    });
    console.log(res)
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }
}

export default async function Home() {
  const eventData = await getData();
  const eventsArray = await eventData.events;
  const session = await getSession();
  const userData = session && await getUserData(session);
  const userArray = session ? userData?.user.registeredEvents : null;
  console.log(userArray);
  return (
    <>
      <Header></Header>
      <Section1 />
      <Section2 />
      <Section3 />
      {/* <MainTimeline eventsArray={eventsArray}></MainTimeline> */}
      <Temp eventsArray={eventsArray} userArray={userArray} session={session} />
      <Section4 />
      <Faqsection></Faqsection>
      <Section6></Section6>
      {/* <DetailsForm></DetailsForm> */}
      <Footer></Footer>
    </>
  );
}
