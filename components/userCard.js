import React from 'react'

function UserCard({data,userRole}) {
  return (
    <div className='h-64 rounded-2xl hover:scale-105 ease-linear bg-blue-700 '>
        <h2>{data.email}</h2>
        {
          userRole ? <h2>Member</h2> : <h2>Leader</h2>
        }
    </div>
  )
}

export default UserCard