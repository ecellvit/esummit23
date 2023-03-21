"use client";
import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Section2() {
  const router = useRouter();
  const session = useSession();
  //console.log(session);
  const loginHandler = () => {
    signIn("google", {
      callbackUrl: "/getdetails",
    });
  };
  return (
    <div className="about_sec">
      <div className="about_wrapper">
        <div className="about_img_wrapper">
          <img src="ecellblue.png" width="425px" className="image" />
        </div>
        <div className="about_txt_wrap">
          <h1 className="about_h1">About E-Summit’23</h1>
          <p className="about_para">
            <strong className="bld">E-Summit</strong> is the conclave that
            insinuates attendees to the entrepreneurial world. It is a fusion of
            insightful sessions and visionary activities disguised as a single
            event that opens the realm of networking and broadens your
            perspective on business. E-Summit aims to inculcate a sense of
            innovation in young people through its exclusive collection of
            enlivening events, enthralling workshops, and exciting expos, and
            the perfect panel of spectacular speakers.
          </p>
          {/* <Link href="#" className="primary_btn w-button">
            Get Started{" "}
          </Link> */}
          <button
            onClick={() => {
              session.data ? router.push("/schedule") : loginHandler();
            }}
            className="primary_btn w-button"
          >
            {session.data ? "View Registered Events" : "Get Started"}
          </button>
        </div>
      </div>
    </div>
  );
}
