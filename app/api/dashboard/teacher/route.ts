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

    // Get teacher data
    const { data: teacher } = await supabase.from("teachers").select("*").eq("user_id", user.id).single()

    // Get classes assigned to teacher
    const { data: classes } = await supabase
      .from("class_subjects")
      .select("classes(*), subjects(*)")
      .eq("teacher_id", teacher?.id)

    // Get recent assignments
    const { data: assignments } = await supabase
      .from("assignments")
      .select("*, classes(*), subjects(*)")
      .eq("teacher_id", teacher?.id)
      .order("created_at", { ascending: false })
      .limit(10)

    return NextResponse.json({
      teacher,
      classes,
      assignments,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch data" },
      { status: 500 },
    )
  }
}
