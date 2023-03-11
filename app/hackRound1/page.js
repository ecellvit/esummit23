import NotLoggedIn from "@/components/NotLoggedIn";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import RoundOne from "./Round1";

export default async function page(){
    const session = await getServerSession(authOptions);

    if (session) {
        return (
            <RoundOne accessTokenBackend={session.accessTokenBackend}/>
        )
    } else {
        return (<NotLoggedIn></NotLoggedIn>)
    }
}
