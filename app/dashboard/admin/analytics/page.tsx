"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { BarChart3, TrendingUp } from "lucide-react"

const sidebarItems = [
  { href: "/dashboard/admin", label: "Dashboard", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/dashboard/admin/students", label: "Students", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/dashboard/admin/teachers", label: "Teachers", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/dashboard/admin/classes", label: "Classes", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/dashboard/admin/analytics", label: "Analytics", icon: <BarChart3 className="w-5 h-5" /> },
]

const analyticsData = [
  { label: "Student Enrollment", value: 1245, change: "+12%", trend: "up" },
  { label: "Teacher Retention", value: "94%", change: "+3%", trend: "up" },
  { label: "Average GPA", value: "3.8", change: "+0.2", trend: "up" },
  { label: "Attendance Rate", value: "92%", change: "-2%", trend: "down" },
]

const monthlyData = [
  { month: "Jan", students: 1100, revenue: 95000 },
  { month: "Feb", students: 1150, revenue: 98000 },
  { month: "Mar", students: 1180, revenue: 102000 },
  { month: "Apr", students: 1200, revenue: 105000 },
  { month: "May", students: 1220, revenue: 108000 },
  { month: "Jun", students: 1245, revenue: 112000 },
]

export default function AnalyticsPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (!user || user.role !== "admin") return <div>Unauthorized</div>

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} role="admin" />
      <DashboardHeader />

      <main className="md:ml-64 p-4 md:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Analytics</h1>
            <p className="text-muted-foreground">System performance and insights</p>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {analyticsData.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div
                      className={`flex items-center gap-1 text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>{metric.change}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Monthly Trends */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Monthly Trends</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Student Enrollment</h3>
                <div className="flex items-end gap-2 h-48">
                  {monthlyData.map((data, index) => {
                    const maxValue = Math.max(...monthlyData.map((d) => d.students))
                    const height = (data.students / maxValue) * 100
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-primary/20 rounded-t-lg" style={{ height: `${height}%` }} />
                        <p className="text-xs text-muted-foreground mt-2">{data.month}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Monthly Revenue</h3>
                <div className="flex items-end gap-2 h-48">
                  {monthlyData.map((data, index) => {
                    const maxValue = Math.max(...monthlyData.map((d) => d.revenue))
                    const height = (data.revenue / maxValue) * 100
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-green-500/20 rounded-t-lg" style={{ height: `${height}%` }} />
                        <p className="text-xs text-muted-foreground mt-2">{data.month}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
