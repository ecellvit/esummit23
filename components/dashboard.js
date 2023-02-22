import CreateTeam from './createTeam'
import LeaderDashboard from './leaderDashboard'

export default function Dashboard({x}) {
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
  return <>{userData.teamEvents[x].teamID != null ? <LeaderDashboard data={userData.teamEvents[x]} /> : <CreateTeam />}</>
}
