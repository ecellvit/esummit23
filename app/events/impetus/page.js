import "../../../styles/landing.css";
import { useRouter } from "next/navigation";
import { Link } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

async function getUserData(token) {
  const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/user`,
      {
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.accessTokenBackend}`,
              'Access-Control-Allow-Origin': '*',
          },
          cache: "no-store",
      },
  );
  if (!res.ok) {
      throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userData = await getUserData(session)
  const userArray = userData?.user.registeredEvents;
  return (
    <>
      <div className="event-sec">
        <div className="event_wrapper">
          <h1 className="event_h1">
            Impetus
            <br />‍
          </h1>
          <p className="event_date">Date &amp; Time</p>
          <p className="event_para">
            Venue
            <br />‍
          </p>
          <p className="form_para_small">
            Prominent motivational speakers from the entrepreneurial environment
            will be delivering a talk to inspire the students and promote the
            ethos of entrepreneurship in the campus. This session will also be
            open to questions from the audience, thus furnishing the minds of
            the students with vivid ideas and a clearer picture of the
            entrepreneurship realm.
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
          {session && userArray[0] && <Link className="eventbtn w-button" href="/manage/impetus">
            Go to Dashboard
          </Link>}
        </div>
      </div>
    </>
  );
}
