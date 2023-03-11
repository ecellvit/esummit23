import UserReceivedReqCard from './UserReceivedReqCard'

function UserReceivedReq({ eventName,requests,session }) {

  return (
    <div>
      <div>userReceivedReq</div>
      <div className='ml-20 mt-10'>
      {requests.length ? (
        requests.map((x) => {
          return <UserReceivedReqCard key={x} request={x} eventName={eventName} session={session}/>
        })
      ) : (
        <h1>No requests</h1>
      )}
      </div>
      
    </div>
  )
}

export default UserReceivedReq
