import { NextResponse } from "next/server"
import { z } from "zod"
import bcrypt from "bcryptjs"

import { db } from "@/lib/db"
import { auth } from "@/lib/auth/auth-config"

// Define the schema for password change
const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
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
    const validatedData = passwordChangeSchema.parse(body)
    
    // Get the user from the database
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        password: true,
      },
    })
    
    // If no user or no password, return error
    if (!user || !user.password) {
      return new NextResponse(
        JSON.stringify({ message: "User not found or password not set" }),
        { status: 404 }
      )
    }
    
    // Check if current password is correct
    const isPasswordValid = await bcrypt.compare(
      validatedData.currentPassword,
      user.password
    )
    
    if (!isPasswordValid) {
      return new NextResponse(
        JSON.stringify({ message: "Current password is incorrect" }),
        { status: 400 }
      )
    }
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(validatedData.newPassword, 10)
    
    // Update the user's password in the database
    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    })
    
    // For now, we'll just log the event instead of creating an AuthLog entry
    console.log("[SECURITY_EVENT] Password changed for user:", user.id)
    
    // Return success response
    return NextResponse.json({ 
      message: "Password changed successfully"
    })
  } catch (error) {
    // If it's a validation error, return a 400 Bad Request
    if (error instanceof z.ZodError) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid data", errors: error.errors }),
        { status: 400 }
      )
    }
    
    // For other errors, return a generic error message
    console.error("[CHANGE_PASSWORD]", error)
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    )
  }
}
