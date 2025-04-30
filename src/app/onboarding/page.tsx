"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { updateUserRole } from "@/lib/actions/update-user-role";

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"DOCTOR" | "PATIENT" | null>(
    null
  );

  const handleRoleSelection = async (role: "DOCTOR" | "PATIENT") => {
    if (!user?.id) return;

    setIsSubmitting(true);
    setSelectedRole(role);

    try {
      const redirectPath = await updateUserRole(user.id, role);
      // router.push(redirectPath);
    } catch (error) {
      console.error("Error updating role:", error);
      // Optionally show error to user
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Welcome to HealthConnect
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-center text-muted-foreground">
              Please select how you'd like to continue
            </p>

            <div className="flex flex-col gap-4">
              <Button
                size="lg"
                onClick={() => handleRoleSelection("DOCTOR")}
                disabled={isSubmitting}
                className="h-14 text-lg"
                variant={selectedRole === "DOCTOR" ? "default" : "outline"}
              >
                {isSubmitting && selectedRole === "DOCTOR" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Continue as Doctor
              </Button>

              <Button
                size="lg"
                onClick={() => handleRoleSelection("PATIENT")}
                disabled={isSubmitting}
                className="h-14 text-lg"
                variant={selectedRole === "PATIENT" ? "default" : "outline"}
              >
                {isSubmitting && selectedRole === "PATIENT" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Continue as Patient
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
