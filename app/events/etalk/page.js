import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";

import { getServerSession } from "next-auth";
import "../../../styles/landing.css";
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
  const check = session && userArray[3];
  return (
    <>
      <div className="event-sec">
        <div className="event_wrapper">
          <h1 className="event_h1">
            E-Talk
            <br />‍
          </h1>
          <p className="event_date">
            Date &amp; Time : 30th March 2023, 2:00 PM
          </p>
          <p className="event_para">
            Venue: Anna Auditorium
            <br />‍
          </p>
          <p className="form_para_small">
            A concrete talk session featuring well-known figures from the
            industry to provide you with a deeper understanding of the
            entrepreneurial journey. These insightful, captivating, and
            interactive speeches will act as a portal to their grind and hard
            work will definitely leave you inspired. The session will also be
            open to questions, thus furnishing the minds of the students with
            vivid ideas and a clearer picture of the entrepreneurship realm.
            <br />‍
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
    </>
  );
}
