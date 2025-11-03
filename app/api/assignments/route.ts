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

    const { data: assignments, error } = await supabase
      .from("assignments")
      .select("*, subjects(*), classes(*), teachers(profiles(first_name, last_name))")
      .order("due_date", { ascending: true })

    if (error) throw error

    return NextResponse.json(assignments)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch assignments" },
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
    const { title, description, subject_id, class_id, teacher_id, due_date, file_url } = body

    const { data: assignment, error } = await supabase
      .from("assignments")
      .insert([
        {
          title,
          description,
          subject_id,
          class_id,
          teacher_id,
          due_date,
          file_url,
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json(assignment, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create assignment" },
      { status: 500 },
    )
  }
}
