import NotFilledDetails from "./NotFilledDetails";

export default async function hasDetailsFilled(session) {
  async function getData(session) {
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
        cache: "no-store",
      }
    );
    return data.json();
  }
  const response = await getData(session);
  if (response?.hasDetailsFilled) {
    return true;
  }
  return false;
}
