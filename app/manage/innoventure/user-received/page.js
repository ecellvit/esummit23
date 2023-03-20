import UserReceivedReq from "@/components/userReceivedReq";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import NotyNav from "@/components/notyNav";
import Taskbar from "@/app/componentsSSR/taskbar";
async function addMemberData(session) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/user/innoventure/addMember`,
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

export default async function UserReceived() {
  const eventName = "innoventure";
  const session = await getServerSession(authOptions);
  const data = await addMemberData(session);
  const requests = data.requests;
  return (
    <div>
      <Taskbar eventName={eventName} />
      <UserReceivedReq
        eventName={eventName}
        requests={requests}
        session={session}
      />
    </div>
  );
}
