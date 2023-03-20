import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";

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
  console.log(userArray);
  const check = session && userArray[4];
  return (
    <div className="event-sec">
      <div className="event_wrapper">
        <h1 className="event_h1">
          Trading Workshop
          <br />‍
        </h1>
        <p className="event_date">Date &amp; Time</p>
        <p className="event_para">
          Venue
          <br />‍
        </p>
        <p className="form_para_small">
          A concrete talk session featuring well-known figures from the industry
          to provide you with a deeper understanding of the entrepreneurial
          journey. These insightful, captivating, and interactive speeches will
          act as a portal to their grind and hard work will definitely leave you
          inspired. The session will also be open to questions, thus furnishing
          the minds of the students with vivid ideas and a clearer picture of
          the entrepreneurship realm.
          <br />‍
        </p>
        <div className="evet_price_wrap">
          <div className="price_wrap">
            <p className="para_med_event">1st</p>
            <p className="para_bold_event">10,000</p>
          </div>
          <div className="price_wrap">
            <p className="para_med_event">2nd</p>
            <p className="para_bold_event">10,000</p>
          </div>
          <div className="price_wrap">
            <p className="para_med_event">3rd</p>
            <p className="para_bold_event">10,000</p>
          </div>
        </div>
        <Link
          className="eventbtn w-button"
          href={`${check ? "/schedule" : "/"}`}
        >
          {`${check ? "Go to Schedule" : "Go to Dashboard"}`}
        </Link>
      </div>
    </div>
  );
}
