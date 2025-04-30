// import prisma from "@/lib/db";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const { userId } = await auth();
//   const user = await currentUser();

//   if (!user || !userId) {
//     throw new Error("Something went wrong.");
//   }

//   const userExist = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//   });

//   if (!userExist) {
//     const newUser = await prisma.user.create({
//       data: {
//         id: userId,
//         email: user.emailAddresses[0].emailAddress ?? "",
//         firstName: user.firstName ?? "",
//         lastName: user.lastName ?? "",
//         profileImageUrl:
//           user.imageUrl ?? `https://avatar.vercel.sh/${user.firstName}`,
//       },
//     });

//     if (newUser) console.log("User created in database");
//     else console.log("User not created in database");

//     return NextResponse.redirect("http://localhost:3000/onboarding");
//   } else {
//     return NextResponse.redirect("http://localhost:3000/");
//   }
// }

import prisma from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("Received request to create user");
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!user || !userId) {
      console.error("No user or userId found");
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    console.log("Checking if user exists in database...");
    const userExist = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (userExist) {
      console.log("User already exists in database");
      return NextResponse.redirect(new URL("/", request.url));
    }

    console.log("Attempting to create user in database...");
    const newUser = await prisma.user.create({
      data: {
        id: userId,
        email: user.emailAddresses[0].emailAddress ?? "",
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        profileImageUrl:
          user.imageUrl ?? `https://avatar.vercel.sh/${user.firstName}`,
      },
    });

    if (!newUser) {
      console.error("Failed to create user in database");
      throw new Error("User creation failed");
    }

    console.log("User successfully created:", newUser);
    return NextResponse.redirect(new URL("/onboarding", request.url));
  } catch (error) {
    console.error("Error in create-user route:", error);
    return NextResponse.redirect(
      new URL("/sign-in?error=user_creation_failed", request.url)
    );
  }
}
