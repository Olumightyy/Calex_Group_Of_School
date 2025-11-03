import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    // Get user profile to determine role
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).single()

    return NextResponse.json(
      {
        message: "Login successful",
        user: data.user,
        role: profile?.role || "student",
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Login failed" }, { status: 500 })
  }
}
