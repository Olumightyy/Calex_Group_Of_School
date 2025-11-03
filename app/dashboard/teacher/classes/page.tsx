"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Users, BookOpen } from "lucide-react"

const sidebarItems = [
  { href: "/dashboard/teacher", label: "Dashboard", icon: <BookOpen className="w-5 h-5" /> },
  { href: "/dashboard/teacher/classes", label: "My Classes", icon: <Users className="w-5 h-5" /> },
  { href: "/dashboard/teacher/assignments", label: "Assignments", icon: <BookOpen className="w-5 h-5" /> },
  { href: "/dashboard/teacher/grading", label: "Grading", icon: <BookOpen className="w-5 h-5" /> },
  { href: "/dashboard/teacher/attendance", label: "Attendance", icon: <BookOpen className="w-5 h-5" /> },
]

const classes = [
  { id: 1, name: "Mathematics 10A", students: 32, room: "A-101", schedule: "Mon, Wed, Fri - 9:00 AM" },
  { id: 2, name: "Mathematics 10B", students: 30, room: "A-102", schedule: "Tue, Thu - 10:30 AM" },
  { id: 3, name: "Advanced Math 11", students: 28, room: "A-201", schedule: "Mon, Wed, Fri - 1:00 PM" },
  { id: 4, name: "Calculus 12", students: 25, room: "A-202", schedule: "Tue, Thu - 2:00 PM" },
]

export default function TeacherClassesPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (!user || user.role !== "teacher") return <div>Unauthorized</div>

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} role="teacher" />
      <DashboardHeader />

      <main className="md:ml-64 p-4 md:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Classes</h1>
              <p className="text-muted-foreground">Manage your classes and students</p>
            </div>
            <Button>Add Class</Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {classes.map((cls, index) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{cls.name}</h3>
                      <p className="text-sm text-muted-foreground">{cls.schedule}</p>
                    </div>
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{cls.students} students</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-semibold">Room:</span> {cls.room}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      Manage
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      View Students
                    </Button>
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
