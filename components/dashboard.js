import CreateTeam from "./createTeam";
import LeaderDashboard from "./leaderDashboard";
import MemberDashboard from "./memberDashboard";

import "../styles/landing.css";
import NewPages from "./NewPages";
export default function Dashboard({
  eventName,
  hasTeam,
  userData,
  userRole,
  session,
}) {
  return hasTeam ? (
    userRole ? (
      <>
      <NewPages />
      <MemberDashboard
        userData={userData}
        eventName={eventName}
        userRole={userRole}
        session={session}
      />
      </>
    ) : (
      <>
      <NewPages />
      <LeaderDashboard
        userData={userData}
        eventName={eventName}
        session={session}
      />
      </>
    )
  ) : (
    <CreateTeam eventName={eventName} session={session} />
  );
}
