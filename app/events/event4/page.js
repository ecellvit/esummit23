import Even from "@/app/Landing/even";
import "../../../styles/landing.css";
export default function Home() {
  return (
    <>
      <div className="event-sec">
        <div className="event_wrapper">
          <h1 className="event_h1">
            Event 4
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
          <button className="eventbtn w-button">Go to Dashboard</button>
        </div>
      </div>
    </>
  );
}
