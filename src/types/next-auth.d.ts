import "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      
      // Appearance settings
      theme?: string
      font?: string
      
      // Notification settings
      notificationType?: string
      mobilePushEnabled?: boolean
      communicationEmails?: boolean
      marketingEmails?: boolean
      socialEmails?: boolean
      securityEmails?: boolean
      
      // Security settings
      twoFactorEnabled?: boolean
    } & DefaultSession["user"]
  }
  
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id: string
    email: string
    name?: string | null
    image?: string | null
    
    // Appearance settings
    theme?: string
    font?: string
    
    // Notification settings
    notificationType?: string
    mobilePushEnabled?: boolean
    communicationEmails?: boolean
    marketingEmails?: boolean
    socialEmails?: boolean
    securityEmails?: boolean
    
    // Security settings
    twoFactorEnabled?: boolean
  }
}

// Extend the JWT type to include our custom fields
declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    name?: string | null
    picture?: string | null
    
    // Appearance settings
    theme?: string
    font?: string
    
    // Notification settings
    notificationType?: string
    mobilePushEnabled?: boolean
    communicationEmails?: boolean
    marketingEmails?: boolean
    socialEmails?: boolean
    securityEmails?: boolean
    
    // Security settings
    twoFactorEnabled?: boolean
  }
}
