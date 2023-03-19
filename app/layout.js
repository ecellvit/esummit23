import Navbar from "@/components/navbar";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import AuthContext from "./AuthContext";
import Footer from "./Landing/Footer";

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <AuthContext session={session}>
      <html lang="en" className="dark">
        <head />
        <body>
          {" "}
          <Navbar session={session} />
          {children}
          <Footer />
        </body>
      </html>
    </AuthContext>
  );
}
