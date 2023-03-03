"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import AddMemberCard from './addMemberCard'

function AddMember() {
    const { data: session, status } = useSession()
    const [data, setData] = useState([])

    useEffect(() => {
        session &&
          fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/eHack/user`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session.accessTokenBackend}`,
              'Access-Control-Allow-Origin': '*',
            },
          })
            .then((response) => response.json())
    
            .then((data) => {
              console.log('fetched members data', data)
              setData(data.eHackMembers)
              console.log(data.eHackMembers)
            })
      }, [session])
  return (
    <div className='grid grid-cols-3 gap-5 mt-5 ml-40'>
    {
        data?.map((x) => {
          return <AddMemberCard data={x} key={x._id}/>
        })
    }
    </div>
  )
}

export default AddMember