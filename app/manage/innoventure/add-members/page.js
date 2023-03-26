import Taskbar from "@/app/componentsSSR/taskbar";
import AddMember from "@/components/addMember";
import NotyNav from "@/components/notyNav";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

// async function innoventureRegistered(session) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER}/api/innoventure/user`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${session.accessTokenBackend}`,
//         "Access-Control-Allow-Origin": "*",
//       },
//       cache: "no-store",
//     }
//   );
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

async function leaderSentInvites(session) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/innoventure/addMember`,
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

export default async function AddMembers() {
  const eventName = "innoventure";
  const session = await getServerSession(authOptions);
  // const data = await innoventureRegistered(session);
  // const users = data.innoventureMembers;
  const sentData = await leaderSentInvites(session);
  return (
    <div>
      <Taskbar eventName={eventName} />
      <AddMember
        eventName={eventName}
        session={session}
        eventCode={2}
        sentData={sentData.requests}
      />
    </div>
  );
}
