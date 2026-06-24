// app/api/qurbani/route.ts

import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // ✅ You can log the received data
    console.log("Received Qurbani Submission:", data)

    // ✅ Add your logic here (e.g., save to DB, send email, etc.)

    return NextResponse.json({ success: true, message: "Submission received." })
  } catch (error) {
    console.error("Error in /api/qurbani POST:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
