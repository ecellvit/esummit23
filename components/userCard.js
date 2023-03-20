import React from "react";

function UserCard({ data, userRole }) {
  return (
    <>
      <div className="singlecard">
        <div className="team_text">
          <p className="team_details">
            Name : <br />
            {data.firstName + " " +data.lastName}
          </p>
          {userRole ? (
            <p className="team_details">Member</p>
          ) : (
            <p className="team_details">Leader</p>
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
