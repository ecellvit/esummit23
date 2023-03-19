import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server'
import { redirect } from "next/navigation";
import { getToken } from "next-auth/jwt";

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
            cache: "no-store",
        },
    );
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}


export default withAuth(

    async function middleware(req) {
        const token = await getToken({ req });
        const userData = await getUserData(token?.accessTokenFromBackend);
        const userArray = userData?.user.registeredEvents;
        if (req.nextUrl.pathname === "/manage/ehack") {
            if (userArray[1] != 1) {
                req.nextUrl.pathname = "/"
                // return NextResponse.redirect(req.nextUrl)
                return NextResponse.redirect(new URL("/", req.url))
            }
        }
        else if (req.nextUrl.pathname === "/manage/impetus") {
            if (userArray[0] != 1) {
                req.nextUrl.pathname = "/"
                // return NextResponse.redirect(req.nextUrl)
                return NextResponse.redirect(new URL("/", req.url))
            }
        }
        else if (req.nextUrl.pathname === "/manage/innoventure") {
            if (userArray[2] !== 1) {
                // console.log("yoyo", req.nextUrl.pathname)
                // return true;
                // req.nextUrl.pathname = "/"
                // console.log("next url",req.nextUrl)
                return NextResponse.redirect(new URL("/", req.url))
                // redirect('/')
            }
        }
        return null;
    }
    , {

        callbacks: {
            async authorized({ req, token }) {


                // return !!token.accessTokenFromBackend ;
                return true;
            }
        }
    }
)

export const config = { matcher: ["/schedule", "/manage/:path*"] }