"use client"
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import JoinTeamsCard from "./joinTeamsCard";

function JoinAllTeams({ session, eventName }) {
    const [next, setNext] = useState();
    const [prev, setPrev] = useState();
    const [teamData, setTeamData] = useState([]);
    const router = useRouter();

    const handlePreviousButtonClick = () => {
        if (prev) {
            fetch(
                `${process.env.NEXT_PUBLIC_SERVER}/api/team?page=${prev.page}&limit=${prev.limit}`,
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
                `${process.env.NEXT_PUBLIC_SERVER}/api/team?page=${next.page}&limit=${next.limit}`,
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
                    console.log("in use effect--------------")
                    console.log("popoppop!!!!!!",data.paginatedResult.next);
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
        fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/ehack?page=1&limit=2`, {
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
                console.log("left!!!!", data.paginatedResult.next);
                console.log("right!!!!", data.paginatedResult.previous);
                setNext(data.paginatedResult.next);
                setPrev(data.paginatedResult.previous);
console.log("test data fetch",data.paginatedResult)
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

    console.log("ytoyoyo tean data", teamData);

    return (
        <div className="h-[80vh] w-screen">
            <button onClick={() => router.back()} className="fixed top-20 left-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                Go Back
            </button>
            <div className='grid grid-cols-3 gap-5 mt-20 ml-20'>
                {
                    teamData?.map((x) => {
                        return <JoinTeamsCard teamData={x} key={teamData._id} session={session} eventName={eventName} />
                    })
                }
            </div>
            <div className="flex justify-evenly fixed bottom-5">
                <button
                    className="left-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    onClick={() => {
                        handlePreviousButtonClick();
                    }}
                >
                    Previous
                </button>
                <button
                    className="bottom-2  left-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    onClick={() => {
                        handleNextButtonClick();
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default JoinAllTeams