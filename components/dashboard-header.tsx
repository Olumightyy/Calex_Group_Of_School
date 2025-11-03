"use client"

import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Settings } from "lucide-react"

export function DashboardHeader() {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-30 bg-background border-b border-border md:ml-64">
      <div className="flex items-center justify-between h-16 px-4 md:px-8">
        <div className="md:hidden" />

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>

          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="text-right">
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
            <Avatar>
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
