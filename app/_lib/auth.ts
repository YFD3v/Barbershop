import { db } from "@/app/_lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions, Session } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  //Indicando o adaptador que será utilizado, nesse caso o Prisma
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session = {
        ...session,
        user:{
          name: user.name,
          email: user.email,
          image: user.image,
          id: user.id
        }
      }
      return session as any;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
