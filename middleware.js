import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
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

async function getDetails(token, idToken, email) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/user/details`,
        {
            method: "PATCH",
            body: JSON.stringify({
                token: idToken,
                email: email,
            }),
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
        const userData = token ? await getUserData(token?.accessTokenFromBackend) : null;
        const idToken = token?.idToken;
        const email = token?.user.email;
        const userDetails = token ? await getDetails(token?.accessTokenFromBackend, idToken, email) : null;
        const hasFilledDetails = userDetails?.hasFilledDetails;
        const eHackTeamRole = userData?.user.eHackTeamRole;
        const impetusTeamRole = userData?.user.impetusTeamRole;
        const innoventureTeamRole = userData?.user.innoventureTeamRole;

        const userArray = userData?.user.registeredEvents;

        if (req.nextUrl.pathname.startsWith("/manage/ehack")
            || req.nextUrl.pathname.startsWith("/manage/impetus")
            || req.nextUrl.pathname.startsWith("/manage/innoventure")
            || req.nextUrl.pathname.startsWith("/schedule")) {
            if (!hasFilledDetails) {
                return NextResponse.redirect(new URL("/getdetails", req.url))
            }
        }

        if (req.nextUrl.pathname.startsWith("/manage/ehack")) {
            if (userArray[1] != 1) {
                req.nextUrl.pathname = "/"
                return NextResponse.redirect(new URL("/", req.url))
            }
            console.log("eHackTeamRole!!!", eHackTeamRole);

            //Leader routes block for User and Member
            if ((eHackTeamRole === null || eHackTeamRole === 1) && (req.nextUrl.pathname.startsWith("/manage/ehack/leader-sent") || req.nextUrl.pathname.startsWith("/manage/ehack/leader-received") || req.nextUrl.pathname.startsWith("/manage/ehack/add-members"))) {
                req.nextUrl.pathname = "/"
                return NextResponse.redirect(new URL("/", req.url))
            }

            //User routes block for Member and Leader
            if ((eHackTeamRole === 0 || eHackTeamRole === 1) && (req.nextUrl.pathname.startsWith("/manage/ehack/user-sent") || req.nextUrl.pathname.startsWith("/manage/ehack/user-received") || req.nextUrl.pathname.startsWith("/manage/ehack/received-join-teams") || req.nextUrl.pathname.startsWith("/manage/ehack/join-teams"))) {
                req.nextUrl.pathname = "/"
                return NextResponse.redirect(new URL("/", req.url))
            }

        }

        else if (req.nextUrl.pathname.startsWith("/manage/impetus")) {

            if (userArray[2] === 1) {
                req.nextUrl.pathname = "/"
                return NextResponse.redirect(new URL("/", req.url))
            }

            if (userArray[0] != 1) {
                req.nextUrl.pathname = "/"
                return NextResponse.redirect(new URL("/", req.url))
            }

            //Leader routes block for User and Member
            if ((impetusTeamRole === null || impetusTeamRole === 1) && (req.nextUrl.pathname.startsWith("/manage/impetus/leader-sent") || req.nextUrl.pathname.startsWith("/manage/impetus/leader-received") || req.nextUrl.pathname.startsWith("/manage/impetus/add-members"))) {
                req.nextUrl.pathname = "/"
                return NextResponse.redirect(new URL("/", req.url))
            }

            //User routes block for Member and Leader
            if ((impetusTeamRole === 0 || impetusTeamRole === 1) && (req.nextUrl.pathname.startsWith("/manage/impetus/user-sent") || req.nextUrl.pathname.startsWith("/manage/impetus/user-received") || req.nextUrl.pathname.startsWith("/manage/impetus/received-join-teams") || req.nextUrl.pathname.startsWith("/manage/impetus/join-teams"))) {
                req.nextUrl.pathname = "/"
                return NextResponse.redirect(new URL("/", req.url))
            }

        }
        else if (req.nextUrl.pathname.startsWith("/manage/innoventure")) {

            if (userArray[0] === 1) {
                req.nextUrl.pathname = "/"
                return NextResponse.redirect(new URL("/", req.url))
            }

            if (userArray[2] !== 1) {
                req.nextUrl.pathname = "/"
                return NextResponse.redirect(new URL("/", req.url))
            }

            //Leader routes block for User and Member
            if ((innoventureTeamRole === null || innoventureTeamRole === 1) && (req.nextUrl.pathname.startsWith("/manage/innoventure/leader-sent") || req.nextUrl.pathname.startsWith("/manage/innoventure/leader-received") || req.nextUrl.pathname.startsWith("/manage/innoventure/add-members"))) {
                req.nextUrl.pathname = "/"
                return NextResponse.redirect(new URL("/", req.url))
            }

            //User routes block for Member and Leader
            if ((innoventureTeamRole === 0 || innoventureTeamRole === 1) && (req.nextUrl.pathname.startsWith("/manage/innoventure/user-sent") || req.nextUrl.pathname.startsWith("/manage/innoventure/user-received") || req.nextUrl.pathname.startsWith("/manage/innoventure/received-join-teams") || req.nextUrl.pathname.startsWith("/manage/innoventure/join-teams"))) {
                req.nextUrl.pathname = "/"
                return NextResponse.redirect(new URL("/", req.url))
            }
        }
        return null;
    }, {
    callbacks: {
        async authorized() {
            return true
        },
    },
}
)

export const config = { matcher: ["/schedule", "/manage/:path*"] }
