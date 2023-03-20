import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import NotLoggedIn from "../../components/NotLoggedIn";
import DetailsForm from "./DetailsForm";
import { redirect } from "next/navigation";

async function getData(session) {
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
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }
}

export default async function page() {
  const session = await getServerSession(authOptions);

  const response = await getData(session);

  if (response?.hasFilledDetails) {
    return redirect("/")
  }

  if (!session) {
    return < NotLoggedIn />
  }

  return (
    <DetailsForm
      accessTokenBackend={session?.accessTokenBackend}
    ></DetailsForm>
  );
} 
