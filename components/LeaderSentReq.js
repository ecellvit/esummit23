import LeaderSentReqCard from './LeaderSentReqCard'

function LeaderSentReq({ eventName,session,requests }) {

  return (
    <div>
      <div>LeaderSentReq</div>
      <div className="grid grid-cols-3 ml-40 gap-4 mt-4">
        {requests.map((x) => {
          return <LeaderSentReqCard request={x.userId} key={x.userId._id} eventName={eventName} session={session}/>
        })}
      </div>
    </div>
  )
}

export default LeaderSentReq
