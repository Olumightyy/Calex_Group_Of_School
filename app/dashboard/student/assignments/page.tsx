"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { FileText, Calendar } from "lucide-react"

const sidebarItems = [
  { href: "/dashboard/student", label: "Dashboard", icon: <FileText className="w-5 h-5" /> },
  { href: "/dashboard/student/classes", label: "Classes", icon: <FileText className="w-5 h-5" /> },
  { href: "/dashboard/student/assignments", label: "Assignments", icon: <FileText className="w-5 h-5" /> },
  { href: "/dashboard/student/results", label: "Results", icon: <FileText className="w-5 h-5" /> },
  { href: "/dashboard/student/attendance", label: "Attendance", icon: <FileText className="w-5 h-5" /> },
]

const assignments = [
  {
    id: 1,
    subject: "Mathematics",
    title: "Algebra Assignment - Chapter 5",
    description: "Solve problems 1-20 from the textbook",
    dueDate: "2025-11-05",
    submittedDate: null,
    status: "pending",
    score: null,
  },
  {
    id: 2,
    subject: "English",
    title: "Essay Writing - My Favorite Book",
    description: "Write a 500-word essay about your favorite book",
    dueDate: "2025-11-08",
    submittedDate: null,
    status: "pending",
    score: null,
  },
  {
    id: 3,
    subject: "Science",
    title: "Lab Report - Photosynthesis",
    description: "Complete the lab report from the experiment",
    dueDate: "2025-11-10",
    submittedDate: "2025-11-09",
    status: "submitted",
    score: null,
  },
  {
    id: 4,
    subject: "History",
    title: "Research Project - World War II",
    description: "Research and present findings on WWII",
    dueDate: "2025-11-15",
    submittedDate: "2025-11-14",
    status: "graded",
    score: 92,
  },
]

export default function AssignmentsPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (!user || user.role !== "student") return <div>Unauthorized</div>

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} role="student" />
      <DashboardHeader />

      <main className="md:ml-64 p-4 md:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Assignments</h1>
            <p className="text-muted-foreground">Track and submit your assignments</p>
          </div>

          <div className="space-y-4">
            {assignments.map((assignment, index) => (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-bold">{assignment.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{assignment.subject}</p>
                      <p className="text-sm text-muted-foreground">{assignment.description}</p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ml-4 ${
                        assignment.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : assignment.status === "submitted"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {assignment.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {assignment.dueDate}</span>
                      </div>
                      {assignment.score && (
                        <div className="flex items-center gap-1 text-primary font-semibold">
                          <span>Score: {assignment.score}%</span>
                        </div>
                      )}
                    </div>
                    <Button size="sm">{assignment.status === "pending" ? "Submit" : "View"}</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
