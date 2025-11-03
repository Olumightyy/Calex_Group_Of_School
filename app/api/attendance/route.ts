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

    const { data: attendance, error } = await supabase
      .from("attendance")
      .select("*, students(profiles(first_name, last_name)), classes(name)")
      .order("date", { ascending: false })

    if (error) throw error

    return NextResponse.json(attendance)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch attendance" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
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

    if (profile?.role !== "teacher" && profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const { student_id, class_id, date, status, remarks } = body

    const { data: newAttendance, error } = await supabase
      .from("attendance")
      .insert([
        {
          student_id,
          class_id,
          date,
          status,
          remarks,
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json(newAttendance, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to record attendance" },
      { status: 500 },
    )
  }
}
