"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import JoinTeamsCard from "./joinTeamsCard";
import "../styles/landing.css";

import refreshData from "@/app/utils/refresh";
import "react-toastify/dist/ReactToastify.css";

function JoinAllTeams({ session, eventName, userData, sentData }) {
  const path = usePathname();
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();
  const [teamData, setTeamData] = useState([]);
  const router = useRouter();
  const searchBar = () => {};
  const [searchInput, setSearchInput] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  function search(teamData, searchInput) {
    // Filter the users array based on the search input
    const filteredTeams = teamData.filter((team) => {
      // Combine all user fields into a single string to search for the search input
      const teamString = Object.values(team).join("").toLowerCase();
      return teamString.includes(searchInput.toLowerCase());
    });
    return filteredTeams;
  }

  function shouldRender(data, check) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].teamId._id === check._id) {
        return false;
      }
    }
    // refreshData(router, path);
    return true;
  }

  const handlePreviousButtonClick = () => {
    //console.log(prev);
    if (prev) {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/${eventName}?page=${prev.page}&limit=${prev.limit}`,
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

          setTeamData([]);

          data.paginatedResult.results.map((currenTeam) => {
            if (currenTeam.members.length < 4) {
              setTeamData((prevTeamData) => {
                return [...prevTeamData, currenTeam];
              });
            }
          });
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
        `${process.env.NEXT_PUBLIC_SERVER}/api/${eventName}?page=${next.page}&limit=${next.limit}`,
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

          setTeamData([]);

          data.paginatedResult.results.map((currenTeam) => {
            if (currenTeam.members.length < 4) {
              setTeamData((prevTeamData) => {
                return [...prevTeamData, currenTeam];
              });
            }
          });
        });
    } else {
      toast.success(`No more teams found!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/${eventName}?page=1&limit=9`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      cache: "no-store",
    })
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
        setTeamData([]);

        data.paginatedResult.results.map((currenTeam) => {
          if (currenTeam.members.length < 4) {
            setTeamData((prevTeamData) => {
              return [...prevTeamData, currenTeam];
            });
          }
        });
      });
  }, []);

  return (
    <>
      {" "}
      <div className="teams_sec">
        <ToastContainer></ToastContainer>
        <div className="search">
          <div className="w-form">
            <input
              type="text"
              className="team w-input"
              maxlength="256"
              name="name-3"
              onChange={handleChange}
              value={searchInput}
              data-name="Name 3"
              placeholder="Search Here"
              id="name-3"
            />
          </div>
        </div>
        <div className="team_card_holder">
          <div className="teamcard_cont">
            {search(teamData, searchInput)?.map((x, index) => {
              if (shouldRender(sentData, x)) {
                return (
                  <JoinTeamsCard
                    teamData={x}
                    key={teamData._id}
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
      {/* <div className={styles.Teams}>
        <input
          type="text"
          placeholder="Search here"
          onChange={handleChange}
          value={searchInput}
          className={styles.SearchBar}
        />
        <div className={styles.Teams}>
          {search(teamData, searchInput)?.map((x, index) => {
            if (shouldRender(sentData, x)) {
              return (
                <JoinTeamsCard
                  teamData={x}
                  key={teamData._id}
                  session={session}
                  eventName={eventName}
                />
              );
            }
          })}
        </div>
      </div>
      <div className={styles.buttonPlacer}>
        <button
          className="fixed bottom-20 left-20 text-black bg-white hover:bg-[#53B3B9] font-bold py-2 px-4 rounded"
          onClick={() => {
            handlePreviousButtonClick();
          }}
        >
          Previous
        </button>
        <button
          className="fixed bottom-20 right-20 bg-white hover:bg-[#53B3B9] text-black font-bold py-2 px-4 rounded"
          onClick={() => {
            handleNextButtonClick();
          }}
        >
          Next
        </button>
      </div> */}
    </>
  );
}

export default JoinAllTeams;
