"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { BarChart3 } from "lucide-react"

const sidebarItems = [
  { href: "/dashboard/teacher", label: "Dashboard", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/dashboard/teacher/classes", label: "My Classes", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/dashboard/teacher/assignments", label: "Assignments", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/dashboard/teacher/grading", label: "Grading", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/dashboard/teacher/attendance", label: "Attendance", icon: <BarChart3 className="w-5 h-5" /> },
]

const submissions = [
  {
    id: 1,
    student: "John Smith",
    assignment: "Algebra Assignment",
    class: "Math 10A",
    date: "2025-11-04",
    status: "pending",
  },
  {
    id: 2,
    student: "Sarah Johnson",
    assignment: "Algebra Assignment",
    class: "Math 10A",
    date: "2025-11-04",
    status: "pending",
  },
  {
    id: 3,
    student: "Mike Davis",
    assignment: "Algebra Assignment",
    class: "Math 10A",
    date: "2025-11-03",
    status: "graded",
    score: 92,
  },
  {
    id: 4,
    student: "Emma Wilson",
    assignment: "Algebra Assignment",
    class: "Math 10A",
    date: "2025-11-02",
    status: "graded",
    score: 88,
  },
]

export default function GradingPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (!user || user.role !== "teacher") return <div>Unauthorized</div>

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} role="teacher" />
      <DashboardHeader />

      <main className="md:ml-64 p-4 md:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Grading</h1>
            <p className="text-muted-foreground">Review and grade student submissions</p>
          </div>

          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Submissions</p>
                <p className="text-3xl font-bold">2</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Graded</p>
                <p className="text-3xl font-bold">2</p>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            {submissions.map((submission, index) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold">{submission.student}</h3>
                      <p className="text-sm text-muted-foreground">{submission.assignment}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {submission.class} • {submission.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {submission.status === "graded" ? (
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{submission.score}</p>
                          <p className="text-xs text-muted-foreground">out of 100</p>
                        </div>
                      ) : (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                          Pending
                        </span>
                      )}
                      <Button size="sm">{submission.status === "pending" ? "Grade" : "Edit"}</Button>
                    </div>
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
