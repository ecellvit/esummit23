"use client";

import { useState } from "react";

import AddMemberCard from "./addMemberCard";
import { useRouter } from "next/navigation";
import styles from "../styles/joinTeams.module.css";

function AddMember({ session, users, eventName }) {
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

  return (
    <div className={styles.Teams}>
      <input
        type="text"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
        className={styles.SearchBar}
      />

      <button
        onClick={() => router.back()}
        className="fixed bottom-2 left-35 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        Go Back
      </button>
      <div className={styles.Teams}>
        {search(users, searchInput)?.map((x, index) => {
          return (
            <AddMemberCard
              user={x}
              key={x._id}
              session={session}
              eventName={eventName}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AddMember;
