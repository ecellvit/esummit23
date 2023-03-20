import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import LeaderNav from "@/components/leaderNav";
import UserNav from "@/components/userNav";

async function getData(session) {
  if (session) {
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
      if (res.status === 401) {
        signOut({ callbackUrl: "/" });
      }
      return NextResponse.redirect(new URL("/", req.url));
    }
    return res.json();
  }
}

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

export default async function Taskbar({ eventName }) {
  const session = await getServerSession(authOptions);

  const data = await getUserData(session);
  const user = data.user;

  let hasTeam = false;
  let isLeader = false;

  if (user[eventName + "TeamId"]) {
    hasTeam = true;
  }

  if (user[eventName + "TeamRole"] == 0) {
    isLeader = true;
  }

  //console.log("yoyoyooyy!!!!!!!",data)
  //console.log("!!!!!",user["eHack" + 'TeamRole'])
  //console.log("is  Leader",isLeader);

  return (
    <>
      <>
        {hasTeam ? (
          isLeader ? (
            <LeaderNav eventName={eventName} />
          ) : null
        ) : (
          <UserNav eventName={eventName} />
        )}
      </>
    </>
  );
}
