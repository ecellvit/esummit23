import React from 'react'

function MemberCard({data}) {
  return (
    <div className='h-64 rounded-2xl hover:scale-105 ease-linear bg-blue-700 '>
        <h2>{data.email}</h2>
        {
            (data.eHackTeamRole) ? <button className='bg-red-700 mt-40 w-40 rounded-md p-2'>Remove</button> : <h2>Leader</h2>
        }
    </div>
  )
}

export default MemberCard