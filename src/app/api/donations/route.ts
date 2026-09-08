import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose"
import FormSubmission from "@/models/FormSubmission"

export async function GET() {
  try {
    await dbConnect()
    const docs = await FormSubmission.find().sort({ createdAt: -1 }).lean()

    const donations = docs.map((doc: any) => ({
      id: doc._id.toString(),
      donationType: doc.donationType,
      amount: doc.amount,
      totalAmount: doc.totalAmount,
      timestamp: doc.timestamp || (doc.createdAt ? doc.createdAt.toISOString() : ""),
      status: (doc.paymentStatus || "pending").toLowerCase(),
      donationPurpose: doc.donationPurpose || "",
      fullName: doc.fullName,
      whatsappNumber: doc.whatsapp || doc.whatsappNumber,
      emailAddress: doc.email || doc.emailAddress,
      requiresVideo: doc.requiresVideo,
      acknowledgeLogistics: doc.acknowledgeLogistics,
      acknowledgeRemainingFunds: doc.acknowledgeRemainingFunds,
      animalCounts: doc.animalCounts,
      wealthAmount: doc.wealthAmount,
      calculatedZakah: doc.calculatedZakah,
      wantsNameplate: doc.wantsNameplate,
      nameplateText: doc.nameplateText,
      mealCount: doc.mealCount,
    }))

    return NextResponse.json(donations)
  } catch (error) {
    console.error("Error fetching donations:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

