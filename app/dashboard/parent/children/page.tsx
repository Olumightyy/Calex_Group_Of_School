"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { User } from "lucide-react"

const sidebarItems = [
  { href: "/dashboard/parent", label: "Dashboard", icon: <User className="w-5 h-5" /> },
  { href: "/dashboard/parent/children", label: "My Children", icon: <User className="w-5 h-5" /> },
  { href: "/dashboard/parent/payments", label: "Payments", icon: <User className="w-5 h-5" /> },
  { href: "/dashboard/parent/communications", label: "Communications", icon: <User className="w-5 h-5" /> },
]

const childrenDetails = [
  {
    id: 1,
    name: "Alex Johnson",
    grade: "10A",
    avgScore: 91.7,
    attendance: 94,
    subjects: [
      { name: "Mathematics", score: 92 },
      { name: "English", score: 88 },
      { name: "Science", score: 95 },
    ],
  },
  {
    id: 2,
    name: "Emma Johnson",
    grade: "8B",
    avgScore: 88.3,
    attendance: 96,
    subjects: [
      { name: "Mathematics", score: 90 },
      { name: "English", score: 87 },
      { name: "Science", score: 88 },
    ],
  },
]

export default function ChildrenPage() {
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
            <h1 className="text-3xl font-bold mb-2">My Children</h1>
            <p className="text-muted-foreground">View detailed performance for each child</p>
          </div>

          <div className="space-y-8">
            {childrenDetails.map((child, index) => (
              <motion.div
                key={child.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold">{child.name}</h2>
                      <p className="text-muted-foreground">Grade {child.grade}</p>
                    </div>
                    <Button>View Full Profile</Button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Average Score</p>
                      <p className="text-2xl font-bold text-primary">{child.avgScore}%</p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Attendance</p>
                      <p className="text-2xl font-bold text-primary">{child.attendance}%</p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Classes</p>
                      <p className="text-2xl font-bold text-primary">{child.subjects.length}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-4">Subject Performance</h3>
                    <div className="space-y-3">
                      {child.subjects.map((subject) => (
                        <div key={subject.name}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{subject.name}</span>
                            <span className="text-sm font-bold text-primary">{subject.score}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${subject.score}%` }} />
                          </div>
                        </div>
                      ))}
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
