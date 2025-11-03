"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { BookOpen, Users, Edit, Trash2 } from "lucide-react"

const sidebarItems = [
  { href: "/dashboard/admin", label: "Dashboard", icon: <BookOpen className="w-5 h-5" /> },
  { href: "/dashboard/admin/students", label: "Students", icon: <BookOpen className="w-5 h-5" /> },
  { href: "/dashboard/admin/teachers", label: "Teachers", icon: <BookOpen className="w-5 h-5" /> },
  { href: "/dashboard/admin/classes", label: "Classes", icon: <BookOpen className="w-5 h-5" /> },
  { href: "/dashboard/admin/analytics", label: "Analytics", icon: <BookOpen className="w-5 h-5" /> },
]

const classes = [
  { id: 1, name: "Mathematics 10A", teacher: "Mr. Ahmed Hassan", students: 32, room: "A-101" },
  { id: 2, name: "Mathematics 10B", teacher: "Mr. Ahmed Hassan", students: 30, room: "A-102" },
  { id: 3, name: "English 10A", teacher: "Ms. Sarah Johnson", students: 28, room: "B-201" },
  { id: 4, name: "Physics 10A", teacher: "Dr. James Wilson", students: 30, room: "Lab-1" },
  { id: 5, name: "Chemistry 10A", teacher: "Ms. Emily Brown", students: 29, room: "Lab-2" },
]

export default function ClassesPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (!user || user.role !== "admin") return <div>Unauthorized</div>

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} role="admin" />
      <DashboardHeader />

      <main className="md:ml-64 p-4 md:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Classes</h1>
              <p className="text-muted-foreground">Manage all classes in the system</p>
            </div>
            <Button>Create Class</Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {classes.map((cls, index) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{cls.name}</h3>
                      <p className="text-sm text-muted-foreground">{cls.teacher}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-muted rounded transition-colors">
                        <Edit className="w-4 h-4 text-primary" />
                      </button>
                      <button className="p-1 hover:bg-muted rounded transition-colors">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{cls.students} students</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-semibold">Room:</span> {cls.room}
                    </div>
                  </div>

                  <Button className="w-full mt-4">Manage Class</Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
