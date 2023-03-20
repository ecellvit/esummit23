import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import JoinAllTeams from "@/components/joinAllTeams";
import NotyNav from "@/components/notyNav";
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
async function requestSentData(session) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/user/ehack/requests`,
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

async function getAllteams(session, page) {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/ehack?page=${prev.page}&limit=${prev.limit}`, {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/ehack?${page}=1&limit=9`,
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

export default async function JoinTeams() {
  const eventName = "ehack";
  const session = await getServerSession(authOptions);
  const userData = await getUserData(session);
  const sentData = await requestSentData(session);
  //console.log(sentData.requests);
  // //console.log("userID",userData?.user)
  const data = await getAllteams(session, 1);
  //   const requests = data.requests;
  return (
    <>
      <Taskbar eventName={eventName} />
      <JoinAllTeams
        session={session}
        userData={userData}
        eventName={eventName}
        sentData={sentData.requests}
      />
    </>
  );
}
