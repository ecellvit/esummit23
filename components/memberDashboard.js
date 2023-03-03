import MemberCard from './memberCard'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import UserCard from './userCard'

export default function MemberDashboard({
  userData,
  eventName,
  handleMemberLeave,
}) {

  const { data: session, status } = useSession()
  eventName = eventName.toLowerCase()
  console.log(eventName);
  console.log('dash', userData)

  function handleLeave(teamId) {
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
        handleMemberLeave();
        toast('Team left Successfully')
      })
  }

  return (
    <div className="min-h-screen w-full bg-black text-white py-10 px-8">
      <h1 className="font-md text-4xl">{eventName} dashboard</h1>

      <div className="grid grid-cols-2 gap-8  mt-20 mx-auto w-[70rem] text-center">
        {userData?.members?.map((data) => {
          console.log('member data', data)
          return <UserCard data={data} />
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
