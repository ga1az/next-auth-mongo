import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import { Connect } from "@/libs/mongodb";
import bycrypt from "bcryptjs";

const handler = NextAuth({

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@locura.com" },
        password: { label: "Password", type: "password", placeholder:"**********" }
      },
      async authorize(credentials, req) {
        await Connect();
        const userFound = await User.findOne({email: credentials?.email}).select("+password");
        if (!userFound) throw new Error("Invalid Credentials");

        const passwordMatch = await bycrypt.compare(credentials!.password, userFound.password)
        if (!passwordMatch) throw new Error("Invalid Credentials");

        return userFound;
      }
    })
  ],
  callbacks: {
    jwt({account, token, user, profile, session}){
      if (user) token.user = user;
      return token;
    },
    session({session, token}){
      session.user = token.user as any;
      return session;
    }
  },
  pages: {
    signIn: "/login",
  }

});

export {handler as GET, handler as POST}