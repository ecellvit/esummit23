import CreateTeam from './createTeam'
import LeaderDashboard from './leaderDashboard'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import MemberDashboard from './memberDashboard'

export default function Dashboard({ eventName }) {
  const [useEffectTrigger, setUseEffectTrigger] = useState(false)
  const [hasTeam, setHasTeam] = useState(false)

  const handleTeamCreate = () => {
    setUseEffectTrigger((prevTeamStatus) => !prevTeamStatus)
  }

  const handleMemberLeave = () => {
    setUseEffectTrigger((prevTeamStatus) => !prevTeamStatus);
  };

  const handleMemberRemove = () => {
    setUseEffectTrigger((prevTeamStatus) => !prevTeamStatus);
  };

  const handleTeamDelete = (currentTeamStatus) => {
    setHasTeam(currentTeamStatus)
  }

  const { data: session, status } = useSession()
  const [data, setData] = useState([])
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
          console.log('fetched', data)
          setData(data?.user)
          const user = data?.user
          if (user[eventName + 'TeamId']) {
            console.log('yoyo', user[eventName + 'TeamId'])
            setHasTeam(true)
          }
        })
  }, [session, useEffectTrigger])

  const userData = data[eventName + 'TeamId']
  console.log(userData, 'userDatas')
  const userRole = data[eventName + 'TeamRole']
  console.log('role user +++++', userRole)

  console.log('asdf')
  return hasTeam ? (
    userRole ? (
      <MemberDashboard
        userData={userData}
        eventName={eventName}
        handleMemberLeave={handleMemberLeave}
        userRole={userRole}
      />
    ) : (
      <LeaderDashboard
        userData={userData}
        eventName={eventName}
        handleTeamDelete={handleTeamDelete}
        userRole={userRole}
        handleMemberRemove={handleMemberRemove}
      />
    )
  ) : (
    <CreateTeam eventName={eventName} handleTeamCreate={handleTeamCreate} />
  )
}
