// src/lib/db.ts
import { PrismaClient } from "@prisma/client";

// Properly extend the global scope to include our prisma client
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Use a single instance of Prisma Client in development
export const db = globalThis.prisma || new PrismaClient();

// In development, store the instance on the global object to prevent multiple instances
if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
