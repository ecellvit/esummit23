"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import JoinTeamsCard from "./joinTeamsCard";
import styles from "../styles/joinTeams.module.css";

function JoinAllTeams({ session, eventName }) {
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

  const handlePreviousButtonClick = () => {
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
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/ehack?page=1&limit=9`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
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
          {search(teamData, searchInput)?.map((x, index) => {
            return (
              <JoinTeamsCard
                teamData={x}
                key={teamData._id}
                session={session}
                eventName={eventName}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.buttonPlacer}>
        <button
          className="fixed bottom-20 left-20 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={() => {
            handlePreviousButtonClick();
          }}
        >
          Previous
        </button>
        <button
          className="fixed bottom-20 right-20 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={() => {
            handleNextButtonClick();
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default JoinAllTeams;
