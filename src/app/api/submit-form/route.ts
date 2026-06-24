import { z } from "zod";
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongoose";
import FormSubmission from "@/models/FormSubmission";

const formSchema = z.object({
  // Required fields
  fullName: z.string().nonempty("Full Name is required."),
  donationType: z.string(),
  totalAmount: z.number(),
  timestamp: z.string().default(() => new Date().toISOString()),
  emailAddress: z.string().email("A valid email is required."),
  whatsappNumber: z.string().nonempty("WhatsApp number is required."),
  donationPurpose: z.string().optional().default(""),

  // Optional fields
  amount: z.number().optional(),
  country: z.string().optional(),
  category: z.string().optional(),
  quantity: z.number().optional(),
  donationAmount: z.number().optional(),
  videoConsent: z.string().default("no"),
  wakeelConsent: z.boolean().optional().default(false),
  costConsent: z.boolean().optional().default(false),
  fundConsent: z.boolean().optional().default(false),
  currency: z.string().default("USD"),
  paypalOrderId: z.string().optional(),
  paymentStatus: z.string().default("pending"),
  paymentDate: z.string().optional(),
  requiresVideo: z.string().optional().default("no"),
  acknowledgeLogistics: z.boolean().optional().default(false),
  acknowledgeRemainingFunds: z.boolean().optional().default(false),
  animalCounts: z.record(z.number()).optional().default({}),
  wealthAmount: z.number().optional().default(0),
  calculatedZakah: z.number().optional().default(0),
  nameplateText: z.string().optional().default(""),
  mealCount: z.number().optional().default(0),
  // New fields for payment/tax
  paypalTaxApplied: z.boolean().optional().default(false),
  paypalTaxAmount: z.number().optional().default(0),
  baseAmount: z.number().optional().default(0),
  isPaid: z.boolean().optional().default(false),
  // Arrays and other optional fields
  names: z.array(z.string()).optional().default([]),
  wantsNameplate: z.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received request body:", body);

    // Parse and validate
    const validatedData = formSchema.parse(body);

    // Transform for DB if needed
    const transformedData = {
      ...validatedData,
      email: validatedData.emailAddress,
      whatsapp: validatedData.whatsappNumber,
    };

    await dbConnect();
    const formSubmission = new FormSubmission(transformedData);
    await formSubmission.save();

    return NextResponse.json({ success: true, data: formSubmission });
  } catch (error) {
    console.error("Error saving form submission:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}