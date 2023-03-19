import Navbar from "@/components/navbar";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import AuthContext from "./AuthContext";

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <AuthContext session={session}>
      <html lang="en" className="dark">
        <head />
        <body className="min-h-screen bg-gradient-to-br from-[#245E6E] to-[#A1B7B8]">
          {" "}
          <Navbar session={session} />
          {children}
        </body>
      </html>
    </AuthContext>
  );
}
