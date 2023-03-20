import CreateTeam from "./createTeam";
import LeaderDashboard from "./leaderDashboard";
import MemberDashboard from "./memberDashboard";

import "../styles/landing.css";
export default function Dashboard({
  eventName,
  hasTeam,
  userData,
  userRole,
  session,
}) {
  return hasTeam ? (
    userRole ? (
      <MemberDashboard
        userData={userData}
        eventName={eventName}
        userRole={userRole}
        session={session}
      />
    ) : (
      <LeaderDashboard
        userData={userData}
        eventName={eventName}
        session={session}
      />
    )
  ) : (
    <CreateTeam eventName={eventName} session={session} />
  );
}
