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

    const { data: payments, error } = await supabase
      .from("payments")
      .select("*, students(profiles(first_name, last_name))")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(payments)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch payments" },
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

    const body = await request.json()
    const { student_id, amount, description, reference_number } = body

    const { data: payment, error } = await supabase
      .from("payments")
      .insert([
        {
          student_id,
          amount,
          description,
          reference_number,
          status: "pending",
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json(payment, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create payment" },
      { status: 500 },
    )
  }
}
