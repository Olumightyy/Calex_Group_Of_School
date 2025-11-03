"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Users, BookOpen, BarChart3, TrendingUp } from "lucide-react"

const sidebarItems = [
  { href: "/dashboard/admin", label: "Dashboard", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/dashboard/admin/students", label: "Students", icon: <Users className="w-5 h-5" /> },
  { href: "/dashboard/admin/teachers", label: "Teachers", icon: <Users className="w-5 h-5" /> },
  { href: "/dashboard/admin/classes", label: "Classes", icon: <BookOpen className="w-5 h-5" /> },
  { href: "/dashboard/admin/analytics", label: "Analytics", icon: <BarChart3 className="w-5 h-5" /> },
]

const adminStats = [
  { label: "Total Students", value: "1,245", icon: Users, color: "primary" },
  { label: "Total Teachers", value: "85", icon: Users, color: "primary" },
  { label: "Active Classes", value: "42", icon: BookOpen, color: "primary" },
  { label: "Revenue", value: "$125K", icon: TrendingUp, color: "primary" },
]

const recentActivities = [
  { id: 1, action: "New student registered", user: "John Smith", time: "2 hours ago" },
  { id: 2, action: "Teacher added to system", user: "Ms. Sarah Johnson", time: "5 hours ago" },
  { id: 3, action: "Class created", name: "Physics 11A", time: "1 day ago" },
  { id: 4, action: "Payment received", amount: "$500", time: "2 days ago" },
]

export default function AdminDashboard() {
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
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">System overview and management</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {adminStats.map((stat, index) => {
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
                  <Button className="w-full justify-start">Add New Student</Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Add New Teacher
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Create Class
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Generate Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    System Settings
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Recent Activities</h2>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="pb-4 border-b border-border last:border-0">
                      <p className="font-semibold text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.user || activity.name || activity.amount}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
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
