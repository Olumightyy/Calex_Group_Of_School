"use client"

import { useAuth } from "@/lib/auth-context"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CreditCard, Download } from "lucide-react"

const sidebarItems = [
  { href: "/dashboard/parent", label: "Dashboard", icon: <CreditCard className="w-5 h-5" /> },
  { href: "/dashboard/parent/children", label: "My Children", icon: <CreditCard className="w-5 h-5" /> },
  { href: "/dashboard/parent/payments", label: "Payments", icon: <CreditCard className="w-5 h-5" /> },
  { href: "/dashboard/parent/communications", label: "Communications", icon: <CreditCard className="w-5 h-5" /> },
]

const payments = [
  { id: 1, description: "Tuition Fee - November", amount: 500, date: "2025-11-01", status: "paid", invoice: "INV-001" },
  { id: 2, description: "Activity Fee", amount: 50, date: "2025-10-15", status: "paid", invoice: "INV-002" },
  {
    id: 3,
    description: "Tuition Fee - December",
    amount: 500,
    date: "2025-12-01",
    status: "pending",
    invoice: "INV-003",
  },
  { id: 4, description: "Lab Fee", amount: 75, date: "2025-09-01", status: "paid", invoice: "INV-004" },
]

export default function PaymentsPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (!user || user.role !== "parent") return <div>Unauthorized</div>

  const totalPaid = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0)
  const totalPending = payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar items={sidebarItems} role="parent" />
      <DashboardHeader />

      <main className="md:ml-64 p-4 md:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Payments</h1>
            <p className="text-muted-foreground">Manage your school fees and payments</p>
          </div>

          {/* Summary */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Total Paid</p>
              <p className="text-3xl font-bold text-green-600">${totalPaid}</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">${totalPending}</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Total Due</p>
              <p className="text-3xl font-bold">${totalPaid + totalPending}</p>
            </Card>
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Payment History</h2>
              <Button>Make Payment</Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-sm">Description</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">{payment.description}</td>
                      <td className="py-3 px-4 text-sm font-semibold">${payment.amount}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{payment.date}</td>
                      <td className="py-3 px-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            payment.status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <button className="text-primary hover:underline flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          Invoice
                        </button>
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
