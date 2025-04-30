// app/page.tsx
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

export default async function HomePage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (userId && user) {
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (userExists?.role === "DOCTOR") {
      return redirect("/doctor/dashboard");
    } else if (userExists?.role === "PATIENT") {
      return redirect("/patient/dashboard");
    }

    if (!userExists) {
      await prisma.user.create({
        data: {
          id: userId,
          email: user.emailAddresses[0].emailAddress ?? "",
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          profileImageUrl:
            user.imageUrl ?? `https://avatar.vercel.sh/${user.firstName}`,
        },
      });
      return redirect("/onboarding");
    } else {
      return redirect("/onboarding");
    }
  }

  return (
    <div>
      <h1 className="text-primary">Welcome to Next.js!</h1>
      <p>This is a simple page.</p>
      <div className="flex justify-center items-center gap-5">
        <SignedOut>
          <Button asChild>
            <Link href={"/sign-in"}>Sign in</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <SignOutButton />
        </SignedIn>
      </div>
    </div>
  );
}
