import MemberCard from './memberCard'

export default function LeaderDashboard({data}) {
    const userData = {
        username: 'anjy',
        teamEvents: [
          {
            eventName: 'E-hack',
            teamID: '1223334',
            // teamID:null,
            teammembers: [
              { username: 'member1', isLeader: true },
              { username: 'member2', isLeader: false },
              //   { username: 'member3',isLeader:false},
              { username: 'member4', isLeader: false },
            ],
          },
          {
            eventName: 'Inoventure',
            teamID: '1223334',
            // teamID:null,
            teammembers: [
              { username: 'member1',isLeader:true},
              { username: 'member2',isLeader:false},
            //   { username: 'member3',isLeader:false},
              { username: 'member4',isLeader:false},
            ],
          }
        ],
      }

  return (
    <div className="min-h-screen w-full bg-black text-white py-10 px-8">
      <h1 className="font-md text-4xl">{data.eventName} dashboard</h1>
      {(data.teammembers.length<4) ? <div className='flex justify-center mt-16'>
        <button className='bg-green-700 w-40 rounded-md p-2'>Add Members</button>
      </div> : <div></div>}
      <div className="grid grid-cols-2 gap-8  mt-20 mx-auto w-[70rem] text-center">
      
        {data.teammembers.map((data) => {
          return <MemberCard data={data}/>
        })}
      </div>
      <div className='flex justify-center mt-16'>
        <button className='bg-red-700 w-40 rounded-md p-2'>Delete Team</button>
      </div>
    </div>
  )
}
