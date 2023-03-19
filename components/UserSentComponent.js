"use client"
import UserSentCard from "./userSentCard";
import { useRouter } from "next/navigation";

function UserSentComponent({ eventName, requests, session }) {
  const router = useRouter();
  
  console.log("all requests!!!!!!!!!!!!!!!!!!!!!", requests);
  return (
    <div>
      <div>userReceivedReq</div>
      <button onClick={() => router.back()} className="fixed top-20 left-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
        Go Back
      </button>
      <div className='ml-20 mt-10'>
        {requests.length ? (
          requests.map((x) => {
            return <UserSentCard key={x} request={x} eventName={eventName} session={session} />
          })
        ) : (
          <h1>No requests</h1>
        )}
      </div>

    </div>
  )
}

export default UserSentComponent
