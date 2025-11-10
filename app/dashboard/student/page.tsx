"use client"

import { useEffect, useState } from 'react'
import { useAuth } from "@/lib/auth-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { createClient } from '@/lib/supabase/client'

export default function StudentDashboard() {
  const { user, isLoading: authLoading } = useAuth()
  const [logs, setLogs] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [studentData, setStudentData] = useState<any>(null)

  const addLog = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const emoji = type === 'success' ? '✅' : type === 'error' ? '❌' : '🔍'
    const log = `${emoji} ${message}`
    console.log(log)
    setLogs(prev => [...prev, log])
  }

  useEffect(() => {
    addLog('Component mounted')
    addLog(`Auth loading: ${authLoading}`)
    addLog(`User exists: ${!!user}`)
    
    if (user) {
      addLog(`User email: ${user.email}`, 'info')
      addLog(`User role: ${user.role}`, 'info')
      addLog(`User ID: ${user.id}`, 'info')
    }
  }, [])

  useEffect(() => {
    if (!authLoading && user) {
      addLog('Auth completed, starting data fetch...', 'success')
      fetchStudentData()
    } else if (!authLoading && !user) {
      addLog('No user found after auth', 'error')
      setError('Not authenticated')
    }
  }, [user, authLoading])

  const fetchStudentData = async () => {
    try {
      addLog('Creating Supabase client...')
      const supabase = createClient()

      addLog('Fetching student record...')
      const { data: student, error: studentError } = await supabase
        .from('students')
        .select(`
          id,
          admission_number,
          class_id,
          classes (
            id,
            name,
            grade_level
          )
        `)
        .eq('user_id', user?.id)
        .single()

      if (studentError) {
        addLog(`Student fetch error: ${studentError.message}`, 'error')
        addLog(`Error code: ${studentError.code}`, 'error')
        setError(studentError.message)
        return
      }

      if (!student) {
        addLog('No student record found', 'error')
        setError('Student record not found')
        return
      }

      addLog(`Student record found!`, 'success')
      addLog(`Admission: ${student.admission_number}`, 'info')
      addLog(`Class: ${student.classes?.[0]?.name || 'No class'}`, 'info')
      setStudentData(student)

      addLog('All data loaded successfully!', 'success')

    } catch (err: any) {
      addLog(`Fatal error: ${err.message}`, 'error')
      setError(err.message)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 max-w-lg w-full">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
            <h2 className="text-xl font-bold mb-2">Checking Authentication...</h2>
            <p className="text-sm text-muted-foreground">Please wait</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-6">🔍 Student Dashboard - Diagnostic Mode</h1>
        
        {/* User Info */}
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">User Information:</h3>
          <div className="space-y-1 text-sm">
            <p>Email: <span className="font-mono">{user?.email || 'N/A'}</span></p>
            <p>Role: <span className="font-mono">{user?.role || 'N/A'}</span></p>
            <p>User ID: <span className="font-mono text-xs">{user?.id || 'N/A'}</span></p>
            <p>Name: <span className="font-mono">{user?.first_name} {user?.last_name}</span></p>
          </div>
        </div>

        {/* Student Data */}
        {studentData && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Student Record Found!
            </h3>
            <div className="space-y-1 text-sm">
              <p>Admission Number: <span className="font-mono">{studentData.admission_number}</span></p>
              <p>Class: <span className="font-mono">{studentData.classes?.name}</span></p>
              <p>Grade: <span className="font-mono">{studentData.classes?.grade_level}</span></p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-red-700">
              <XCircle className="w-5 h-5" />
              Error Detected
            </h3>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Logs */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Execution Log:</h3>
          <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-xs max-h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <p>No logs yet...</p>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="mb-1">
                  [{new Date().toLocaleTimeString()}] {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={fetchStudentData} className="flex-1">
            🔄 Retry Fetch Data
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              setLogs([])
              setError(null)
              setStudentData(null)
            }}
            className="flex-1"
          >
            🗑️ Clear Logs
          </Button>
        </div>

        {/* SQL Helper */}
        {error && user?.id && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold mb-2 text-sm">🔧 Quick Fix SQL</h3>
            <p className="text-xs text-muted-foreground mb-2">
              Copy and run this in Supabase SQL Editor:
            </p>
            <pre className="bg-black text-green-400 p-3 rounded text-xs overflow-x-auto">
{`-- Create student record for ${user.email}
INSERT INTO students (user_id, admission_number, class_id, date_of_birth, gender)
VALUES (
  '${user.id}',
  'STU2024001',
  (SELECT id FROM classes WHERE name = 'Grade 7A' LIMIT 1),
  '2010-05-15',
  'male'
) ON CONFLICT (user_id) DO NOTHING;

-- Verify it was created
SELECT * FROM students WHERE user_id = '${user.id}';`}
            </pre>
            <Button 
              size="sm" 
              variant="outline"
              className="mt-2"
              onClick={() => {
                navigator.clipboard.writeText(`INSERT INTO students (user_id, admission_number, class_id, date_of_birth, gender) VALUES ('${user.id}', 'STU2024001', (SELECT id FROM classes WHERE name = 'Grade 7A' LIMIT 1), '2010-05-15', 'male') ON CONFLICT (user_id) DO NOTHING;`)
                alert('SQL copied to clipboard!')
              }}
            >
              📋 Copy SQL
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}