import { useRouter } from 'next/navigation'
import { signIn, signOut, useSession } from "next-auth/react";
import { useRef,useState} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function CreateTeam({eventName,handleTeamCreate }) {
  const { data: session, status } = useSession();
  eventName = eventName.toLowerCase();
  const teamName = useRef("");
  const router = useRouter()
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit btn clicked");
     if (teamName.current.value.trim() === "") {
      toast.error("Please Don't Leave Name as Blank!");
      return;
    }
    setisLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/${eventName}`, {
      method: "POST",
      body: JSON.stringify({
        teamName: teamName.current.value.trim(),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setisLoading(false);
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
          return;
        }
        toast("Details submitted successfully");
        handleTeamCreate();
        // router.reload();
        return;
      });
  };

  return (
 
    <div className=" flex justify-center items-center mt-40 text-center">
      <div className=" bg-blue-700 h-96 w-/6 md:w-1/3  rounded-2xl	p-4 ">

        <div className="text-3xl text-white">Join a Team</div>
        <button onClick={(e) => {
        router.push(`/manage/${eventName}/joinTeams`)
        }} type="button" class="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-2/3 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2">Find Team</button>

        <h2 className="text-4xl font-bold mt-8">OR</h2>
        <div className="mt-2">
          <div className="text-3xl text-white mt-3">Create a Team</div>
          <input
            type="text"
            ref={teamName}
            className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Team Name"
            required
          ></input>
          <button type="button" 
          onClick={(e) => handleSubmit(e)}
          class="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-2/3 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2">Create Team</button>

        </div>
      </div>
    </div>
  )
}
