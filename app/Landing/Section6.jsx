import Link from "next/link";
import React from "react";

export default function Section6() {
  return (
    <div className="sound_sec">
      <div className="sound_section">
        <div className="img_sound">
          <img src="flag.png" width="162" alt="" />
        </div>
        <div className="sound_r">
          <h1 className="about_h1 sound">Sounds Awesome?</h1>
          <Link href="/" className="btn2 w-button">
            View Events
          </Link>
        </div>
      </div>
    </div>
  );
}
