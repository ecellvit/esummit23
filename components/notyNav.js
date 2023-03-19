'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import LeaderNav from './leaderNav'
import UserNav from './userNav'

function NotyNav({ eventName }) {
  const { data: session, status } = useSession()
  const [data, setData] = useState([])
  const [hasTeam, setHasTeam] = useState(false)
  const [isLeader, setIsLeader] = useState(false)

  useEffect(() => {
    session &&
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessTokenBackend}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((response) => response.json())

        .then((data) => {
          setData(data?.user)
          const user = data?.user
          if (user[eventName + 'TeamId']) {
            setHasTeam(true)
          }
          if (user[eventName + 'TeamRole'] == 0) {
            setIsLeader(true)
          }
        })
  }, [session])
  return (
    <>{hasTeam ?( isLeader ? <LeaderNav eventName={eventName}/> : null ): <UserNav eventName={eventName}/>}</>
  )
}

export default NotyNav
