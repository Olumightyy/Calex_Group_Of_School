"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { BookOpen, FileText, BarChart3, Calendar, Clock } from "lucide-react"
import Link from "next/link"

const sidebarItems = [
  { href: "/dashboard/student", label: "Dashboard", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/dashboard/student/classes", label: "Classes", icon: <BookOpen className="w-5 h-5" /> },
  { href: "/dashboard/student/assignments", label: "Assignments", icon: <FileText className="w-5 h-5" /> },
  { href: "/dashboard/student/results", label: "Results", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/dashboard/student/attendance", label: "Attendance", icon: <Calendar className="w-5 h-5" /> },
]

const upcomingAssignments = [
  { id: 1, subject: "Mathematics", title: "Algebra Assignment", dueDate: "2025-11-05", status: "pending" },
  { id: 2, subject: "English", title: "Essay Writing", dueDate: "2025-11-08", status: "pending" },
  { id: 3, subject: "Science", title: "Lab Report", dueDate: "2025-11-10", status: "submitted" },
]

const recentResults = [
  { id: 1, subject: "Mathematics", score: 92, total: 100, date: "2025-10-28" },
  { id: 2, subject: "English", score: 88, total: 100, date: "2025-10-25" },
  { id: 3, subject: "Science", score: 95, total: 100, date: "2025-10-22" },
]

export default function StudentDashboard() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!user || user.role !== "student") {
    return <div className="flex items-center justify-center h-screen">Unauthorized</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} role="student" />
      <DashboardHeader />

      <main className="md:ml-64 p-4 md:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-muted-foreground">Here's your academic overview</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Classes", value: "6", icon: BookOpen },
              { label: "Pending Assignments", value: "2", icon: FileText },
              { label: "Attendance", value: "94%", icon: Calendar },
              { label: "Average Score", value: "91.7%", icon: BarChart3 },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Upcoming Assignments */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Upcoming Assignments</h2>
                  <Link href="/dashboard/student/assignments">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View All
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {upcomingAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-sm">{assignment.title}</p>
                          <p className="text-xs text-muted-foreground">{assignment.subject}</p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            assignment.status === "submitted"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {assignment.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>Due: {assignment.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Recent Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Recent Results</h2>
                  <Link href="/dashboard/student/results">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View All
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentResults.map((result) => (
                    <div key={result.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-sm">{result.subject}</p>
                        <p className="font-bold text-lg text-primary">
                          {result.score}/{result.total}
                        </p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(result.score / result.total) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{result.date}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
