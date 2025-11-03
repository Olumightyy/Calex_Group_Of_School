"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { User, BarChart3, CreditCard, Bell } from "lucide-react"

const sidebarItems = [
  { href: "/dashboard/parent", label: "Dashboard", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/dashboard/parent/children", label: "My Children", icon: <User className="w-5 h-5" /> },
  { href: "/dashboard/parent/payments", label: "Payments", icon: <CreditCard className="w-5 h-5" /> },
  { href: "/dashboard/parent/communications", label: "Communications", icon: <Bell className="w-5 h-5" /> },
]

const children = [
  { id: 1, name: "Alex Johnson", grade: "10A", avgScore: 91.7, attendance: 94 },
  { id: 2, name: "Emma Johnson", grade: "8B", avgScore: 88.3, attendance: 96 },
]

const recentPayments = [
  { id: 1, description: "Tuition Fee - November", amount: 500, date: "2025-11-01", status: "paid" },
  { id: 2, description: "Activity Fee", amount: 50, date: "2025-10-15", status: "paid" },
  { id: 3, description: "Tuition Fee - December", amount: 500, date: "2025-12-01", status: "pending" },
]

export default function ParentDashboard() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (!user || user.role !== "parent") return <div>Unauthorized</div>

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} role="parent" />
      <DashboardHeader />

      <main className="md:ml-64 p-4 md:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
            <p className="text-muted-foreground">Monitor your children's academic progress</p>
          </div>

          {/* Children Overview */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {children.map((child, index) => (
              <motion.div
                key={child.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{child.name}</h3>
                      <p className="text-sm text-muted-foreground">Grade {child.grade}</p>
                    </div>
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Average Score</p>
                      <p className="text-2xl font-bold text-primary">{child.avgScore}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Attendance</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${child.attendance}%` }} />
                        </div>
                        <span className="text-sm font-semibold">{child.attendance}%</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">View Details</Button>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Payments */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Recent Payments</h2>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentPayments.map((payment) => (
                    <div key={payment.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-sm">{payment.description}</p>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            payment.status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{payment.date}</span>
                        <span className="font-bold">${payment.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
                <div className="space-y-3">
                  <Button className="w-full justify-start">Make Payment</Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Message Teacher
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    View Report Card
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Schedule Meeting
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
