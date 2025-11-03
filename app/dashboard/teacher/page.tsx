"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Users, FileText, BarChart3, Clock } from "lucide-react"

const sidebarItems = [
  { href: "/dashboard/teacher", label: "Dashboard", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/dashboard/teacher/classes", label: "My Classes", icon: <Users className="w-5 h-5" /> },
  { href: "/dashboard/teacher/assignments", label: "Assignments", icon: <FileText className="w-5 h-5" /> },
  { href: "/dashboard/teacher/grading", label: "Grading", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/dashboard/teacher/attendance", label: "Attendance", icon: <Clock className="w-5 h-5" /> },
]

const teacherStats = [
  { label: "Classes", value: "4", icon: Users },
  { label: "Total Students", value: "128", icon: Users },
  { label: "Pending Assignments", value: "12", icon: FileText },
  { label: "Submissions to Grade", value: "24", icon: BarChart3 },
]

const recentSubmissions = [
  { id: 1, student: "John Smith", assignment: "Algebra Assignment", class: "Math 10A", date: "2025-11-04" },
  { id: 2, student: "Sarah Johnson", assignment: "Essay Writing", class: "English 10B", date: "2025-11-03" },
  { id: 3, student: "Mike Davis", assignment: "Lab Report", class: "Physics 10A", date: "2025-11-02" },
]

export default function TeacherDashboard() {
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
            <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
            <p className="text-muted-foreground">Manage your classes and student progress</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {teacherStats.map((stat, index) => {
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
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
                <div className="space-y-3">
                  <Button className="w-full justify-start">Create New Assignment</Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Upload Grades
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Mark Attendance
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Send Announcement
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Recent Submissions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Recent Submissions</h2>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentSubmissions.map((submission) => (
                    <div key={submission.id} className="p-4 border border-border rounded-lg hover:bg-muted/50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-sm">{submission.student}</p>
                          <p className="text-xs text-muted-foreground">{submission.assignment}</p>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">To Grade</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{submission.class}</span>
                        <span>{submission.date}</span>
                      </div>
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
