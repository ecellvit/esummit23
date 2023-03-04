'use client'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

import Avatar, { genConfig } from 'react-nice-avatar'
function UserReceivedReqCard({
  data,
  handleRejectedInvite,
  handleAcceptedInvite,
  eventName,
}) {
  const config = genConfig()
  const { data: session, status } = useSession()
  const router = useRouter()
  function handleRejectInvite(teamId) {
    console.log(teamId)
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/user/ehack/addMember/${teamId}`,
      {
        method: 'POST',
        body: JSON.stringify({
          status: 0,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessTokenBackend}`,
          'Access-Control-Allow-Origin': '*',
        },
      },
    )
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
          return
        }
        toast('Invite Rejected Successfully')
        handleRejectedInvite()
        console.log('Invite Rejected')
      })
  }
  function handleAcceptInvite(teamId) {
    console.log(teamId)
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/user/ehack/addMember/${teamId}`,
      {
        method: 'POST',
        body: JSON.stringify({
          status: 1,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessTokenBackend}`,
          'Access-Control-Allow-Origin': '*',
        },
      },
    )
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
          return
        }
        toast('Invite Accepted Successfully')
        // handleAcceptedInvite();
        router.push(`/manage/${eventName}`)
        console.log('Invite Accepted')
      })
  }
  return (
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="flex flex-col items-center pb-10">
        <div class="w-24 h-24 mb-3 rounded-full shadow-lg">
          <Avatar className="w-32 h-32" {...config} />
        </div>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {data.teamId.teamName}
        </h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {data.teamId.teamLeaderId.email}
        </span>
        <div class="flex mt-4 space-x-3 md:mt-6">
          <button
            onClick={(e) => handleRejectInvite(data.teamId?._id)}
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Reject invite
          </button>
          <button
            onClick={(e) => handleAcceptInvite(data.teamId?._id)}
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Accept invite
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserReceivedReqCard
