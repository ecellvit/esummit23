"use client";

import { useState } from "react";

import AddMemberCard from "./addMemberCard";
import { useRouter } from "next/navigation";
import styles from "../styles/joinTeams.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddMember({ session, users, eventName, eventCode, sentData }) {
  const router = useRouter();
  const searchBar = () => {};
  const [searchInput, setSearchInput] = useState("");
  // const [searchParam] = useState(["firstName"]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  function search(users, searchInput) {
    // Filter the users array based on the search input
    const filteredUsers = users.filter((user) => {
      // Combine all user fields into a single string to search for the search input
      const userString = Object.values(user).join("").toLowerCase();
      return userString.includes(searchInput.toLowerCase());
    });
    return filteredUsers;
  }
  function shouldRender(data, check) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].userId._id === check._id) {
        return false;
      }
    }
    return true;
  }

  return (
    <>
      {/* {" "}
      <div>
        <ToastContainer />
        <input
          type="text"
          placeholder="Search here"
          onChange={handleChange}
          value={searchInput}
          className={styles.SearchBar}
        />
        <div className={styles.Teams}>
          {search(users, searchInput)?.map((x, index) => {
            console.log(sentData);
            if (
              x.registeredEvents[eventCode] === 1 &&
              shouldRender(sentData, x)
            ) {
              console.log(x);
              return (
                <AddMemberCard
                  user={x}
                  key={x._id}
                  session={session}
                  eventName={eventName}
                />
              );
            }
          })}
        </div>
      </div>{" "} */}
      <div className="teams_sec">
        <ToastContainer></ToastContainer>
        <div className="search">
          <div className="w-form">
            <input
              type="text"
              className="team w-input"
              maxlength="256"
              name="name-3"
              data-name="Name 3"
              placeholder="Search Users"
              onChange={handleChange}
              value={searchInput}
              id="name-3"
            />
          </div>
        </div>
        <div className="team_card_holder">
          <div className="teamcard_cont">
            {search(users, searchInput)?.map((x, index) => {
              console.log(sentData);
              if (
                x.registeredEvents[eventCode] === 1 &&
                shouldRender(sentData, x)
              ) {
                console.log(x);
                return (
                  <AddMemberCard
                    user={x}
                    key={x._id}
                    session={session}
                    eventName={eventName}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddMember;
