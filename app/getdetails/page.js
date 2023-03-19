import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import NotLoggedIn from "../../components/NotLoggedIn";
import DetailsForm from "./DetailsForm";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session) {
    async function getData() {
      const data = await fetch(
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
        },
        { cache: "no-store" }
      );
      return data.json();
    }
    const response = await getData();
    // console.log(response);
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
  } else {
    return <NotLoggedIn></NotLoggedIn>;
  }
}
