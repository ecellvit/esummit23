import Dashboard from "@/components/dashboard";
import NotyNav from "@/components/notyNav";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import "../../../styles/landing.css";
import CardsTeam from "../CardsTeam";
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
  const userData = data.user[eventName + "TeamId"];
  const userRole = data.user[eventName + "TeamRole"];

  console.log("userData ran", userData);
  let hasTeam = false;
  if (userData) {
    hasTeam = true;
  }
  return (
    <>
      <div class="create_cont">
        <NotyNav eventName={eventName} />
        <div class="ehack_cont">
          <h1 class="join_h1">Join a Team</h1>
          <button class="handleteam w-button">Find Team</button>
          <h1 class="join_h1 bold">Or</h1>
          <h1 class="join_h1">Create Your Team</h1>
          <div class="w-form">
            <input
              type="text"
              class="team w-input"
              maxlength="256"
              name="name"
              data-name="Name"
              placeholder=""
              id="name"
            />
          </div>
          <button class="handleteam w-button">Create Team</button>
        </div>
      </div>
      <div>
        <CardsTeam></CardsTeam>
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
