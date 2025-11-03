"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Users, Search, Edit, Trash2 } from "lucide-react"
import { useState } from "react"

const sidebarItems = [
  { href: "/dashboard/admin", label: "Dashboard", icon: <Users className="w-5 h-5" /> },
  { href: "/dashboard/admin/students", label: "Students", icon: <Users className="w-5 h-5" /> },
  { href: "/dashboard/admin/teachers", label: "Teachers", icon: <Users className="w-5 h-5" /> },
  { href: "/dashboard/admin/classes", label: "Classes", icon: <Users className="w-5 h-5" /> },
  { href: "/dashboard/admin/analytics", label: "Analytics", icon: <Users className="w-5 h-5" /> },
]

const teachers = [
  { id: 1, name: "Mr. Ahmed Hassan", email: "ahmed@school.edu", subject: "Mathematics", classes: 4 },
  { id: 2, name: "Ms. Sarah Johnson", email: "sarah@school.edu", subject: "English", classes: 3 },
  { id: 3, name: "Dr. James Wilson", email: "james@school.edu", subject: "Physics", classes: 3 },
  { id: 4, name: "Ms. Emily Brown", email: "emily@school.edu", subject: "Chemistry", classes: 2 },
  { id: 5, name: "Ms. Priya Sharma", email: "priya@school.edu", subject: "Computer Science", classes: 3 },
]

export default function TeachersPage() {
  const { user, isLoading } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")

  if (isLoading) return <div>Loading...</div>
  if (!user || user.role !== "admin") return <div>Unauthorized</div>

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} role="admin" />
      <DashboardHeader />

      <main className="md:ml-64 p-4 md:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Teachers</h1>
              <p className="text-muted-foreground">Manage all teachers in the system</p>
            </div>
            <Button>Add Teacher</Button>
          </div>

          <Card className="p-6">
            {/* Search */}
            <div className="mb-6 flex items-center gap-2 px-4 py-2 border border-border rounded-lg">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 outline-none bg-transparent"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-sm">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Subject</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Classes</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm font-medium">{teacher.name}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{teacher.email}</td>
                      <td className="py-3 px-4 text-sm">{teacher.subject}</td>
                      <td className="py-3 px-4 text-sm">{teacher.classes}</td>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-muted rounded transition-colors">
                            <Edit className="w-4 h-4 text-primary" />
                          </button>
                          <button className="p-1 hover:bg-muted rounded transition-colors">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
