import NotFilledDetails from "./NotFilledDetails";
import { signIn, signOut } from "next-auth/react";
import { NextResponse } from 'next/server'

export default async function hasDetailsFilled(session) {
  async function getData(session) {
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
      if(res.status === 401){
        signOut({ callbackUrl: "/" });
      }
      return NextResponse.redirect(new URL("/", req.url))
    }
    return res.json();
  }
  const response = await getData(session);
  if (response?.hasDetailsFilled) {
    return true;
  }
  return false;
}
