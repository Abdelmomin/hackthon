"use server";

import { revalidatePath } from "next/cache"; // optional
import { z } from "zod";
import prisma from "../db";

const patientSchema = z.object({
  userId: z.string(),
  id: z.string(),
  dateOfBirth: z.string(), // Will convert to Date
  gender: z.string(),
  phone: z.string(),
  address: z.string(),
  medicalHistory: z.string().optional(),
});

export async function createPatientProfile(formData: unknown) {
  const data = patientSchema.parse(formData);

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { id: data.userId },
  });

  if (!existingUser) {
    return { error: "The user should have an account." };
  }

  // Check if patient profile already exists
  const existingProfile = await prisma.patientProfile.findUnique({
    where: { userId: data.userId },
  });

  if (existingProfile) {
    return { error: "Patient profile already exists." };
  }

  // Create the patient profile
  const newProfile = await prisma.patientProfile.create({
    data: {
      id: data.id,
      userId: data.userId,
      dateOfBirth: new Date(data.dateOfBirth),
      gender: data.gender,
      phone: data.phone,
      address: data.address,
      medicalHistory: data.medicalHistory,
    },
  });

  revalidatePath("/dashboard/patients"); // Optional

  return { success: true, patientProfile: newProfile };
}
