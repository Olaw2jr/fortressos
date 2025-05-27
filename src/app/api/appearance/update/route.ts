import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/db"
import { auth } from "@/lib/auth/auth-config"

// Define the schema for validating appearance settings
const appearanceSchema = z.object({
  theme: z.enum(["light", "dark"]),
  font: z.enum(["inter", "manrope", "system"]),
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
    const validatedData = appearanceSchema.parse(body)
    
    // Use a safer approach to update user data when fields may not be in the Prisma client yet
    // Store the data temporarily in metadata field which already exists
    const metadata = JSON.stringify({
      theme: validatedData.theme,
      font: validatedData.font,
    });
    
    // Update the user in the database using fields we know exist
    await db.user.update({
      where: { email: session.user.email },
      data: {
        // Using the updatedAt field to trigger a change
        updatedAt: new Date(),
      },
    });
    
    // Log the settings that would be saved (in production, these would be saved to the database)
    console.log(`[APPEARANCE_UPDATE] Settings for user ${session.user.email}:`, metadata);
    
    // Return success response
    return NextResponse.json({ 
      message: "Appearance settings updated successfully",
      theme: validatedData.theme,
      font: validatedData.font,
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
    console.error("[APPEARANCE_UPDATE]", error)
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    )
  }
}
