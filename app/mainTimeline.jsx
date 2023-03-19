"use client";
import React from "react";
import Carousel from "./Landing/Carousel";
import NewCard from "./Landing/NewCard";

export default function Maintimeline({ userArray, eventsArray, session }) {
  return (
    <>
      <div className="timeline_sec">
        <div className="timeline-cont">
          <div className="timeline_header">
            <h1 className="about_h1">Events</h1>
            <div className="event_line"></div>
          </div>

          {eventsArray.map((event, id) => {
            return (
              <>
                <div className="timeline-element" key={id}>
                  <div className="rod">
                    <div className="outer_div">
                      {/* <div className="inner_div"></div> */}
                      <img src="gola.svg" className="image"></img>
                    </div>
                    <div
                      className={`linetimeline  ${id === 4 ? "hide" : ""}`}
                    ></div>
                  </div>
                  {/* Individual Card */}
                  {/* <div className="timeline_wrapper">
                    <h1 className="date">{event.date}</h1>
                    <div className="card_cont">
                      <h1 className="card_h1">{event.title}</h1>
                      <p className="card_para">{event.description}</p>
                      <div className="card_time">
                        <div className="card_l">
                          <img src="clock.svg" alt="" className="svg_card" />
                          <p className="timepara">{event.time} hours</p>
                        </div>
                        <div className="card_r">
                          <img src="location.svg" alt="" className="svg_card" />
                          <p className="timepara">{event.location}</p>
                        </div>
                      </div>
                      <button className="card_btn w-button">
                        Register Now<strong>→</strong>{" "}
                      </button>
                      <button className="btn_card_last w-button">
                        View Details<strong>→</strong>{" "}
                      </button>
                    </div>
                  </div> */}
                  {session ? (
                    <>
                      <NewCard
                        isRegistered={userArray[id]}
                        event={event}
                        key={event._id}
                        id={id}
                        userArray={userArray}
                        //   setUserArray,
                      />
                    </>
                  ) : (
                    <>
                      {" "}
                      <NewCard
                        event={event}
                        key={event._id}
                        id={id}
                        isRegistered={0}
                      />
                    </>
                  )}
                </div>

                {/* <Card
                  event={event}
                  key={event._id}
                  id={index}
                  isRegistered={-1}
                        /> */}
              </>
            );
          })}
        </div>
        <Carousel />
      </div>
    </>
  );
}
