"use client";
import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Section6() {
  const router = useRouter();
  const session = useSession();
  const loginHandler = () => {
    signIn("google", {
      callbackUrl: "/getdetails",
    });
  };
  return (
    <div className="sound_sec">
      <div className="sound_section">
        <div className="img_sound">
          <img src="flag.png" width="162" alt="" />
        </div>
        <div className="sound_r">
          <h1 className="about_h1 sound">Sounds Awesome?</h1>
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
