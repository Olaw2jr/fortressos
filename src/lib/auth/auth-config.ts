// src/lib/auth/auth-config.ts
import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";

// Define a custom merged type to accommodate our auth options structure
type CustomAuthConfig = NextAuthConfig & {
  callbacks: typeof authOptions.callbacks;
  adapter: typeof authOptions.adapter;
  session: typeof authOptions.session;
}

// Use the custom type to ensure compatibility
export const { 
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth(authOptions as CustomAuthConfig);
