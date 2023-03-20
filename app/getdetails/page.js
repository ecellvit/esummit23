import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import NotLoggedIn from "../../components/NotLoggedIn";
import DetailsForm from "./DetailsForm";
import { signOut } from "next-auth/react";
import { NextResponse } from 'next/server'

async function getData() {
  if (session) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/user/details`,
      {
        method: "PATCH",
        body: JSON.stringify({
          token: session.idToken,
          email: session.user.email,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      if (res.status === 401) {
        signOut({ callbackUrl: "/" });
      }
      return NextResponse.redirect(new URL("/", req.url))
    }
    return res.json();
  }
}

export default async function page() {
  const session = await getServerSession(authOptions);

  const response = session ?? await getData(session);
  return (
    <>
      {!response?.hasFilledDetails ? (
        <DetailsForm
          accessTokenBackend={session.accessTokenBackend}
        ></DetailsForm>
      ) : (
        <NotLoggedIn></NotLoggedIn>
      )}
    </>
  );
} 
