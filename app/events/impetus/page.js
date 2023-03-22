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
    //console.log(userData);
    userArray = userData?.user.registeredEvents;
  }
  const check = session && userArray[0];
  return (
    <>
      <div className="event-sec">
        <div className="event_wrapper">
          <h1 className="event_h1">
            Impetus
            <br />
          </h1>
          <p className="event_date ">
            Date &amp; Time : 02nd April 2023, 10:00 AM
          </p>
          <p className="event_para">
            Venue : TT Gallery-2
            <br />
          </p>
          <p className="form_para_small">
            {`A pitch-deck competition that would involve crafting unique startup ideas and business models to impress a jury of experienced professionals. With numerous startups flourishing in India, this event seeks to nurture the growing spirit of entrepreneurship within young minds. Making your team, investors and users believe in your vision goes a long way in building a successful product with a strong foundation. From getting funded to deploying the first iteration of your product to the public, there’s only one road that’s taken; Pitching`}
            <br />
          </p>
          <div className="evet_price_wrap">
            <div className="price_wrap">
              <p className="para_bold_event">Prize Pool - Rs 25,000</p>
              {/* <p className="para_bold_event">Coming Soon</p> */}
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
    </>
  );
}
