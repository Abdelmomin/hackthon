// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   AlertCircle,
//   Bell,
//   FileText,
//   Search,
//   UserPlus,
//   Users,
// } from "lucide-react";
// import AddPatient from "@/components/add-patient";

// // Mock data based on Prisma models
// const mockPatients = [
//   {
//     user: {
//       id: "user1",
//       firstName: "John",
//       lastName: "Doe",
//       email: "john.doe@example.com",
//       profileImageUrl: null,
//       role: "patient",
//     },
//     patientProfile: {
//       id: "patient1",
//       userId: "user1",
//       dateOfBirth: new Date("1978-05-15"),
//       gender: "male",
//       phone: "(555) 123-4567",
//       address: "123 Main St, Anytown, USA",
//       medicalHistory: "History of hypertension",
//     },
//     medicalRecords: [
//       {
//         id: "record1",
//         patientId: "patient1",
//         doctorId: "doctor1",
//         diagnosis: "Hypertension",
//         recommendation: "Maintain low sodium diet",
//         createdAt: new Date("2023-04-15"),
//       },
//     ],
//   },
//   {
//     user: {
//       id: "user2",
//       firstName: "Jane",
//       lastName: "Smith",
//       email: "jane.smith@example.com",
//       profileImageUrl: null,
//       role: "patient",
//     },
//     patientProfile: {
//       id: "patient2",
//       userId: "user2",
//       dateOfBirth: new Date("1991-08-22"),
//       gender: "female",
//       phone: "(555) 987-6543",
//       address: "456 Oak Ave, Somewhere, USA",
//       medicalHistory: "Type 2 Diabetes",
//     },
//     medicalRecords: [
//       {
//         id: "record2",
//         patientId: "patient2",
//         doctorId: "doctor1",
//         diagnosis: "Diabetes Type 2",
//         recommendation: "Monitor blood glucose",
//         createdAt: new Date("2023-05-02"),
//       },
//     ],
//   },
//   {
//     user: {
//       id: "user3",
//       firstName: "Robert",
//       lastName: "Johnson",
//       email: "robert.johnson@example.com",
//       profileImageUrl: null,
//       role: "patient",
//     },
//     patientProfile: {
//       id: "patient3",
//       userId: "user3",
//       dateOfBirth: new Date("1965-03-10"),
//       gender: "male",
//       phone: "(555) 456-7890",
//       address: "789 Pine St, Elsewhere, USA",
//       medicalHistory: "Arthritis, High cholesterol",
//     },
//     medicalRecords: [
//       {
//         id: "record3",
//         patientId: "patient3",
//         doctorId: "doctor1",
//         diagnosis: "Arthritis",
//         recommendation: "Physical therapy",
//         createdAt: new Date("2023-03-28"),
//       },
//     ],
//   },
//   {
//     user: {
//       id: "user4",
//       firstName: "Emily",
//       lastName: "Davis",
//       email: "emily.davis@example.com",
//       profileImageUrl: null,
//       role: "patient",
//     },
//     patientProfile: {
//       id: "patient4",
//       userId: "user4",
//       dateOfBirth: new Date("1994-11-05"),
//       gender: "female",
//       phone: "(555) 234-5678",
//       address: "101 Maple Dr, Nowhere, USA",
//       medicalHistory: "Asthma since childhood",
//     },
//     medicalRecords: [
//       {
//         id: "record4",
//         patientId: "patient4",
//         doctorId: "doctor1",
//         diagnosis: "Asthma",
//         recommendation: "Use inhaler as prescribed",
//         createdAt: new Date("2023-05-10"),
//       },
//     ],
//   },
//   {
//     user: {
//       id: "user5",
//       firstName: "Michael",
//       lastName: "Wilson",
//       email: "michael.wilson@example.com",
//       profileImageUrl: null,
//       role: "patient",
//     },
//     patientProfile: {
//       id: "patient5",
//       userId: "user5",
//       dateOfBirth: new Date("1961-07-28"),
//       gender: "male",
//       phone: "(555) 876-5432",
//       address: "202 Cedar Ln, Anyplace, USA",
//       medicalHistory: "Coronary heart disease",
//     },
//     medicalRecords: [
//       {
//         id: "record5",
//         patientId: "patient5",
//         doctorId: "doctor1",
//         diagnosis: "Coronary Heart Disease",
//         recommendation: "Cardiac rehabilitation",
//         createdAt: new Date("2023-04-22"),
//       },
//     ],
//   },
// ];

// // Mock alerts based on Alert model
// const mockAlerts = [
//   {
//     id: "alert1",
//     patientId: "patient1",
//     vitalSignId: "vital1",
//     type: "Blood Pressure",
//     message: "Blood pressure reading of 160/95 exceeds threshold",
//     seen: false,
//     createdAt: new Date("2023-05-11T08:30:00"),
//     patient: {
//       id: "patient1",
//       user: {
//         firstName: "John",
//         lastName: "Doe",
//       },
//     },
//     vitalSign: {
//       id: "vital1",
//       patientId: "patient1",
//       recordedBy: "doctor1",
//       heartRate: 72,
//       bloodPressure: "160/95",
//       temperature: 37.2,
//       recordedAt: new Date("2023-05-11T08:30:00"),
//     },
//   },
//   {
//     id: "alert2",
//     patientId: "patient2",
//     vitalSignId: "vital2",
//     type: "Blood Glucose",
//     message: "Blood glucose reading exceeds threshold",
//     seen: false,
//     createdAt: new Date("2023-05-11T07:15:00"),
//     patient: {
//       id: "patient2",
//       user: {
//         firstName: "Jane",
//         lastName: "Smith",
//       },
//     },
//     vitalSign: {
//       id: "vital2",
//       patientId: "patient2",
//       recordedBy: "doctor1",
//       heartRate: 78,
//       bloodPressure: "130/85",
//       temperature: 36.8,
//       recordedAt: new Date("2023-05-11T07:15:00"),
//     },
//   },
//   {
//     id: "alert3",
//     patientId: "patient5",
//     vitalSignId: "vital3",
//     type: "Heart Rate",
//     message: "Heart rate of 110 bpm exceeds threshold",
//     seen: false,
//     createdAt: new Date("2023-05-10T22:45:00"),
//     patient: {
//       id: "patient5",
//       user: {
//         firstName: "Michael",
//         lastName: "Wilson",
//       },
//     },
//     vitalSign: {
//       id: "vital3",
//       patientId: "patient5",
//       recordedBy: "doctor1",
//       heartRate: 110,
//       bloodPressure: "145/90",
//       temperature: 37.5,
//       recordedAt: new Date("2023-05-10T22:45:00"),
//     },
//   },
// ];

// export default function DoctorDashboard() {
//   const [activeTab, setActiveTab] = useState("patients");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredPatients, setFilteredPatients] = useState(mockPatients);
//   const [selectedPatient, setSelectedPatient] = useState<any>(null);

//   // Calculate age from date of birth
//   const calculateAge = (dateOfBirth: Date): number => {
//     const today = new Date();
//     let age = today.getFullYear() - dateOfBirth.getFullYear();
//     const monthDiff = today.getMonth() - dateOfBirth.getMonth();
//     if (
//       monthDiff < 0 ||
//       (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
//     ) {
//       age--;
//     }
//     return age;
//   };

//   // Filter patients based on search term
//   useEffect(() => {
//     if (searchTerm) {
//       setFilteredPatients(
//         mockPatients.filter(
//           (patient) =>
//             `${patient.user.firstName} ${patient.user.lastName}`
//               .toLowerCase()
//               .includes(searchTerm.toLowerCase()) ||
//             patient.medicalRecords[0]?.diagnosis
//               .toLowerCase()
//               .includes(searchTerm.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredPatients(mockPatients);
//     }
//   }, [searchTerm]);

//   // Format date for display
//   const formatDate = (date: Date): string => {
//     return date.toISOString().split("T")[0];
//   };

//   return (
//     <div className="container mx-auto py-6 flex-1">
//       <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>

//       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//         <TabsList className="grid w-full grid-cols-3 mb-8">
//           <TabsTrigger value="patients" className="flex items-center gap-2">
//             <Users className="h-4 w-4" />
//             <span>Patients</span>
//           </TabsTrigger>
//           <TabsTrigger value="register" className="flex items-center gap-2">
//             <UserPlus className="h-4 w-4" />
//             <span>Register Patient</span>
//           </TabsTrigger>
//           <TabsTrigger value="alerts" className="flex items-center gap-2">
//             <Bell className="h-4 w-4" />
//             <span>Alerts</span>
//             <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
//               {mockAlerts.length}
//             </span>
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="patients" className="space-y-6">
//           <div className="flex justify-between items-center">
//             <div className="relative w-full max-w-sm">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search patients..."
//                 className="w-full pl-8"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <AddPatient />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <Card className="col-span-1 md:col-span-2">
//               <CardHeader>
//                 <CardTitle>Patient List</CardTitle>
//                 <CardDescription>
//                   Manage your patients and their records
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Name</TableHead>
//                       <TableHead>Age</TableHead>
//                       <TableHead>Condition</TableHead>
//                       <TableHead>Last Visit</TableHead>
//                       <TableHead>Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {filteredPatients.map((patient) => (
//                       <TableRow key={patient.user.id}>
//                         <TableCell className="font-medium">
//                           {patient.user.firstName} {patient.user.lastName}
//                         </TableCell>
//                         <TableCell>
//                           {calculateAge(patient.patientProfile.dateOfBirth)}
//                         </TableCell>
//                         <TableCell>
//                           {patient.medicalRecords[0]?.diagnosis}
//                         </TableCell>
//                         <TableCell>
//                           {formatDate(patient.medicalRecords[0]?.createdAt)}
//                         </TableCell>
//                         <TableCell>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => setSelectedPatient(patient)}
//                           >
//                             <FileText className="h-4 w-4 mr-1" /> View
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Patient Details</CardTitle>
//                 <CardDescription>
//                   {selectedPatient
//                     ? `Viewing ${selectedPatient.user.firstName} ${selectedPatient.user.lastName}'s details`
//                     : "Select a patient to view details"}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 {selectedPatient ? (
//                   <div className="space-y-4">
//                     <div>
//                       <Label>Name</Label>
//                       <div className="font-medium">
//                         {selectedPatient.user.firstName}{" "}
//                         {selectedPatient.user.lastName}
//                       </div>
//                     </div>
//                     <div>
//                       <Label>Age</Label>
//                       <div className="font-medium">
//                         {calculateAge(
//                           selectedPatient.patientProfile.dateOfBirth
//                         )}
//                       </div>
//                     </div>
//                     <div>
//                       <Label>Condition</Label>
//                       <div className="font-medium">
//                         {selectedPatient.medicalRecords[0]?.diagnosis}
//                       </div>
//                     </div>
//                     <div>
//                       <Label>Last Visit</Label>
//                       <div className="font-medium">
//                         {formatDate(
//                           selectedPatient.medicalRecords[0]?.createdAt
//                         )}
//                       </div>
//                     </div>
//                     <div className="pt-4">
//                       <Label htmlFor="recommendation">Recommendation</Label>
//                       <Textarea
//                         id="recommendation"
//                         placeholder="Add medical recommendation..."
//                         className="mt-2"
//                         defaultValue={
//                           selectedPatient.medicalRecords[0]?.recommendation
//                         }
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="threshold">Set Alert Threshold</Label>
//                       <div className="grid grid-cols-2 gap-2 mt-2">
//                         <Input id="threshold" placeholder="e.g., 140/90" />
//                         <Button>Set Alert</Button>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
//                     <FileText className="h-12 w-12 mb-4 opacity-20" />
//                     <p>Select a patient from the list to view their details</p>
//                   </div>
//                 )}
//               </CardContent>
//               {selectedPatient && (
//                 <CardFooter className="flex justify-between">
//                   <Button variant="outline">Update Record</Button>
//                   <Button>Save Changes</Button>
//                 </CardFooter>
//               )}
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="register">
//           <Card>
//             <CardHeader>
//               <CardTitle>Register New Patient</CardTitle>
//               <CardDescription>Add a new patient to the system</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <AddPatient />
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="alerts">
//           <Card>
//             <CardHeader>
//               <CardTitle>Patient Alerts</CardTitle>
//               <CardDescription>
//                 Alerts for patients exceeding set thresholds
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               {mockAlerts.length > 0 ? (
//                 <div className="space-y-4">
//                   {mockAlerts.map((alert) => (
//                     <div
//                       key={alert.id}
//                       className="flex items-start p-4 border rounded-lg bg-muted/50"
//                     >
//                       <AlertCircle className="h-5 w-5 text-destructive mr-3 mt-0.5" />
//                       <div className="space-y-1">
//                         <div className="font-medium">
//                           {alert.patient.user.firstName}{" "}
//                           {alert.patient.user.lastName}: {alert.type} Alert
//                         </div>
//                         <div className="text-sm text-muted-foreground">
//                           <span className="font-medium text-destructive">
//                             {alert.message}
//                           </span>
//                           <br />
//                           Recorded at:{" "}
//                           {alert.vitalSign.recordedAt.toLocaleString("en-US", {
//                             year: "numeric",
//                             month: "numeric",
//                             day: "numeric",
//                             hour: "numeric",
//                             minute: "numeric",
//                           })}
//                         </div>
//                         <div className="flex gap-2 mt-2">
//                           <Button size="sm" variant="outline">
//                             Dismiss
//                           </Button>
//                           <Button size="sm">Contact Patient</Button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center h-[200px] text-center text-muted-foreground">
//                   <Bell className="h-12 w-12 mb-4 opacity-20" />
//                   <p>No alerts at this time</p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  Bell,
  FileText,
  Search,
  UserPlus,
  Users,
} from "lucide-react";
import AddPatient from "@/components/add-patient";

// Mock data based on Prisma models
const mockPatients = [
  {
    user: {
      id: "user1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      profileImageUrl: null,
      role: "patient",
    },
    patientProfile: {
      id: "patient1",
      userId: "user1",
      dateOfBirth: new Date("1978-05-15"),
      gender: "male",
      phone: "(555) 123-4567",
      address: "123 Main St, Anytown, USA",
      medicalHistory: "History of hypertension",
    },
    medicalRecords: [
      {
        id: "record1",
        patientId: "patient1",
        doctorId: "doctor1",
        diagnosis: "Hypertension",
        recommendation: "Maintain low sodium diet",
        createdAt: new Date("2023-04-15"),
      },
    ],
  },
  {
    user: {
      id: "user2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      profileImageUrl: null,
      role: "patient",
    },
    patientProfile: {
      id: "patient2",
      userId: "user2",
      dateOfBirth: new Date("1991-08-22"),
      gender: "female",
      phone: "(555) 987-6543",
      address: "456 Oak Ave, Somewhere, USA",
      medicalHistory: "Type 2 Diabetes",
    },
    medicalRecords: [
      {
        id: "record2",
        patientId: "patient2",
        doctorId: "doctor1",
        diagnosis: "Diabetes Type 2",
        recommendation: "Monitor blood glucose",
        createdAt: new Date("2023-05-02"),
      },
    ],
  },
  {
    user: {
      id: "user3",
      firstName: "Robert",
      lastName: "Johnson",
      email: "robert.johnson@example.com",
      profileImageUrl: null,
      role: "patient",
    },
    patientProfile: {
      id: "patient3",
      userId: "user3",
      dateOfBirth: new Date("1965-03-10"),
      gender: "male",
      phone: "(555) 456-7890",
      address: "789 Pine St, Elsewhere, USA",
      medicalHistory: "Arthritis, High cholesterol",
    },
    medicalRecords: [
      {
        id: "record3",
        patientId: "patient3",
        doctorId: "doctor1",
        diagnosis: "Arthritis",
        recommendation: "Physical therapy",
        createdAt: new Date("2023-03-28"),
      },
    ],
  },
  {
    user: {
      id: "user4",
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.davis@example.com",
      profileImageUrl: null,
      role: "patient",
    },
    patientProfile: {
      id: "patient4",
      userId: "user4",
      dateOfBirth: new Date("1994-11-05"),
      gender: "female",
      phone: "(555) 234-5678",
      address: "101 Maple Dr, Nowhere, USA",
      medicalHistory: "Asthma since childhood",
    },
    medicalRecords: [
      {
        id: "record4",
        patientId: "patient4",
        doctorId: "doctor1",
        diagnosis: "Asthma",
        recommendation: "Use inhaler as prescribed",
        createdAt: new Date("2023-05-10"),
      },
    ],
  },
  {
    user: {
      id: "user5",
      firstName: "Michael",
      lastName: "Wilson",
      email: "michael.wilson@example.com",
      profileImageUrl: null,
      role: "patient",
    },
    patientProfile: {
      id: "patient5",
      userId: "user5",
      dateOfBirth: new Date("1961-07-28"),
      gender: "male",
      phone: "(555) 876-5432",
      address: "202 Cedar Ln, Anyplace, USA",
      medicalHistory: "Coronary heart disease",
    },
    medicalRecords: [
      {
        id: "record5",
        patientId: "patient5",
        doctorId: "doctor1",
        diagnosis: "Coronary Heart Disease",
        recommendation: "Cardiac rehabilitation",
        createdAt: new Date("2023-04-22"),
      },
    ],
  },
];

// Mock alerts based on Alert model
const mockAlerts = [
  {
    id: "alert1",
    patientId: "patient1",
    vitalSignId: "vital1",
    type: "Blood Pressure",
    message: "Blood pressure reading of 160/95 exceeds threshold",
    seen: false,
    createdAt: new Date("2023-05-11T08:30:00"),
    patient: {
      id: "patient1",
      user: {
        firstName: "John",
        lastName: "Doe",
      },
    },
    vitalSign: {
      id: "vital1",
      patientId: "patient1",
      recordedBy: "doctor1",
      heartRate: 72,
      bloodPressure: "160/95",
      temperature: 37.2,
      recordedAt: new Date("2023-05-11T08:30:00"),
    },
  },
  {
    id: "alert2",
    patientId: "patient2",
    vitalSignId: "vital2",
    type: "Blood Glucose",
    message: "Blood glucose reading exceeds threshold",
    seen: false,
    createdAt: new Date("2023-05-11T07:15:00"),
    patient: {
      id: "patient2",
      user: {
        firstName: "Jane",
        lastName: "Smith",
      },
    },
    vitalSign: {
      id: "vital2",
      patientId: "patient2",
      recordedBy: "doctor1",
      heartRate: 78,
      bloodPressure: "130/85",
      temperature: 36.8,
      recordedAt: new Date("2023-05-11T07:15:00"),
    },
  },
  {
    id: "alert3",
    patientId: "patient5",
    vitalSignId: "vital3",
    type: "Heart Rate",
    message: "Heart rate of 110 bpm exceeds threshold",
    seen: false,
    createdAt: new Date("2023-05-10T22:45:00"),
    patient: {
      id: "patient5",
      user: {
        firstName: "Michael",
        lastName: "Wilson",
      },
    },
    vitalSign: {
      id: "vital3",
      patientId: "patient5",
      recordedBy: "doctor1",
      heartRate: 110,
      bloodPressure: "145/90",
      temperature: 37.5,
      recordedAt: new Date("2023-05-10T22:45:00"),
    },
  },
];

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("patients");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Filter patients based on search term
  useEffect(() => {
    if (searchTerm) {
      setFilteredPatients(
        mockPatients.filter(
          (patient) =>
            `${patient.user.firstName} ${patient.user.lastName}`
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            patient.medicalRecords[0]?.diagnosis
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredPatients(mockPatients);
    }
  }, [searchTerm]);

  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="container mx-auto py-6 flex-1">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="patients" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Patients</span>
          </TabsTrigger>
          <TabsTrigger value="register" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            <span>Register Patient</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Alerts</span>
            <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {mockAlerts.length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="patients" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search patients..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <AddPatient />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Patient List</CardTitle>
                <CardDescription>
                  Manage your patients and their records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.user.id}>
                        <TableCell className="font-medium">
                          {patient.user.firstName} {patient.user.lastName}
                        </TableCell>
                        <TableCell>
                          {calculateAge(patient.patientProfile.dateOfBirth)}
                        </TableCell>
                        <TableCell>
                          {patient.medicalRecords[0]?.diagnosis}
                        </TableCell>
                        <TableCell>
                          {formatDate(patient.medicalRecords[0]?.createdAt)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedPatient(patient)}
                          >
                            <FileText className="h-4 w-4 mr-1" /> View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patient Details</CardTitle>
                <CardDescription>
                  {selectedPatient
                    ? `Viewing ${selectedPatient.user.firstName} ${selectedPatient.user.lastName}'s details`
                    : "Select a patient to view details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedPatient ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Name</Label>
                      <div className="font-medium">
                        {selectedPatient.user.firstName}{" "}
                        {selectedPatient.user.lastName}
                      </div>
                    </div>
                    <div>
                      <Label>Age</Label>
                      <div className="font-medium">
                        {calculateAge(
                          selectedPatient.patientProfile.dateOfBirth
                        )}
                      </div>
                    </div>
                    <div>
                      <Label>Condition</Label>
                      <div className="font-medium">
                        {selectedPatient.medicalRecords[0]?.diagnosis}
                      </div>
                    </div>
                    <div>
                      <Label>Last Visit</Label>
                      <div className="font-medium">
                        {formatDate(
                          selectedPatient.medicalRecords[0]?.createdAt
                        )}
                      </div>
                    </div>
                    <div className="pt-4">
                      <Label htmlFor="recommendation">Recommendation</Label>
                      <Textarea
                        id="recommendation"
                        placeholder="Add medical recommendation..."
                        className="mt-2"
                        defaultValue={
                          selectedPatient.medicalRecords[0]?.recommendation
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="threshold">Set Alert Threshold</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Input id="threshold" placeholder="e.g., 140/90" />
                        <Button>Set Alert</Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
                    <FileText className="h-12 w-12 mb-4 opacity-20" />
                    <p>Select a patient from the list to view their details</p>
                  </div>
                )}
              </CardContent>
              {selectedPatient && (
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Update Record</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Register New Patient</CardTitle>
              <CardDescription>Add a new patient to the system</CardDescription>
            </CardHeader>
            <CardContent>
              <AddPatient />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Patient Alerts</CardTitle>
              <CardDescription>
                Alerts for patients exceeding set thresholds
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mockAlerts.length > 0 ? (
                <div className="space-y-4">
                  {mockAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-start p-4 border rounded-lg bg-muted/50"
                    >
                      <AlertCircle className="h-5 w-5 text-destructive mr-3 mt-0.5" />
                      <div className="space-y-1">
                        <div className="font-medium">
                          {alert.patient.user.firstName}{" "}
                          {alert.patient.user.lastName}: {alert.type} Alert
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium text-destructive">
                            {alert.message}
                          </span>
                          <br />
                          Recorded at:{" "}
                          {alert.vitalSign.recordedAt.toLocaleString("en-US", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          })}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">
                            Dismiss
                          </Button>
                          <Button size="sm">Contact Patient</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[200px] text-center text-muted-foreground">
                  <Bell className="h-12 w-12 mb-4 opacity-20" />
                  <p>No alerts at this time</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
