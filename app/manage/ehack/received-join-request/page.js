import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import LeaderReceivedReq from "@/components/LeaderReceivedRequest";
import Taskbar from "@/app/componentsSSR/taskbar";

async function getUserData(session) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessTokenBackend}`,
      "Access-Control-Allow-Origin": "*",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function leaderReceivedReq(session, teamId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/ehack/requests/${teamId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function receivedJoinRequest() {
  const eventName = "eHack";
  const session = await getServerSession(authOptions);
  const userData = await getUserData(session);
  const data = await leaderReceivedReq(session, userData?.user.eHackTeamId._id);
  const requests = data.requests;
  const teamId = userData?.user[eventName + "TeamId"]._id;
  return (
    <>
      <Taskbar eventName={eventName} />
      <LeaderReceivedReq
        eventName={eventName}
        teamId={teamId}
        requests={requests}
        session={session}
      />
    </>
  );
}
