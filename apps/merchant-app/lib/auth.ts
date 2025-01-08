import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import PrismaClient from "@repo/db/client"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "1079436622891-rj23naf6kkf45j8phepe7c168dmfd3ia.apps.googleusercontent.com",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "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",
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      console.log("hi signin");
      // Check for user and email
      if (!user || !user.email) {
        return false;
      }

      // Upsert user into the database
      await PrismaClient.merchant.upsert({
        select: {
          id: true,
        },
        where: {
          email: user.email,
        },
        create: {
          email: user.email,
          name: user.name || "Unknown User",
          auth_type: account.provider === "google" ? "Google" : "Github", // Prisma type
        },
        update: {
          name: user.name || "Unknown User",
          auth_type: account.provider === "google" ? "Google" : "Github", // Prisma type
        },
      });

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
};
