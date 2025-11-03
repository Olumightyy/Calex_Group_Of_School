import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: events, error } = await supabase
      .from("events")
      .select("*, creator:profiles(first_name, last_name)")
      .order("event_date", { ascending: true })

    if (error) throw error

    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch events" },
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

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const { title, description, event_date, location, image_url } = body

    const { data: event, error } = await supabase
      .from("events")
      .insert([
        {
          title,
          description,
          event_date,
          location,
          image_url,
          created_by: user.id,
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create event" },
      { status: 500 },
    )
  }
}
