import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connect_DB from "@/lib/mongo";
import User from "@/lib/modals/user";

const generateSignature = (razorpayOrderId: string, razorpayPaymentId: string) => {
  const keySecret = process.env.RAZPAY_KEY_SECRET;
  if (!keySecret) {
    throw new Error("Razorpay key secret is not defined in environment variables.");
  }
  return crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
};

 
export async function POST(request: NextRequest) {
  const data = await request.json();
  const {razorpayOrderId , razorpayPaymentId  , razorpaySignature , orderCreationId , userId} = data;
  // console.log("razorpayOrderId , razorpayPaymentId  , razorpaySignature" , razorpayOrderId , razorpayPaymentId  , razorpaySignature);  
  
  if (
    !razorpayOrderId ||
    typeof razorpayOrderId !== "string" ||
    !razorpayPaymentId ||
    typeof razorpayPaymentId !== "string" ||
    !razorpaySignature ||
    typeof razorpaySignature !== "string"
  ) {
    return NextResponse.json(
      { message: "Invalid request payload", isOk: false },
      { status: 400 }
    );
  }

  try {
    const signature = generateSignature(razorpayOrderId, razorpayPaymentId);

    if (signature !== razorpaySignature) {
      return NextResponse.json(
        { message: "Payment verification failed", isOk: false },
        { status: 400 }
      );
    }

    console.log("payment is verified");
    await connect_DB();
    const updateUser = await User.findByIdAndUpdate(userId , {plan : "premium"} , {new : true});
    console.log("updateUser" , updateUser); 
   
    return NextResponse.json(
      { message: "Payment verified successfully", isOk: true , updatedUser : updateUser},  
      { status: 200 } , 
      
    );
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { message: "Server error", isOk: false },
      { status: 500 }
    );
  }
}
