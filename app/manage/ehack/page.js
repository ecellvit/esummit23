import Taskbar from "@/app/componentsSSR/taskbar";
import Dashboard from "@/components/dashboard";
import NewPages from "@/components/NewPages";
import NotyNav from "@/components/notyNav";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import "../../../styles/landing.css";

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

export default async function UserSent() {
  const eventName = "eHack";
  const session = await getServerSession(authOptions);
  const data = await getUserData(session);
  //console.log("!!!!!!!@22221!!!!!",data.user);
  const userData = data.user[eventName + "TeamId"];
  const userRole = data.user[eventName + "TeamRole"];

  //console.log("userData ran", userData);
  let hasTeam = false;
  if (userData) {
    hasTeam = true;
  }
  return (
    <>
      <div className="create_cont">
        <Taskbar eventName={eventName} />
        <Dashboard
          eventName={eventName}
          session={session}
          hasTeam={hasTeam}
          userData={userData}
          userRole={userRole}
        />
      </div>
    </>
  );
}
