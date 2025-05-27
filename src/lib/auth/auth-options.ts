// src/lib/auth/auth-options.ts
import { db } from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

// Custom types for the callbacks
type AuthUser = {
  id: string;
  name?: string;
  email?: string;
  twoFactorEnabled?: boolean;
};



type CustomSession = {
  user?: AuthUser;
  expires: string;
};

type JWTCallbackParams = {
  token: {
    sub?: string;
    [key: string]: unknown;
  };
  user?: AuthUser;
};

type SessionCallbackParams = {
  session: CustomSession;
  token: {
    sub?: string;
    [key: string]: unknown;
  };
};

// We're going to remove this unused utility function

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        code: { label: "2FA Code", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        
        // Handle authentication
        // Log the credentials for debugging
        console.log('Auth credentials received:', JSON.stringify(credentials));
        
        // Check for magic token authentication (pre-verified by our magic link flow)
        if (credentials && typeof credentials === 'object' && 
            'magicToken' in credentials && 
            credentials.magicToken === 'true' && 
            credentials.email) {
          try {
            // For magic token auth, we've already verified the user in the magic link flow
            // We just need to find and return the user
            const user = await db.user.findUnique({
              where: { email: credentials.email as string }
            });
            
            if (!user) return null;
            
            // Update last login time
            await db.user.update({
              where: { id: user.id },
              data: { lastLogin: new Date() }
            });
            
            // Return user for successful magic token authentication
            return {
              id: user.id,
              name: user.name,
              email: user.email
            };
          } catch (error) {
            console.error("Magic token authentication error:", error);
            return null;
          }
        }
        
        // Legacy magic link authentication (backwards compatibility)
        if (credentials && typeof credentials === 'object' && 
            'isMagicLink' in credentials && 
            credentials.isMagicLink === 'true' && 
            credentials.email) {
          try {
            // Find user by email
            const user = await db.user.findUnique({
              where: { email: credentials.email as string }
            });
            
            if (!user) return null;
            
            // Make sure the user's email is verified
            if (!user.emailVerified) {
              await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
              });
            }
            
            // Return user for successful magic link authentication
            return {
              id: user.id,
              name: user.name,
              email: user.email
            };
          } catch (error) {
            console.error("Magic link authentication error:", error);
            return null;
          }
        }
        
        // For non-magic link auth, return null (handled elsewhere)
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
    verifyRequest: '/verify-email',
    newUser: '/dashboard'
  },
  callbacks: {
    async signIn(params: {
      user: AuthUser;
      account?: unknown;
      profile?: unknown;
      email?: string;
    }) {
      const { user } = params;
      // Check if account is locked
      // Only proceed if email exists
      if (!params.email) return true;

      const userRecord = await db.user.findUnique({
        where: { email: params.email as string }
      });

      if (userRecord?.lockedUntil && userRecord.lockedUntil > new Date()) {
        return false; // Account is locked
      }

      // Handle failed login attempts
      if (!user) {
        await db.user.update({
          where: { email: params.email },
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
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session, token }: SessionCallbackParams) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      // Add additional user data to session
      if (session.user?.email) {
        const user = await db.user.findUnique({
          where: { email: session.user.email },
          select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            // role will be added to schema in future updates
            // role: true,
            twoFactorEnabled: true,
          }
        });

        if (user) {
          session.user.id = user.id;
          // Handle null values by converting them to undefined
          session.user.name = user.name || undefined;
          // Role will be added in future updates
          // session.user.role = user.role;
          session.user.twoFactorEnabled = user.twoFactorEnabled || undefined;
        }
      }

      return session;
    },
    async jwt({ token, user }: JWTCallbackParams) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}
