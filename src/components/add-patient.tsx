"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, UserPlus } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  email: string;
  dob: string;
  phone: string;
  address: string;
  city: string;
  condition: string;
  allergies: string;
  medicalHistory: string;
}

interface AddPatientProps {
  onPatientAdded?: (patient: Patient) => void;
  trigger?: React.ReactNode;
}

export default function AddPatient({
  onPatientAdded,
  trigger,
}: AddPatientProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    phone: "",
    address: "",
    city: "",
    condition: "",
    allergies: "",
    medicalHistory: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real application, this would be an API call to add the patient to the database
      // For demo purposes, we'll simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create a new patient object with a generated ID
      const newPatient: Patient = {
        ...formData,
        id: Math.random().toString(36).substring(2, 9),
      };

      // Call the onPatientAdded callback if provided
      if (onPatientAdded) {
        onPatientAdded(newPatient);
      }

      //   // Show success toast
      //   toast({
      //     title: "Patient added successfully",
      //     description: `${formData.name} has been added to your patient list.`,
      //   });

      // Reset form and close dialog
      setFormData({
        name: "",
        email: "",
        dob: "",
        phone: "",
        address: "",
        city: "",
        condition: "",
        allergies: "",
        medicalHistory: "",
      });
      setOpen(false);
    } catch (error) {
      //   toast({
      //     title: "Error adding patient",
      //     description: "There was an error adding the patient. Please try again.",
      //     variant: "destructive",
      //   });
    } finally {
      setLoading(false);
    }
  };

  const defaultTrigger = (
    <Button>
      <UserPlus className="mr-2 h-4 w-4" /> Add Patient
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
          <DialogDescription>
            Enter the patient's information to add them to your patient list.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="required">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob" className="required">
                  Date of Birth
                </Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="(123) 456-7890"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="123 Main St"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="New York"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition" className="required">
                  Medical Condition
                </Label>
                <Input
                  id="condition"
                  name="condition"
                  placeholder="e.g., Hypertension"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Input
                  id="allergies"
                  name="allergies"
                  placeholder="e.g., Penicillin"
                  value={formData.allergies}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="medicalHistory">Medical History</Label>
              <Textarea
                id="medicalHistory"
                name="medicalHistory"
                placeholder="Enter patient's medical history..."
                className="min-h-[100px]"
                value={formData.medicalHistory}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Patient
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
