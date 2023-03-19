import AddMember from "@/components/addMember";
import NotyNav from "@/components/notyNav";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

async function innoventureRegistered(session) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/innoventure/user`,
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

const eventCodes = [
  "IMPETUS",
  "EHACK",
  "INNOVENTURE",
  "EVENT_4",
  "EVENT_5",
  "EVENT_6",
];

export default async function AddMembers() {
  const eventName = "innoventure";
  const session = await getServerSession(authOptions);
  const data = await innoventureRegistered(session);
  const users = data.innoventureMembers;
  const registeredMembers = users.filter(user => user.registeredEvents[2] == 1);
  return (
    <div>
      <NotyNav eventName={eventName} />
      <AddMember eventName={eventName} session={session} users={registeredMembers} />
    </div>
  );
}
