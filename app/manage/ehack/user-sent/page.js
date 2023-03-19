import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import UserSentComponent from "@/components/UserSentComponent";

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
    },
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function UserSent() {
  const eventName = "ehack";
  const session = await getServerSession(authOptions);
  const data = await requestSentData(session);
  console.log(session);
  //   const requests = data;
  console.log("pppp!!", data);
  return (
    // <UserReceivedReq eventName={eventName} requests={requests} session={session} />
    <UserSentComponent />
  );
}
