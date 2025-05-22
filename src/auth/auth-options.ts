// src/auth/auth-options.ts
export const authOptions = {
  // ...other options
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Check if account is locked
      const userRecord = await db.user.findUnique({
        where: { email: credentials.email }
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
            lockedUntil: userRecord?.failedLoginAttempts >= 4 
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