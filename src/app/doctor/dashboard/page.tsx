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
  Plus,
  Search,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";
import AddPatient from "@/components/add-patient";

// Mock data for patients
const mockPatients = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    condition: "Hypertension",
    lastVisit: "2023-04-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 32,
    condition: "Diabetes Type 2",
    lastVisit: "2023-05-02",
  },
  {
    id: 3,
    name: "Robert Johnson",
    age: 58,
    condition: "Arthritis",
    lastVisit: "2023-03-28",
  },
  {
    id: 4,
    name: "Emily Davis",
    age: 29,
    condition: "Asthma",
    lastVisit: "2023-05-10",
  },
  {
    id: 5,
    name: "Michael Wilson",
    age: 62,
    condition: "Coronary Heart Disease",
    lastVisit: "2023-04-22",
  },
];

// Mock data for alerts
const mockAlerts = [
  {
    id: 1,
    patientName: "John Doe",
    type: "Blood Pressure",
    value: "160/95",
    timestamp: "2023-05-11 08:30",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    type: "Blood Glucose",
    value: "210 mg/dL",
    timestamp: "2023-05-11 07:15",
  },
  {
    id: 3,
    patientName: "Michael Wilson",
    type: "Heart Rate",
    value: "110 bpm",
    timestamp: "2023-05-10 22:45",
  },
];

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("patients");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  // Filter patients based on search term
  useEffect(() => {
    if (searchTerm) {
      setFilteredPatients(
        mockPatients.filter(
          (patient) =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredPatients(mockPatients);
    }
  }, [searchTerm]);

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
            {/* <Button asChild>
              <Link href="/add-patient">
                <Plus className="mr-2 h-4 w-4" /> Add Patient
              </Link>
            </Button> */}
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
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">
                          {patient.name}
                        </TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.condition}</TableCell>
                        <TableCell>{patient.lastVisit}</TableCell>
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
                    ? `Viewing ${selectedPatient.name}'s details`
                    : "Select a patient to view details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedPatient ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Name</Label>
                      <div className="font-medium">{selectedPatient.name}</div>
                    </div>
                    <div>
                      <Label>Age</Label>
                      <div className="font-medium">{selectedPatient.age}</div>
                    </div>
                    <div>
                      <Label>Condition</Label>
                      <div className="font-medium">
                        {selectedPatient.condition}
                      </div>
                    </div>
                    <div>
                      <Label>Last Visit</Label>
                      <div className="font-medium">
                        {selectedPatient.lastVisit}
                      </div>
                    </div>
                    <div className="pt-4">
                      <Label htmlFor="notes">Medical Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Add medical notes..."
                        className="mt-2"
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
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="(123) 456-7890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="New York" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condition">Medical Condition</Label>
                  <Input id="condition" placeholder="e.g., Hypertension" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Input id="allergies" placeholder="e.g., Penicillin" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="medicalHistory">Medical History</Label>
                <Textarea
                  id="medicalHistory"
                  placeholder="Enter patient's medical history..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Register Patient</Button>
            </CardFooter>
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
                          {alert.patientName}: {alert.type} Alert
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Value:{" "}
                          <span className="font-medium text-destructive">
                            {alert.value}
                          </span>{" "}
                          recorded at {alert.timestamp}
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
