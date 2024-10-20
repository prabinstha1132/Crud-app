import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "@auth/core/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";


const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
if (!GITHUB_CLIENT_ID! || !GITHUB_CLIENT_SECRET) {
    throw new Error("missing github credentials");
}
export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({   //this handlers here related to oauth setup
    adapter: PrismaAdapter(db),
    providers: [
        Github({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
        }),
        Google({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,  
        })
    ],
    callbacks: {
        //usually not  needed here we are fixing the bugs
        async session({ session, user }: any) {
            if (session && user) {
                session.user.id = user.id;
            }
            return session;
        },
    },
});


