import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Get statistics
    const { count: studentCount } = await supabase.from("students").select("*", { count: "exact", head: true })

    const { count: teacherCount } = await supabase.from("teachers").select("*", { count: "exact", head: true })

    const { count: classCount } = await supabase.from("classes").select("*", { count: "exact", head: true })

    // Get recent students
    const { data: recentStudents } = await supabase
      .from("students")
      .select("*, profiles(*)")
      .order("created_at", { ascending: false })
      .limit(10)

    // Get recent teachers
    const { data: recentTeachers } = await supabase
      .from("teachers")
      .select("*, profiles(*)")
      .order("created_at", { ascending: false })
      .limit(10)

    return NextResponse.json({
      stats: {
        students: studentCount || 0,
        teachers: teacherCount || 0,
        classes: classCount || 0,
      },
      recentStudents,
      recentTeachers,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch data" },
      { status: 500 },
    )
  }
}
