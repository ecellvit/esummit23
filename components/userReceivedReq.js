'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import UserReceivedReqCard from './UserReceivedReqCard'

function UserReceivedReq({ eventName }) {
  eventName = eventName.toLowerCase()
  const { data: session, status } = useSession()
  const [data, setData] = useState([])
  const [useEffectTrigger, setUseEffectTrigger] = useState(false)

  const handleRejectedInvite = () => {
    setUseEffectTrigger((prevTeamStatus) => !prevTeamStatus)
  }
  
  useEffect(() => {
    session &&
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/user/${eventName}/addMember`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.accessTokenBackend}`,
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
        .then((response) => response.json())

        .then((data) => {
          console.log('fetched leader sent add members', data)
          setData(data?.requests)
          // const user = data?.user
          // if (user[eventName + 'TeamId']) {
          //   console.log('yoyo', user[eventName + 'TeamId'])
          //   setHasTeam(true)
          // }
        })
  }, [session, useEffectTrigger])

  return (
    <div>
      <div>userReceivedReq</div>
      <div className='ml-20 mt-10'>
      {data.length ? (
        data.map((x) => {
          return <UserReceivedReqCard data={x} eventName={eventName} handleRejectedInvite={handleRejectedInvite}/>
        })
      ) : (
        <h1>No requests</h1>
      )}
      </div>
      
    </div>
  )
}

export default UserReceivedReq
