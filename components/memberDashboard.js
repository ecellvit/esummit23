"use client"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import refreshData from '@/app/utils/refresh'
import UserCard from './userCard'

export default function MemberDashboard({
  userData,
  eventName,
  session
}) {

  console.log(eventName);
  console.log('dash', userData)
  
  
  function handleLeave(teamId) {
    eventName = eventName.toLowerCase()
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/${eventName}/${teamId}`, {
      method: 'PATCH',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.error?.errorCode) {
          toast.error(`${data.message}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
        refreshData();
        toast('Team left Successfully')
      })
  }

  return (
    <div className="min-h-screen w-full bg-black text-white py-10 px-8">
      <h1 className="font-md text-4xl">{eventName} dashboard</h1>

      <div className="grid grid-cols-2 gap-8  mt-20 mx-auto w-[70rem] text-center">
        {userData?.members?.map((data) => {
          console.log('member data', data)
          console.log("role",data[eventName+"TeamRole"])
          return <UserCard data={data} userRole={data[eventName+"TeamRole"]}/>
        })}
      </div>
      <div className="flex justify-center mt-16">
        <button
          onClick={(e) => handleLeave(userData._id)}
          className="bg-red-700 w-40 rounded-md p-2"
        >
          Leave Team
        </button>
      </div>
    </div>
  )
}
