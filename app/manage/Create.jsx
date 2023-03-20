import React from "react";

export default function Create() {
  return (
    <div class="create_cont">
      <div class="subnav">
        <div class="left_sub">
          <a href="#" class="managebtn w-button">
            Back
          </a>
          <h1 class="subnav_h1">Innoventure</h1>
        </div>
        <div class="right_subnav">
          <a href="#" class="send w-button">
            Sent
          </a>
          <a href="#" class="recieved w-button">
            Recieved
          </a>
        </div>
      </div>
      <div class="ehack_cont">
        <h1 class="join_h1">Join a Team</h1>
        <a href="#" class="handleteam w-button">
          Find Team
        </a>
        <h1 class="join_h1 bold">Or</h1>
        <h1 class="join_h1">Create Your Team</h1>
        <div class="w-form">
          <input
            type="text"
            class="team w-input"
            maxlength="256"
            name="name"
            data-name="Name"
            placeholder=""
            id="name"
          />
        </div>
        <a href="#" class="handleteam w-button">
          Create Team
        </a>
      </div>
    </div>
  );
}
