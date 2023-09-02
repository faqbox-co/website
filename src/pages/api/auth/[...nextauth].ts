import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import connect from "@/database/conn";
import UserModel from "@/models/user.model";
import CustomSession from "@/types/custom-session";

import type { NextAuthOptions } from "next-auth";

const invalidUsernames = [
  "faqbocs",
  "_next",
  "api",
  "auth",
  "contact",
  "guides",
  "privacy",
  "terms",
  "start",
  "404",
  "500",
  "card-2.png",
  "card.png",
  "faqbocs-favicon.png",
  "favicon.ico",
  "logo-light.png",
  "next.svg",
  "robots.txt",
  "round-logo-light.png",
  "vercel.svg",
];

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt(ctx) {
      await connect();
      const token = ctx.token;
      const session = ctx.session;

      const found = await UserModel.findOne({
        email: token.email,
        google: true,
      });

      if (found) {
        token.username = found.username;
      }

      if (ctx.trigger === "update") {
        const username = session.username as string | null;

        if (await UserModel.findOne({ username })) {
          return token;
        }

        if (username && invalidUsernames.includes(username)) {
          return token;
        }

        token.username = username;
        await new UserModel({
          name: token.name,
          username,
          google: true,
          email: token.email,
        }).save();
      }

      return token;
    },
    async session(ctx) {
      console.debug("Session API called.");
      try {
        await connect();
      } catch (err: any) {
        console.error(err.stack);
      }

      const session = ctx.session as CustomSession;
      const user = await UserModel.findOne({
        email: session.user?.email,
        google: true,
      });

      if (user) session.username = user.username;

      return session;
    },
  },
  pages: {
    // signIn: "/auth/login",
    error: "/error",
  },
};

export default NextAuth(authOptions);
