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

    // Get student data
    const { data: student } = await supabase.from("students").select("*, classes(*)").eq("user_id", user.id).single()

    // Get assignments for student's class
    const { data: assignments } = await supabase
      .from("assignments")
      .select("*, subjects(*)")
      .eq("class_id", student?.class_id)
      .order("due_date", { ascending: true })

    // Get grades
    const { data: grades } = await supabase
      .from("grades")
      .select("*, subjects(*)")
      .eq("student_id", student?.id)
      .order("created_at", { ascending: false })

    // Get attendance
    const { data: attendance } = await supabase
      .from("attendance")
      .select("*")
      .eq("student_id", student?.id)
      .order("date", { ascending: false })
      .limit(30)

    return NextResponse.json({
      student,
      assignments,
      grades,
      attendance,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch data" },
      { status: 500 },
    )
  }
}
