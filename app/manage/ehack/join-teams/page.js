import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeaderSentReq from "@/components/LeaderSentReq";
import JoinAllTeams from "@/components/joinAllTeams";

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
  const eventName = "eHack";
  const session = await getServerSession(authOptions);
  const userData = await getUserData(session);
  console.log("user data", userData);
  // console.log("userID",userData?.user)
  const data = await getAllteams(session, 1);
  //   const requests = data.requests;
  console.log("yoyo", data.paginatedResult);
  return (
    <>
      <JoinAllTeams
        session={session}
        userData={userData}
        eventName={eventName}
      />
    </>
  );
}
