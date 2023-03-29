import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import RoundZero from "./Round0";

export default async function page(){
    const session = await getServerSession(authOptions);

    return (
        <RoundZero accessTokenBackend={session.accessTokenBackend}/>
    )
}
