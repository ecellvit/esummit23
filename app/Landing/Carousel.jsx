"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel() {
  const sliderRef = useRef(null);
  const next = () => {
    sliderRef.current.slickNext();
  };
  const previous = () => {
    sliderRef.current.slickPrev();
  };
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <div className="spkr_sec ">
      <div className="timeline_header">
        <h1 className="about_h1">Speakers</h1>
        <div className="event_line"></div>
      </div>
      <div className="spkr_cont ">
        {" "}
        <div className="next" onClick={previous}>
          <img src="arrowleft.svg" width="22" alt="" />
        </div>
        <Slider ref={sliderRef} {...settings} className="mr-20 overflow-hidden">
          {/* <div className="spkr_card none " style={{ margin: "0 10px" }}>
            <div className="spkr_img_wrap">
              <img
                src="spkr.png"
                sizes="(max-width: 767px) 100vw, 20vw"
                width="438"
             
              />
            </div>
            <div className="spkr_text">
              <p className="spkr_title">Selena Gomez</p>
              <p className="desc_spk">UI/UX Designer at SmallCase</p>
              <div className="linkedin">
                <img
                  src="linked.svg"
                  alt=""
                />
              </div>
            </div>
          </div> */}
          <div className="spkr_card " style={{ padding: "0 10px" }}>
            <div className="spkr_img_wrap">
              <img
                src="spkr.png"
                sizes="(max-width: 479px) 100vw, (max-width: 767px) 35vw, 20vw"
                width="438"
              />
            </div>
            <div className="spkr_text">
              <p className="spkr_title">Selena Gomez</p>
              <p className="desc_spk">UI/UX Designer at SmallCase</p>
              <div className="linkedin">
                <img src="linked.svg" alt="" />
              </div>
            </div>
          </div>
          <div className="spkr_card one" style={{ padding: "0 10px" }}>
            <div className="spkr_img_wrap none">
              <img src="spkr.png" width="438" />
            </div>
            <div className="spkr_text">
              <p className="spkr_title">Selena Gomez</p>
              <p className="desc_spk">UI/UX Designer at SmallCase</p>
              <div className="linkedin">
                <img src="linked.svg" alt="" />
              </div>
            </div>
          </div>{" "}
          <div className="spkr_card one" style={{ padding: "0 10px" }}>
            <div className="spkr_img_wrap none">
              <img src="spkr.png" width="438" />
            </div>
            <div className="spkr_text">
              <p className="spkr_title">Selena Gomez</p>
              <p className="desc_spk">UI/UX Designer at SmallCase</p>
              <div className="linkedin">
                <img src="linked.svg" alt="" />
              </div>
            </div>
          </div>{" "}
          <div className="spkr_card one" style={{ padding: "0 10px" }}>
            <div className="spkr_img_wrap none">
              <img src="spkr.png" width="438" />
            </div>
            <div className="spkr_text">
              <p className="spkr_title">Selena Gomez</p>
              <p className="desc_spk">UI/UX Designer at SmallCase</p>
              <div className="linkedin">
                <img src="linked.svg" alt="" />
              </div>
            </div>
          </div>
        </Slider>
        <div className="next" onClick={next}>
          <img src="arrowright.svg" width="22" alt="" />
        </div>
      </div>
    </div>
  );
}
