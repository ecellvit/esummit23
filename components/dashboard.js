import CreateTeam from './createTeam'
import LeaderDashboard from './leaderDashboard'
import { useSession } from "next-auth/react";
import { useEffect,useState } from "react";

export default function Dashboard({eventName}) {
  const [useEffectTrigger, setUseEffectTrigger] = useState(false);
  const [hasTeam, setHasTeam] = useState(false);

  const handleTeamCreate = () => {
    setUseEffectTrigger((prevTeamStatus) => !prevTeamStatus);
  };

  const handleTeamDelete = (currentTeamStatus) => {
    setHasTeam(currentTeamStatus);
  };

  const { data: session, status } = useSession();
  const [data, setData] = useState([])
  useEffect(() => {
    session &&
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => response.json())

        .then((data) => {
          console.log("fetched",data);
          setData(data?.user);
          const user = data?.user;
          if( user[eventName + 'TeamId']){
            console.log("yoyo",user[eventName + 'TeamId'])
            setHasTeam(true);
          }
        });
  }, [session,useEffectTrigger]);

  const userData = data[eventName + 'TeamId']
  // if(userData){
  //   setHasTeam(true);
  // }
//  console.log("test",userData)
 console.log("asdf")
  return (
    hasTeam
      ? <LeaderDashboard userData={userData} eventName={eventName} handleTeamDelete={handleTeamDelete}/>
      : <CreateTeam eventName={eventName} handleTeamCreate={handleTeamCreate}/>
  );
  
}
