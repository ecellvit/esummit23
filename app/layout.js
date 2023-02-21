import { authOptions } from "@/pages/api/auth/[...nextauth]";
import "@/styles/globals.css"
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react"
import AuthContext from "./AuthContext";

export default async function RootLayout({ children }) {

  const session = await getServerSession(authOptions);

  return (
    <AuthContext session={session}>
      <html lang="en" class="dark">
        <head />
        <body>{children}</body>
      </html>
    </AuthContext>
  )
}
