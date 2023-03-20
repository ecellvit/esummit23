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
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerPadding: "30vw",
    initialSlide: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="spkr_sec">
      <div className="timeline_header">
        <h1 className="about_h1">Speakers</h1>
        <div className="event_line"></div>
      </div>
      <div className="spkr_cont max-w-[80vw]">
        {" "}
        {/* <div className="prev" onClick={previous}>
          <img src="arrowleft.svg" width="22" alt="" />
        </div> */}
        <div className="max-w-[80%] mr-[20px]">
          <Slider ref={sliderRef} {...settings} className=" overflow">
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
            <div className="spkr_card one ">
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
            <div className="spkr_card one">
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
            <div className="spkr_card one">
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
            <div className="spkr_card one">
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
        </div>
        {/* <div className="next ml-[20px]" onClick={next}>
          <img src="arrowright.svg" width="22" alt="" />
        </div> */}
      </div>
    </div>
  );
}
