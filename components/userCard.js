import React from "react";

function UserCard({ data, userRole }) {
  return (
    <>
      <div class="singlecard">
        <div class="team_text">
          <p class="team_details">
            Email: <br />
            {data.email}
          </p>
          {userRole ? (
            <p class="team_details">Member</p>
          ) : (
            <p class="team_details">Leader</p>
          )}
        </div>
      </div>
      {/* <div className="h-40 rounded-2xl hover:scale-105 ease-linear bg-white ">
        <h2>{data.email}</h2>
        {userRole ? <h2>Member</h2> : <h2>Leader</h2>}
      </div> */}
    </>
  );
}

export default UserCard;
