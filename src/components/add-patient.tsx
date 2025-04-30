// "use client";

// import type React from "react";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Loader2, Plus, UserPlus } from "lucide-react";

// interface Patient {
//   id: string;
//   name: string;
//   email: string;
//   dob: string;
//   phone: string;
//   address: string;
//   city: string;
//   condition: string;
//   allergies: string;
//   medicalHistory: string;
// }

// interface AddPatientProps {
//   onPatientAdded?: (patient: Patient) => void;
//   trigger?: React.ReactNode;
// }

// export default function AddPatient({
//   onPatientAdded,
//   trigger,
// }: AddPatientProps) {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     dob: "",
//     phone: "",
//     address: "",
//     city: "",
//     condition: "",
//     allergies: "",
//     medicalHistory: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // In a real application, this would be an API call to add the patient to the database
//       // For demo purposes, we'll simulate a network request
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // Create a new patient object with a generated ID
//       const newPatient: Patient = {
//         ...formData,
//         id: Math.random().toString(36).substring(2, 9),
//       };

//       // Call the onPatientAdded callback if provided
//       if (onPatientAdded) {
//         onPatientAdded(newPatient);
//       }

//       //   // Show success toast
//       //   toast({
//       //     title: "Patient added successfully",
//       //     description: `${formData.name} has been added to your patient list.`,
//       //   });

//       // Reset form and close dialog
//       setFormData({
//         name: "",
//         email: "",
//         dob: "",
//         phone: "",
//         address: "",
//         city: "",
//         condition: "",
//         allergies: "",
//         medicalHistory: "",
//       });
//       setOpen(false);
//     } catch (error) {
//       //   toast({
//       //     title: "Error adding patient",
//       //     description: "There was an error adding the patient. Please try again.",
//       //     variant: "destructive",
//       //   });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const defaultTrigger = (
//     <Button>
//       <UserPlus className="mr-2 h-4 w-4" /> Add Patient
//     </Button>
//   );

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
//       <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Add New Patient</DialogTitle>
//           <DialogDescription>
//             Enter the patient's information to add them to your patient list.
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name" className="required">
//                   Full Name
//                 </Label>
//                 <Input
//                   id="name"
//                   name="name"
//                   placeholder="John Doe"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="john@example.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="dob" className="required">
//                   Date of Birth
//                 </Label>
//                 <Input
//                   id="dob"
//                   name="dob"
//                   type="date"
//                   value={formData.dob}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="phone">Phone Number</Label>
//                 <Input
//                   id="phone"
//                   name="phone"
//                   placeholder="(123) 456-7890"
//                   value={formData.phone}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="address">Address</Label>
//                 <Input
//                   id="address"
//                   name="address"
//                   placeholder="123 Main St"
//                   value={formData.address}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="city">City</Label>
//                 <Input
//                   id="city"
//                   name="city"
//                   placeholder="New York"
//                   value={formData.city}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="condition" className="required">
//                   Medical Condition
//                 </Label>
//                 <Input
//                   id="condition"
//                   name="condition"
//                   placeholder="e.g., Hypertension"
//                   value={formData.condition}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="allergies">Allergies</Label>
//                 <Input
//                   id="allergies"
//                   name="allergies"
//                   placeholder="e.g., Penicillin"
//                   value={formData.allergies}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="medicalHistory">Medical History</Label>
//               <Textarea
//                 id="medicalHistory"
//                 name="medicalHistory"
//                 placeholder="Enter patient's medical history..."
//                 className="min-h-[100px]"
//                 value={formData.medicalHistory}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => setOpen(false)}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" disabled={loading}>
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Adding...
//                 </>
//               ) : (
//                 <>
//                   <Plus className="mr-2 h-4 w-4" />
//                   Add Patient
//                 </>
//               )}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

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
// import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, UserPlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Interface for User data
interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

// Interface for PatientProfile data
interface PatientProfileData {
  id: string;
  userId: string;
  dateOfBirth: Date;
  gender: string;
  phone: string;
  address: string;
  medicalHistory?: string;
}

// Combined interface for form data
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  address: string;
  medicalHistory: string;
}

interface AddPatientProps {
  onPatientAdded?: (user: UserData, patientProfile: PatientProfileData) => void;
  trigger?: React.ReactNode;
}

export function AddPatient({ onPatientAdded, trigger }: AddPatientProps) {
  //   const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "male",
    phone: "",
    address: "",
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

  const handleSelectChange = (name: string, value: string) => {
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

      // Generate IDs for user and patient profile
      const userId = `user_${Math.random().toString(36).substring(2, 9)}`;
      const patientId = `patient_${Math.random().toString(36).substring(2, 9)}`;

      // Create user object
      const user: UserData = {
        id: userId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: "patient",
      };

      // Create patient profile object
      const patientProfile: PatientProfileData = {
        id: patientId,
        userId: userId,
        dateOfBirth: new Date(formData.dateOfBirth),
        gender: formData.gender,
        phone: formData.phone,
        address: formData.address,
        medicalHistory: formData.medicalHistory || undefined,
      };

      // Call the onPatientAdded callback if provided
      if (onPatientAdded) {
        onPatientAdded(user, patientProfile);
      }

      // Show success toast
      //   toast({
      //     title: "Patient added successfully",
      //     description: `${formData.firstName} ${formData.lastName} has been added to your patient list.`,
      //   });

      // Reset form and close dialog
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        gender: "male",
        phone: "",
        address: "",
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
                <Label htmlFor="firstName" className="required">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="required">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="required">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="required">
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender" className="required">
                  Gender
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                  required
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="required">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="(123) 456-7890"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address" className="required">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="123 Main St, City, State, ZIP"
                  value={formData.address}
                  onChange={handleChange}
                  required
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

export default AddPatient;
