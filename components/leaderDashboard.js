import MemberCard from './memberCard'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LeaderDashboard({
  userData,
  eventName,
  handleTeamDelete,
  handleMemberRemove,
  userRole
}) {
  const { data: session, status } = useSession()
  eventName = eventName.toLowerCase()
  console.log(eventName);
  const router = useRouter()
  console.log('dash', userData)
  function handleDelete(teamId) {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/${eventName}/${teamId}`, {
      method: 'DELETE',

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
        handleTeamDelete(false)
        toast('Team deleted Successfully')
      })
  }

  return (
    <div className="min-h-screen w-full bg-black text-white py-10 px-8">
      <h1 className="font-md text-4xl">{eventName} dashboard</h1>
      {userData?.members?.length < 4 ? (
        <div className="flex justify-center mt-16">
          <button
            onClick={(e) => router.push(`/manage/${eventName}/addMembers`)}
            className="bg-green-700 w-40 rounded-md p-2"
          >
            Add Members
          </button>
        </div>
      ) : (
        <div></div>
      )}
      <div className="grid grid-cols-2 gap-8  mt-20 mx-auto w-[70rem] text-center">
        {userData?.members?.map((data) => {
          console.log('member data', data)
          return <MemberCard data={data} userRole={userRole} teamId={userData._id} handleMemberRemove={handleMemberRemove}/>
        })}
      </div>
      <div className="flex justify-center mt-16">
        <button
          onClick={(e) => handleDelete(userData._id)}
          className="bg-red-700 w-40 rounded-md p-2"
        >
          Delete Team
        </button>
      </div>
    </div>
  )
}
