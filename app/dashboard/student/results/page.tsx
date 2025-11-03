"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { BarChart3 } from "lucide-react"

const sidebarItems = [
  { href: "/dashboard/student", label: "Dashboard", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/dashboard/student/classes", label: "Classes", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/dashboard/student/assignments", label: "Assignments", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/dashboard/student/results", label: "Results", icon: <BarChart3 className="w-5 h-5" /> },
  { href: "/dashboard/student/attendance", label: "Attendance", icon: <BarChart3 className="w-5 h-5" /> },
]

const results = [
  { id: 1, subject: "Mathematics", score: 92, total: 100, term: "Term 1", date: "2025-10-28" },
  { id: 2, subject: "English", score: 88, total: 100, term: "Term 1", date: "2025-10-25" },
  { id: 3, subject: "Science", score: 95, total: 100, term: "Term 1", date: "2025-10-22" },
  { id: 4, subject: "History", score: 85, total: 100, term: "Term 1", date: "2025-10-20" },
  { id: 5, subject: "Computer Science", score: 98, total: 100, term: "Term 1", date: "2025-10-18" },
  { id: 6, subject: "Physics", score: 90, total: 100, term: "Term 1", date: "2025-10-15" },
]

export default function ResultsPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (!user || user.role !== "student") return <div>Unauthorized</div>

  const averageScore = Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} role="student" />
      <DashboardHeader />

      <main className="md:ml-64 p-4 md:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Results</h1>
            <p className="text-muted-foreground">View your academic performance</p>
          </div>

          <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Average Score</p>
                <p className="text-4xl font-bold text-primary">{averageScore}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Total Subjects</p>
                <p className="text-3xl font-bold">{results.length}</p>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            {results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{result.subject}</h3>
                      <p className="text-sm text-muted-foreground">
                        {result.term} - {result.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary">{result.score}</p>
                      <p className="text-sm text-muted-foreground">out of {result.total}</p>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(result.score / result.total) * 100}%` }}
                    />
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
