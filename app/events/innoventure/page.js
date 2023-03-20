import "../../../styles/landing.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";

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
    <div class="event-sec">
      <div class="event_wrapper">
        <h1 class="event_h1">
          Innoventure
          <br />‍
        </h1>
        <p class="event_date">Date &amp; Time</p>
        <p class="event_para">
          Venue
          <br />‍
        </p>
        <p class="form_para_small">
          A business simulation event which gives the participants an
          entrepreneurial ecosystem and platform to deploy their skills and
          ideas about the aspects of product development, business analysis,
          while inculcating knowledge about the trends in the current market and
          economic conditions faced by business owners of all sizes everyday.
          Innoventure is your portal to a world full of possibilities and
          creative problem solving.
          <br />‍
        </p>
        <div class="evet_price_wrap">
          <div class="price_wrap">
            <p class="para_med_event">1st</p>
            <p class="para_bold_event">10,000</p>
          </div>
          <div class="price_wrap">
            <p class="para_med_event">2nd</p>
            <p class="para_bold_event">10,000</p>
          </div>
          <div class="price_wrap">
            <p class="para_med_event">3rd</p>
            <p class="para_bold_event">10,000</p>
          </div>
        </div>

        <Link
          className="eventbtn w-button"
          href={`${check ? "/manage/innoventure" : "/"}`}
        >
          {`${check ? "Go to Dashboard" : "Go to Register"}`}
        </Link>
      </div>
    </div>
  );
}
