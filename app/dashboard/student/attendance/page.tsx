"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Calendar, CheckCircle, XCircle } from "lucide-react"

const sidebarItems = [
  { href: "/dashboard/student", label: "Dashboard", icon: <Calendar className="w-5 h-5" /> },
  { href: "/dashboard/student/classes", label: "Classes", icon: <Calendar className="w-5 h-5" /> },
  { href: "/dashboard/student/assignments", label: "Assignments", icon: <Calendar className="w-5 h-5" /> },
  { href: "/dashboard/student/results", label: "Results", icon: <Calendar className="w-5 h-5" /> },
  { href: "/dashboard/student/attendance", label: "Attendance", icon: <Calendar className="w-5 h-5" /> },
]

const attendanceData = [
  { month: "October", present: 18, absent: 2, total: 20, percentage: 90 },
  { month: "September", present: 19, absent: 1, total: 20, percentage: 95 },
  { month: "August", present: 17, absent: 3, total: 20, percentage: 85 },
  { month: "July", present: 20, absent: 0, total: 20, percentage: 100 },
]

export default function AttendancePage() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (!user || user.role !== "student") return <div>Unauthorized</div>

  const totalPresent = attendanceData.reduce((sum, m) => sum + m.present, 0)
  const totalAbsent = attendanceData.reduce((sum, m) => sum + m.absent, 0)
  const overallPercentage = Math.round((totalPresent / (totalPresent + totalAbsent)) * 100)

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} role="student" />
      <DashboardHeader />

      <main className="md:ml-64 p-4 md:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Attendance</h1>
            <p className="text-muted-foreground">Track your attendance record</p>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Overall Attendance", value: `${overallPercentage}%`, icon: Calendar, color: "primary" },
              { label: "Days Present", value: totalPresent, icon: CheckCircle, color: "green" },
              { label: "Days Absent", value: totalAbsent, icon: XCircle, color: "red" },
              { label: "Total Days", value: totalPresent + totalAbsent, icon: Calendar, color: "muted" },
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

          {/* Monthly Breakdown */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Monthly Breakdown</h2>
            <div className="space-y-4">
              {attendanceData.map((month, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{month.month}</h3>
                    <span className="text-lg font-bold text-primary">{month.percentage}%</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{month.present} Present</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span>{month.absent} Absent</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${month.percentage}%` }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
