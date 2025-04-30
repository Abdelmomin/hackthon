"use server";

import prisma from "../db";

export const updateUserRole = async (userId: string, role: string) => {
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const updateUserRole = await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  // Return the path to redirect to instead of redirecting directly
  if (updateUserRole) {
    return role === "DOCTOR" ? "/doctor/dashboard" : "/patient/dashboard";
  } else {
    throw new Error("Failed to update user role");
  }
};
