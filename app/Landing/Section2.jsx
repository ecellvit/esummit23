import Link from "next/link";
import React from "react";

export default function Section2() {
  return (
    <div className="about_sec">
      <div className="about_wrapper">
        <div className="about_img_wrapper">
          <img src="ecellblue.png" width="425px" className="image" />
        </div>
        <div className="about_txt_wrap">
          <h1 className="about_h1">About E-Summit’23</h1>
          <p className="about_para">
            <strong className="bld">E-Summit</strong> is the conclave that opens
            the doors to the world of entrepreneurship. Masquerading as a single
            event, it is a fusion of visionary activities and insightful
            sessions that open the realm of networking and broaden the horizon
            of business in students&#x27; minds. With its exclusive class of
            exhilarating events, interesting workshops, exciting expos and
            spectacular speakers, E-Summit aims at instilling innovation in
            young minds.
          </p>
          <Link href="#" className="primary_btn w-button">
            View Events
          </Link>
        </div>
      </div>
    </div>
  );
}
