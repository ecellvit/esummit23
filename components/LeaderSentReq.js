'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import LeaderSentReqCard from './LeaderSentReqCard'
import { CloudCog } from 'lucide-react'

function LeaderSentReq({ eventName }) {
  const { data: session, status } = useSession()
  const [data, setData] = useState([])
  const [useEffectTrigger, setUseEffectTrigger] = useState(false)

  const handleInviteDelete = () => {
    setUseEffectTrigger((prevTeamStatus) => !prevTeamStatus);
  };

  useEffect(() => {
    session &&
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/${eventName}/addMember`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessTokenBackend}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((response) => response.json())

        .then((data) => {
          console.log('fetched add members', data)
          setData(data?.requests)
          // const user = data?.user
          // if (user[eventName + 'TeamId']) {
          //   console.log('yoyo', user[eventName + 'TeamId'])
          //   setHasTeam(true)
          // }
        })
  }, [session,useEffectTrigger])
  return (
    <div>
      <div>LeaderSentReq</div>
      <div className="grid grid-cols-3 ml-40 gap-4 mt-4">
        {data.map((x) => {
          return <LeaderSentReqCard data={x.userId} key={x.userId._id} handleInviteDelete={handleInviteDelete}/>
        })}
      </div>
    </div>
  )
}

export default LeaderSentReq
