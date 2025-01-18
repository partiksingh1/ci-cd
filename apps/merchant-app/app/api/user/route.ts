import { NextResponse } from "next/server"
import prisma from "@repo/db/client";



export const GET = async () => {
  await prisma.user.create({
    data: {
      email: "example@example.com", // Optional
      name: "John Doe",            // Optional
      number: "1234567890",        // Required
      password: "securepassword",  // Required
    },
  });
  return NextResponse.json({
    message: "User created successfully!",
  });
};