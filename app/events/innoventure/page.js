import "../../../styles/landing.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";
import RegButton from "./RegButton";

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
  const check = session && userArray[2];
  return (
    <div className="event-sec">
      <div className="event_wrapper">
        <h1 className="event_h1">
          Innoventure
          <br />
        </h1>
        <p className="event_date ">Date &amp; Time: 2nd April 2023, 10:00 AM</p>
        <p className="event_para">
          Venue: Sarojini Naidu SJT
          <br />
        </p>
        <p className="form_para_small">
          A business simulation event which gives the participants an
          entrepreneurial ecosystem and platform to deploy their skills and
          ideas about the aspects of product development, business analysis,
          while inculcating knowledge about the trends in the current market and
          economic conditions faced by business owners of all sizes everyday.
          Innoventure is your portal to a world full of possibilities and
          creative problem solving.
          <br />
        </p>
        <div className="evet_price_wrap">
          <div className="price_wrap">
            {/* <p className="para_med_event">1st</p> */}
            <p className="para_bold_event">Prize Pool - Rs 30,000</p>
          </div>
          {/* <div className="price_wrap">
            <p className="para_med_event">2nd</p>
            <p className="para_bold_event">Coming Soon</p>
          </div>
          <div className="price_wrap">
            <p className="para_med_event">3rd</p>
            <p className="para_bold_event">Coming Soon</p>
          </div> */}
        </div>
        <RegButton check={check} userArray={userArray} />
      </div>
    </div>
  );
}
