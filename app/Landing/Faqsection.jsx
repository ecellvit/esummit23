"use client";

import React, { useState, useRef } from "react";
import useClickOutside from "./clickOutside";
export default function Faqsection() {
  const dropref = useRef(null);
  const [dropdown, setDropdown] = useState(false);
  useClickOutside(dropref, () => {
    setDropdown(false);
  });
  return (
    <div className="faq_sec">
      <div className="faq_cont">
        <div className="faq_l">
          <div className="faq_img_wrap">
            <img src="faq.svg" width="55" alt="" className="faq_img" />
          </div>
          <h1 className="faq_head">
            Answers To Some Commonly Asked Questions.
          </h1>
        </div>
        <div className="faq_r">
          <button
            className="faq_title w-[100%]"
            ref={dropref}
            onClick={() => {
              setDropdown((prev) => !prev);
            }}
          >
            <p className="far_tit">Can&#x27;t afford to put 20% down?</p>
            <img src="dropdownfaq.svg" alt="" />
          </button>
          {dropdown ? (
            <>
              <p className="open">Can&#x27;t affor to put 20% down?</p>
            </>
          ) : (
            <></>
          )}
          <div className="faq_title">
            <p className="far_tit">Can&#x27;t afford to put 20% down?</p>
            <img src="dropdownfaq.svg" alt="" />
          </div>
          <div className="faq_title">
            <p className="far_tit">Can&#x27;t afford to put 20% down?</p>
            <img src="dropdownfaq.svg" alt="" />
          </div>
          <div className="faq_title">
            <p className="far_tit">Can&#x27;t afford to put 20% down?</p>
            <img src="dropdownfaq.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
