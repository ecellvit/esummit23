import React from "react";

export default function Section1() {
  return (
    <div className="innovate_sec">
      <div className="innovate_wrapper">
        <div className="features">
          <div className="feat_img">
            <img src="feature1.svg" alt="" className="feature_img" />
          </div>
          <div className="feat_text">
            <p className="feat_h1">Innovate</p>
            <p className="feat_para">
              Finding innovative solutions to complex real world problems to
              create an edge over your competitors while providing a viable
              alternative.
            </p>
          </div>
        </div>
        <div className="features">
          <div className="feat_img">
            <img src="feature2.svg" alt="" className="feature_img" />
          </div>
          <div className="feat_text">
            <p className="feat_h1">Ideate</p>
            <p className="feat_para">
              Generate and brainstorm creative ideas to solve a problem and
              achieve goals through the way.
            </p>
          </div>
        </div>
        <div className="features last">
          <div className="feat_img">
            <img src="feature3.svg" alt="" className="feature_img" />
          </div>
          <div className="feat_text">
            <p className="feat_h1">Actuate</p>
            <p className="feat_para">
              Execute a well-planned strategy with precision and agility, to
              produce tangible results while achieving desirable outcomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
