// app/api/form-submissions/route.ts

import { NextResponse } from "next/server";
import dbConnect from '@/lib/mongoose';
import FormSubmission from '@/models/FormSubmission';

export async function GET() {
  try {
    await dbConnect();
    const submissions = await FormSubmission.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(submissions);
  } catch (error) {
    console.error("Error fetching form submissions:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}