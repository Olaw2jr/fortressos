import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth/auth-config";

// Validation schema for the account update
const updateSchema = z.object({
  name: z.string().min(2).max(30),
  email: z.string().email(),
  language: z.string(),
  timezone: z.string(),
  bio: z.string().max(160).optional(),
  avatar: z.string().url().optional(),
  dob: z.string().or(z.date()).optional(), // Accept string or date for DOB
});

export async function POST(req: NextRequest) {
  try {
    // Get the current session
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "You must be logged in to update your account" },
        { status: 401 }
      );
    }

    // Get the user ID from the session
    const userId = session.user.id;

    if (!userId) {
      return NextResponse.json(
        { message: "Invalid user session" },
        { status: 400 }
      );
    }

    // Parse the request body
    const body = await req.json();
    
    // Validate the data
    const validatedData = updateSchema.parse(body);

    // Update the user in the database
    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        name: validatedData.name,
        email: validatedData.email,
        image: validatedData.avatar,
        // Store additional user preferences in a JSON field or dedicated table
        // This is a simplified example assuming you have these fields in your User model
        // You might need to adjust this based on your actual database schema
      },
    });

    // Return the updated user data
    return NextResponse.json(
      { 
        message: "Account updated successfully",
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          image: updatedUser.image,
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating account:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid data", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
