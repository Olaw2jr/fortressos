import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/db"
import { auth } from "@/lib/auth/auth-config"

// Define the schema for toggling two-factor authentication
const toggleTwoFactorSchema = z.object({
  enabled: z.boolean(),
})

export async function POST(req: Request) {
  try {
    // Get the session
    const session = await auth()
    
    // If no session or no user, return unauthorized
    if (!session || !session.user || !session.user.email) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 401 }
      )
    }
    
    // Parse the request body
    const body = await req.json()
    
    // Validate the request body against the schema
    const validatedData = toggleTwoFactorSchema.parse(body)
    
    // Get the user from the database
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        twoFactorEnabled: true,
      },
    })
    
    // If no user, return error
    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      )
    }
    
    // If enabling 2FA and it's not already enabled, generate a secret
    if (validatedData.enabled && !user.twoFactorEnabled) {
      // For simplicity, we're just enabling/disabling 2FA without generating actual TOTP secrets
      // In a production app, you would use a library like 'otplib' to generate TOTP secrets
      
      // Update the user's 2FA settings in the database
      await db.user.update({
        where: { id: user.id },
        data: {
          twoFactorEnabled: true,
          // In a real implementation, you would set twoFactorSecret here
        },
      })
      
      // For now, we'll just log the event instead of creating an AuthLog entry
      console.log("[SECURITY_EVENT] Two-factor authentication enabled for user:", user.id)
      
      return NextResponse.json({ 
        message: "Two-factor authentication enabled",
        enabled: true,
      })
    } 
    // If disabling 2FA
    else if (!validatedData.enabled && user.twoFactorEnabled) {
      // Update the user's 2FA settings in the database
      await db.user.update({
        where: { id: user.id },
        data: {
          twoFactorEnabled: false,
          twoFactorSecret: null,
          twoFactorBackupCodes: null,
        },
      })
      
      // For now, we'll just log the event instead of creating an AuthLog entry
      console.log("[SECURITY_EVENT] Two-factor authentication disabled for user:", user.id)
      
      return NextResponse.json({ 
        message: "Two-factor authentication disabled",
        enabled: false,
      })
    }
    // If the requested state matches the current state, just return success
    else {
      return NextResponse.json({ 
        message: `Two-factor authentication is already ${validatedData.enabled ? "enabled" : "disabled"}`,
        enabled: validatedData.enabled,
      })
    }
  } catch (error) {
    // If it's a validation error, return a 400 Bad Request
    if (error instanceof z.ZodError) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid data", errors: error.errors }),
        { status: 400 }
      )
    }
    
    // For other errors, return a generic error message
    console.error("[TOGGLE_TWO_FACTOR]", error)
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    )
  }
}
