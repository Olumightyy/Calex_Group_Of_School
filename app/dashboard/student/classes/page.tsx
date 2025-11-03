"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { BookOpen, Users, Clock } from "lucide-react"

const sidebarItems = [
  { href: "/dashboard/student", label: "Dashboard", icon: <BookOpen className="w-5 h-5" /> },
  { href: "/dashboard/student/classes", label: "Classes", icon: <BookOpen className="w-5 h-5" /> },
  { href: "/dashboard/student/assignments", label: "Assignments", icon: <BookOpen className="w-5 h-5" /> },
  { href: "/dashboard/student/results", label: "Results", icon: <BookOpen className="w-5 h-5" /> },
  { href: "/dashboard/student/attendance", label: "Attendance", icon: <BookOpen className="w-5 h-5" /> },
]

const classes = [
  {
    id: 1,
    name: "Mathematics - Grade 10",
    teacher: "Mr. Ahmed Hassan",
    schedule: "Mon, Wed, Fri - 9:00 AM",
    students: 32,
    room: "A-101",
  },
  {
    id: 2,
    name: "English Literature",
    teacher: "Ms. Sarah Johnson",
    schedule: "Tue, Thu - 10:30 AM",
    students: 28,
    room: "B-205",
  },
  {
    id: 3,
    name: "Physics",
    teacher: "Dr. James Wilson",
    schedule: "Mon, Wed, Fri - 1:00 PM",
    students: 30,
    room: "Lab-1",
  },
  {
    id: 4,
    name: "Chemistry",
    teacher: "Ms. Emily Brown",
    schedule: "Tue, Thu - 2:00 PM",
    students: 29,
    room: "Lab-2",
  },
  {
    id: 5,
    name: "History",
    teacher: "Mr. David Lee",
    schedule: "Mon, Wed - 11:00 AM",
    students: 31,
    room: "C-301",
  },
  {
    id: 6,
    name: "Computer Science",
    teacher: "Ms. Priya Sharma",
    schedule: "Tue, Thu, Fri - 3:00 PM",
    students: 25,
    room: "Lab-3",
  },
]

export default function ClassesPage() {
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
            <h1 className="text-3xl font-bold mb-2">My Classes</h1>
            <p className="text-muted-foreground">View all your enrolled classes</p>
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
                      <p className="text-sm text-muted-foreground">{cls.teacher}</p>
                    </div>
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{cls.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{cls.students} students</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-semibold">Room:</span> {cls.room}
                    </div>
                  </div>

                  <Button className="w-full">View Class</Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
