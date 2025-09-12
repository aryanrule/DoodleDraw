import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import connect_DB from "@/lib/mongo";
import User from "@/lib/modals/user";

const razorpay = new Razorpay({
  key_id: process.env.RAZPAY_KEY_ID!,
  key_secret: process.env.RAZPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();
    await connect_DB();

    const findUser = await User.findById(userId);
    if (!findUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const options = {
      amount: 1 * 100, // 1 INR in paise
      currency: "INR",
      receipt: `${Date.now()}`,
      notes: {
        key1: userId,
      },
    };

    console.log("Creating Razorpay order...");
    const order = await razorpay.orders.create(options);
    console.log("Order created:", order);

    return NextResponse.json(
      { order, message: "Order created successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Server error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
