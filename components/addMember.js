"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AddMemberCard from "./addMemberCard";
import { useRouter } from "next/navigation";
import styles from "../styles/joinTeams.module.css";
import "../styles/landing.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddMember({ session, eventName, eventCode, sentData }) {
  eventName = eventName.toLowerCase();
  const router = useRouter();
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();
  const [users, setUsers] = useState([]);
  const searchBar = () => {};
  const [searchInput, setSearchInput] = useState("");
  // const [searchParam] = useState(["firstName"]);

  const handlePreviousButtonClick = () => {
    //console.log(prev);
    if (prev) {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/${eventName}/user?page=${prev.page}&limit=${prev.limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessTokenBackend}`,
            "Access-Control-Allow-Origin": "*",
          },
          cache: "no-store",
        }
      )
        .then((data) => data.json())
        .then((data) => {
          if (data.error?.errorCode) {
            toast.error(`${data.message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          setNext(data.paginatedResult.next);
          setPrev(data.paginatedResult.previous);
          setUsers(data.paginatedResult.results);
        });
    } else {
      toast.success(`You've reached the end!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleNextButtonClick = () => {
    //console.log(next);
    if (next) {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/${eventName}/user?page=${next.page}&limit=${next.limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessTokenBackend}`,
            "Access-Control-Allow-Origin": "*",
          },
          cache: "no-store",
        }
      )
        .then((data) => data.json())
        .then((data) => {
          if (data.error?.errorCode) {
            toast.error(`${data.message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          setNext(data.paginatedResult.next);
          setPrev(data.paginatedResult.previous);
          setUsers(data.paginatedResult.results);
          console.log(users);
        });
    } else {
      toast.success(`No more users found!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  function search(users, searchInput) {
    // Filter the users array based on the search input
    const filteredUsers = users?.filter((user) => {
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

  useEffect(() => {
    const data = fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/${eventName}/user?page=1&limit=9`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
        cache: "no-store",
      }
    )
      .then((data) => data.json())
      .then((data) => {
        if (data.error?.errorCode) {
          toast.error(`${data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        console.log(data);
        console.log(data.results);
        setNext(data.paginatedResult.next);
        setPrev(data.paginatedResult.previous);
        setUsers(data.paginatedResult.results);
        console.log(users);
      });
  }, []);

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
            //console.log(sentData);
            if (
              x.registeredEvents[eventCode] === 1 &&
              shouldRender(sentData, x)
            ) {
              //console.log(x);
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
              //console.log(sentData);
              if (shouldRender(sentData, x)) {
                //console.log(x);
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
        <div className="navigation_cont">
          <button
            className="navigation_card_btn w-button text-black bg-white hover:bg-[#53B3B9] "
            onClick={() => {
              handlePreviousButtonClick();
            }}
          >
            Previous
          </button>
          <button
            className="navigation_card_btn w-button text-black bg-white hover:bg-[#53B3B9] "
            onClick={() => {
              handleNextButtonClick();
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default AddMember;
