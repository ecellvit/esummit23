import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";
import RegButton from "./RegButton";

import { getServerSession } from "next-auth";
import "../../../styles/landing.css";

async function getUserData(token) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessTokenBackend}`,
      "Access-Control-Allow-Origin": "*",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  let userArray;
  if (session) {
    const userData = await getUserData(session);
    userArray = userData?.user.registeredEvents;
  }
  //console.log(userArray);
  const check = session && userArray[4];
  return (
    <div className="event-sec">
      <div className="event_wrapper">
        <h1 className="event_h2">
          Trading Workshop
          <br />
        </h1>
        <p className="event_date ">
          Date &amp; Time : 01st April 2023, 4:00 PM
        </p>
        <p className="event_para">
          Venue : Ambedkar Auditorium
          <br />
        </p>
        <p className="form_para_small">
          Graphs, Candlestick, F&O, Fundamental and Technical Analysis are the
          buzzwords of today’s more progressive and aware youth interested in
          creating value and personal wealth. This trading workshop from the
          Industry Experts will pave the path for a stronger fundamental
          understanding of the stock market and the trends. This workshop will
          provide you a great insight of this equity market, from understanding
          strategies to patterns and everything in between; Trading Workshop is
          the place to be.
          <br />
        </p>
        {/* <div className="evet_price_wrap">
          <div className="price_wrap">
            <p className="para_med_event">1st</p>
            <p className="para_bold_event">Coming Soon</p>
          </div>
          <div className="price_wrap">
            <p className="para_med_event">2nd</p>
            <p className="para_bold_event">Coming Soon</p>
          </div>
          <div className="price_wrap">
            <p className="para_med_event">3rd</p>
            <p className="para_bold_event">Coming Soon</p>
          </div>
        </div> */}
        <RegButton check={check} userArray={userArray} />
      </div>
    </div>
  );
}
