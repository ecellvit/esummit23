import AddMember from '@/components/addMember'
import NotyNav from '@/components/notyNav'
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

async function ehackRegistered(session) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/eHack/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessTokenBackend}`,
      'Access-Control-Allow-Origin': '*',
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

export default async function AddMembers() {
  const session = await getServerSession(authOptions);
  const data = await ehackRegistered(session);
  const users = data.eHackMembers;
  return (
    <div>
      <NotyNav />
      <AddMember session={session} users={users}/>
    </div>
  )
}

