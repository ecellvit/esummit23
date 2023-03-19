import AddMember from "@/components/addMember";
import NotyNav from "@/components/notyNav";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

async function ehackRegistered(session) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/impetus/user`,
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
  const eventName = "impetus";
  const session = await getServerSession(authOptions);
  const data = await ehackRegistered(session);
  const users = data.impetusMembers;
  return (
    <div>
      <NotyNav eventName={eventName} />
      <AddMember
        eventName={eventName}
        session={session}
        users={users}
        eventCode={0}
      />
    </div>
  );
}
