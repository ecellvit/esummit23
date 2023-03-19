import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server'

const eventCodes = [
    "IMPETUS",
    "EHACK",
    "INNOVENTURE",
    "EVENT_4",
    "EVENT_5",
    "EVENT_6",
];

async function getUserData(token) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/user`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
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


export default withAuth({
    callbacks: {
        async authorized({ req, token }) {

            const userData = await getUserData(token.accessTokenFromBackend);
            const userArray = userData?.user.registeredEvents;
            console.log("userArray!!!", userArray)
            console.log("path", req.nextUrl.pathname)

            if (req.nextUrl.pathname === "/manage/ehack") {
                if (userArray[1] != 1) {
                    return NextResponse.redirect(new URL('/', req.url))
                }
            }
            else if (req.nextUrl.pathname === "/manage/impetus") {
                if (userArray[0] != 1) {
                    return NextResponse.redirect(new URL('/', req.url))
                }
            }
            else if (req.nextUrl.pathname === "/manage/innoventure") {
                console.log("in in")
                if (userArray[2] !== 1) {
                    console.log("yoyo", req.url)
                    // console.log("yoyo", req.nextUrl.pathname)
                    // return true;
                    return NextResponse.redirect(new URL('/', req.url))
                }
            }
            return !!token.accessTokenFromBackend;
        }
    }
})

export const config = { matcher: ["/schedule", "/manage/:path*"] }