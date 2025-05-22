// src/auth/auth-options.ts
import { db } from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is just a placeholder, actual auth is handled elsewhere
        return null;
      }
    })
  ],
  callbacks: {
    async signIn(params: { 
      user: any;
      account?: any;
      profile?: any;
      email?: any;
      credentials?: Record<string, any>;
    }) {
      const { user, credentials } = params;
      // Check if account is locked
      // Only proceed if credentials exist
      if (!credentials?.email) return true;
      
      const userRecord = await db.user.findUnique({
        where: { email: credentials.email as string }
      });
      
      if (userRecord?.lockedUntil && userRecord.lockedUntil > new Date()) {
        return false; // Account is locked
      }
      
      // Handle failed login attempts
      if (!user) {
        await db.user.update({
          where: { email: credentials.email },
          data: {
            failedLoginAttempts: {
              increment: 1
            },
            lockedUntil: userRecord?.failedLoginAttempts && userRecord.failedLoginAttempts >= 4 
              ? new Date(Date.now() + 30 * 60 * 1000) // Lock for 30 minutes
              : null
          }
        });
      }
      
      // Reset failed attempts on successful login
      if (user) {
        await db.user.update({
          where: { id: user.id },
          data: {
            failedLoginAttempts: 0,
            lockedUntil: null,
            lastLogin: new Date()
          }
        });
      }
      
      return !!user;
    },
    // ...other callbacks
  }
}