import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("*, author:profiles(first_name, last_name)")
      .eq("published", true)
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch blog posts" },
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
    const { title, content, featured_image_url, published } = body

    const { data: post, error } = await supabase
      .from("blog_posts")
      .insert([
        {
          title,
          content,
          featured_image_url,
          published,
          author_id: user.id,
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create blog post" },
      { status: 500 },
    )
  }
}
