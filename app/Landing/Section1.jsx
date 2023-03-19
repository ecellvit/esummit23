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
              Provide a unique and workable concept to stand out from the
              competitors.
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
              Generate and explore creative ideas to solve a problem or achieve
              a goal.
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
              Execute a well-planned strategy or solution with precision and
              agility, to produce tangible results and achieve the desired
              outcome
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
