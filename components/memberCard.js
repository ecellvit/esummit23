import React from 'react'

function MemberCard({data}) {
  return (
    <div className='h-64 rounded-2xl hover:scale-105 ease-linear bg-blue-700 '>
        <h2>{data.username}</h2>
        {
            !data.isLeader && <button className='bg-red-700 mt-40 w-40 rounded-md p-2'>Remove</button>
        }
    </div>
  )
}

export default MemberCard