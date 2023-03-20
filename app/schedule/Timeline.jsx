"use client";
import React from "react";

import Card from "./Card";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Timeline({ userArray, eventsArray, session }) {
  const eventCodes = [
    "IMPETUS",
    "EHACK",
    "INNOVENTURE",
    "EVENT_4",
    "EVENT_5",
    "EVENT_6",
  ];

  // //console.log(eventsArray);
  if (userArray.includes(1)) {
    return (
      <>
        <ToastContainer />
        <div className="timeline_sec">
          <div className="timeline-cont">
            <div className="timeline_header bg-transparent">
              <h1 className="about_h1">Registered Events By You</h1>
              <div className="event_line"></div>
            </div>
            {userArray.map((registered, index) => {
              if (registered === 1) {
                return (
                  <>
                    <div className="timeline-element" key={index}>
                      <div className="rod">
                        <div className="outer_div">
                          <div className="inner_div"></div>
                        </div>
                        <div className="linetimeline"></div>
                      </div>
                      <Card
                        event={eventsArray[index]}
                        session={session}
                        tit={eventCodes[index]}
                        id={index}
                        // setUserArray={setUserArray}
                        userArray={userArray}
                      />
                      {/* new timelin             */}
                    </div>
                  </>
                );
              }
            })}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="flex justify-center mt-10">Please register something</div>
    );
  }
}
