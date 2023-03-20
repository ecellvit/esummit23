import React from "react";

export default function Create() {
  return (
    <div className="create_cont">
      <div className="subnav">
        <div className="left_sub">
          <a href="#" className="managebtn w-button">
            Back
          </a>
          <h1 className="subnav_h1">Innoventure</h1>
        </div>
        <div className="right_subnav">
          <a href="#" className="send w-button">
            Sent
          </a>
          <a href="#" className="recieved w-button">
            Received
          </a>
        </div>
      </div>
      <div className="ehack_cont">
        <h1 className="join_h1">Join a Team</h1>
        <a href="#" className="handleteam w-button">
          Find Team
        </a>
        <h1 className="join_h1 bold">Or</h1>
        <h1 className="join_h1">Create Your Team</h1>
        <div className="w-form">
          <input
            type="text"
            className="team w-input"
            maxlength="256"
            name="name"
            data-name="Name"
            placeholder=""
            id="name"
          />
        </div>
        <a href="#" className="handleteam w-button">
          Create Team
        </a>
      </div>
    </div>
  );
}
