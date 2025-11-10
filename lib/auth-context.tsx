"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface User {
  id: string
  email: string
  first_name?: string
  last_name?: string
  name?: string
  role: "student" | "teacher" | "parent" | "admin"
  avatar_url?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  role: "student" | "teacher" | "parent" | "admin"
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkSession()

    // Subscribe to auth changes
    const supabase = createClient()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔔 Auth state changed:', event, session?.user?.email)
      
      if (event === 'SIGNED_IN' && session?.user) {
        await loadUserProfile(session.user)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
      } else if (event === 'TOKEN_REFRESHED') {
        console.log('🔄 Token refreshed')
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const checkSession = async () => {
    try {
      console.log('🔍 Checking session...')
      const supabase = createClient()
      
      const {
        data: { session },
        error
      } = await supabase.auth.getSession()

      if (error) {
        console.error('❌ Session error:', error)
        setUser(null)
        setIsLoading(false)
        return
      }

      if (session?.user) {
        console.log('✅ Session found for:', session.user.email)
        await loadUserProfile(session.user)
      } else {
        console.log('❌ No session found')
        setUser(null)
      }
    } catch (error) {
      console.error('❌ Failed to check session:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const loadUserProfile = async (authUser: SupabaseUser) => {
    try {
      console.log('📝 Loading profile for:', authUser.email)
      const supabase = createClient()
      
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single()

      if (error) {
        console.error('❌ Profile error:', error.message)
        // Fallback to metadata if profile doesn't exist
        const fallbackUser: User = {
          id: authUser.id,
          email: authUser.email || "",
          first_name: authUser.user_metadata?.first_name || authUser.user_metadata?.firstName || "",
          last_name: authUser.user_metadata?.last_name || authUser.user_metadata?.lastName || "",
          name: authUser.user_metadata?.name || "",
          role: authUser.user_metadata?.role || "student",
        }
        setUser(fallbackUser)
        console.log('⚠️ Using fallback user data:', fallbackUser)
        return
      }

      if (profile) {
        const fullUser: User = {
          id: authUser.id,
          email: authUser.email || "",
          first_name: profile.first_name,
          last_name: profile.last_name,
          name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.email?.split('@')[0],
          role: profile.role,
          avatar_url: profile.avatar_url,
        }
        setUser(fullUser)
        console.log('✅ Profile loaded:', fullUser.email, 'Role:', fullUser.role)
      }
    } catch (error) {
      console.error('❌ Failed to load profile:', error)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      console.log('🔐 Starting login for:', email)
      setIsLoading(true)
      
      const supabase = createClient()

      // Sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('❌ Login error:', error.message)
        throw error
      }

      if (!data.user || !data.session) {
        console.error('❌ No user or session returned')
        throw new Error('Login failed - no session created')
      }

      console.log('✅ Login successful:', data.user.email)
      console.log('📦 Session created:', data.session.access_token.substring(0, 20) + '...')

      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single()

      if (profileError) {
        console.error('❌ Profile fetch error:', profileError.message)
      }

      const userRole = profile?.role || data.user.user_metadata?.role || "student"

      if (profile) {
        const fullUser: User = {
          id: data.user.id,
          email: data.user.email || "",
          first_name: profile.first_name,
          last_name: profile.last_name,
          name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim(),
          role: userRole,
          avatar_url: profile.avatar_url,
        }
        setUser(fullUser)
        console.log('✅ User state set:', fullUser.email, 'Role:', fullUser.role)
      }

      // Wait a bit to ensure session cookie is set
      console.log('⏳ Waiting for session to be fully established...')
      await new Promise(resolve => setTimeout(resolve, 500))

      console.log('🚀 Redirecting to:', `/dashboard/${userRole}`)
      
      // Force a hard navigation to ensure middleware sees the session
      window.location.href = `/dashboard/${userRole}`
      
    } catch (error: any) {
      console.error('❌ Login failed:', error)
      setIsLoading(false)
      throw error
    }
  }

  const register = async (data: RegisterData) => {
    try {
      console.log('📝 Starting registration for:', data.email)
      setIsLoading(true)
      
      const supabase = createClient()

      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            firstName: data.firstName,
            last_name: data.lastName,
            lastName: data.lastName,
            role: data.role,
          },
        },
      })

      if (error) {
        console.error('❌ Registration error:', error.message)
        throw error
      }

      console.log('✅ Registration successful:', authData.user?.email)

      // If email confirmation is disabled, sign in immediately
      if (authData.user && authData.session) {
        console.log('✅ Auto-signed in, redirecting...')
        await new Promise(resolve => setTimeout(resolve, 500))
        window.location.href = `/dashboard/${data.role}`
      } else {
        console.log('📧 Email confirmation required')
      }
      
    } catch (error: any) {
      console.error('❌ Registration failed:', error)
      setIsLoading(false)
      throw error
    }
  }

  const logout = async () => {
    try {
      console.log('👋 Logging out...')
      const supabase = createClient()
      await supabase.auth.signOut()
      setUser(null)
      console.log('✅ Logged out successfully')
      window.location.href = '/login'
    } catch (error) {
      console.error("❌ Logout failed:", error)
    }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login, 
        register, 
        logout, 
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}