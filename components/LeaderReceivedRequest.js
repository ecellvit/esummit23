"use client"
import LeaderNav from './leaderNav'
import LeaderReceivedRequestCard from './LeaderReceivedRequestCard'
import { useRouter } from "next/navigation";

function LeaderReceivedReq({ eventName,session,requests,teamId}) {
  const router = useRouter()
  return (
    <div>
      <LeaderNav  eventName={eventName}/>
      <button onClick={() => router.back()} className="fixed bottom-2 left-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
        Go Back
      </button>
      {(requests.length)?(
      <div className="grid grid-cols-3 ml-40 gap-4 mt-4">
        {requests.map((x) => {
          return <LeaderReceivedRequestCard request={x.userId} key={x.userId._id} eventName={eventName} session={session} teamId={teamId}/>
        })}
      </div>):(<div className='flex justify-center mt-64'>No Requests Sent</div>)}
     
    </div>
  )
}

export default LeaderReceivedReq