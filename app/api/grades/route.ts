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

    const { data: grades, error } = await supabase
      .from("grades")
      .select("*, students(profiles(first_name, last_name)), subjects(*), teachers(profiles(first_name, last_name))")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(grades)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch grades" },
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
    const { student_id, subject_id, term, score, grade, teacher_id } = body

    const { data: newGrade, error } = await supabase
      .from("grades")
      .insert([
        {
          student_id,
          subject_id,
          term,
          score,
          grade,
          teacher_id,
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json(newGrade, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create grade" },
      { status: 500 },
    )
  }
}
