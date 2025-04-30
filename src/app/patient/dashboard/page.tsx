"use client";

import type React from "react";

import { useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Activity,
  AlertCircle,
  Calendar,
  FileText,
  Heart,
  LineChart,
  Plus,
} from "lucide-react";

// Mock data for patient's medical records
const mockMedicalRecords = [
  {
    id: 1,
    date: "2023-04-15",
    doctor: "Dr. Smith",
    diagnosis: "Hypertension",
    prescription: "Lisinopril 10mg",
  },
  {
    id: 2,
    date: "2023-03-02",
    doctor: "Dr. Johnson",
    diagnosis: "Annual Checkup",
    prescription: "None",
  },
  {
    id: 3,
    date: "2023-01-20",
    doctor: "Dr. Williams",
    diagnosis: "Influenza",
    prescription: "Tamiflu 75mg",
  },
];

// Mock data for patient's health metrics
const mockHealthMetrics = [
  {
    date: "2023-05-11",
    bloodPressure: "128/82",
    heartRate: "72",
    weight: "165",
  },
  {
    date: "2023-05-10",
    bloodPressure: "130/85",
    heartRate: "75",
    weight: "165",
  },
  {
    date: "2023-05-09",
    bloodPressure: "132/84",
    heartRate: "70",
    weight: "166",
  },
  {
    date: "2023-05-08",
    bloodPressure: "129/83",
    heartRate: "73",
    weight: "166",
  },
  {
    date: "2023-05-07",
    bloodPressure: "135/87",
    heartRate: "76",
    weight: "167",
  },
];

// Mock data for alerts
const mockAlerts = [
  {
    id: 1,
    type: "Blood Pressure",
    message:
      "Your blood pressure was above your target range. Consider contacting your doctor.",
    date: "2023-05-07",
  },
];

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [newBloodPressure, setNewBloodPressure] = useState("");
  const [newHeartRate, setNewHeartRate] = useState("");
  const [newWeight, setNewWeight] = useState("");

  const handleAddHealthData = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a database
    alert("Health data submitted successfully!");
    setNewBloodPressure("");
    setNewHeartRate("");
    setNewWeight("");
  };

  return (
    <div className="container mx-auto py-6 flex-1">
      <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="records" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Medical Records</span>
          </TabsTrigger>
          <TabsTrigger value="health-data" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Health Data</span>
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Appointments</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Your Health Summary</CardTitle>
                <CardDescription>
                  Overview of your recent health metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Blood Pressure
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {mockHealthMetrics[0].bloodPressure}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last updated: {mockHealthMetrics[0].date}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Heart Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {mockHealthMetrics[0].heartRate} bpm
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last updated: {mockHealthMetrics[0].date}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Weight
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {mockHealthMetrics[0].weight} lbs
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last updated: {mockHealthMetrics[0].date}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-2">Recent Medical Records</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Diagnosis</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockMedicalRecords.slice(0, 3).map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>{record.doctor}</TableCell>
                          <TableCell>{record.diagnosis}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setActiveTab("records")}
                >
                  View All Medical Records
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alerts & Notifications</CardTitle>
                <CardDescription>
                  Important updates about your health
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
                        <AlertCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
                        <div className="space-y-1">
                          <div className="font-medium">{alert.type} Alert</div>
                          <div className="text-sm text-muted-foreground">
                            {alert.message}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Date: {alert.date}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[200px] text-center text-muted-foreground">
                    <Heart className="h-12 w-12 mb-4 opacity-20" />
                    <p>No alerts at this time</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Acknowledge All
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Add Today's Health Data</CardTitle>
              <CardDescription>
                Keep track of your daily health metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleAddHealthData}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="bloodPressure">Blood Pressure</Label>
                  <Input
                    id="bloodPressure"
                    placeholder="e.g., 120/80"
                    value={newBloodPressure}
                    onChange={(e) => setNewBloodPressure(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                  <Input
                    id="heartRate"
                    placeholder="e.g., 72"
                    value={newHeartRate}
                    onChange={(e) => setNewHeartRate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input
                    id="weight"
                    placeholder="e.g., 165"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                  />
                </div>
                <div className="md:col-span-3">
                  <Button type="submit" className="w-full md:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> Add Health Data
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>Your complete medical history</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Prescription</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMedicalRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.doctor}</TableCell>
                      <TableCell>{record.diagnosis}</TableCell>
                      <TableCell>{record.prescription}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" /> View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health-data">
          <Card>
            <CardHeader>
              <CardTitle>Health Metrics History</CardTitle>
              <CardDescription>
                Track your health data over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Blood Pressure</TableHead>
                    <TableHead>Heart Rate</TableHead>
                    <TableHead>Weight</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockHealthMetrics.map((metric, index) => (
                    <TableRow key={index}>
                      <TableCell>{metric.date}</TableCell>
                      <TableCell>{metric.bloodPressure}</TableCell>
                      <TableCell>{metric.heartRate} bpm</TableCell>
                      <TableCell>{metric.weight} lbs</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setActiveTab("overview")}>
                Add New Health Data
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>
                Manage your scheduled doctor visits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-[200px] text-center text-muted-foreground">
                <Calendar className="h-12 w-12 mb-4 opacity-20" />
                <p>You have no upcoming appointments</p>
                <Button className="mt-4">Schedule an Appointment</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
