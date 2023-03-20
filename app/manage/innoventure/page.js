import Taskbar from "@/app/componentsSSR/taskbar";
import Dashboard from "@/components/dashboard";
import NotyNav from "@/components/notyNav";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

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

export default async function ManagePage() {
  const eventName = "innoventure";
  const session = await getServerSession(authOptions);
  const data = await getUserData(session);
  const userData = data.user[eventName + "TeamId"];
  const userRole = data.user[eventName + "TeamRole"];

  let hasTeam = false;
  if (userData) {
    hasTeam = true;
  }
  return (
    <>
      <Taskbar eventName={eventName} />
      <Dashboard
        eventName={eventName}
        session={session}
        hasTeam={hasTeam}
        userData={userData}
        userRole={userRole}
      />
    </>
  );
}
