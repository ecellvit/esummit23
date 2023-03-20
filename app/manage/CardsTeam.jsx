import React from "react";

export default function CardsTeam() {
  return (
    <div className="teams_sec">
      <div className="search">
        <div className="w-form">
          <input
            type="text"
            className="team w-input"
            maxlength="256"
            name="name-3"
            data-name="Name 3"
            placeholder="Search Teams"
            id="name-3"
          />
        </div>
      </div>
      <div className="team_card_holder">
        <div className="teamcard_cont">
          <div className="singlecard">
            <div className="team_text">
              <p className="team_details">
                TeamName: <br />
                naitikjkapadia@gmail.com
              </p>
              <p className="team_details">
                Team Leader: <br />
                naitikjkapadia@gmail.com
              </p>
              <p className="team_details">
                Email: <br />
                naitikjkapadia@gmail.com
              </p>
            </div>
            <button className="join_team w-button">Back</button>
          </div>
        </div>
      </div>
      <div className="navigation_cont">
        <button className="navigation_card_btn w-button">Previous</button>
        <button className="navigation_card_btn w-button">Next</button>
      </div>
    </div>
  );
}
