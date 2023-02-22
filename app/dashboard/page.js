import Dashboard from "@/components/dashboard";

export default function dashboard() {
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
      const eventCode=1;
  return (
    <div>
    //dashboard
    <Dashboard x={eventCode}/>
    </div>
  )
}
