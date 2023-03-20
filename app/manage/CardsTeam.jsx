import React from "react";

export default function CardsTeam() {
  return (
    <div class="teams_sec">
      <div class="search">
        <div class="w-form">
          <input
            type="text"
            class="team w-input"
            maxlength="256"
            name="name-3"
            data-name="Name 3"
            placeholder="Search Here"
            id="name-3"
          />
        </div>
      </div>
      <div class="team_card_holder">
        <div class="teamcard_cont">
          <div class="singlecard">
            <div class="team_text">
              <p class="team_details">
                TeamName: <br />
                naitikjkapadia@gmail.com
              </p>
              <p class="team_details">
                Team Leader: <br />
                naitikjkapadia@gmail.com
              </p>
              <p class="team_details">
                Email: <br />
                naitikjkapadia@gmail.com
              </p>
            </div>
            <button class="join_team w-button">Back</button>
          </div>
        </div>
      </div>
      <div class="navigation_cont">
        <button class="navigation_card_btn w-button">Previous</button>
        <button class="navigation_card_btn w-button">Next</button>
      </div>
    </div>
  );
}
