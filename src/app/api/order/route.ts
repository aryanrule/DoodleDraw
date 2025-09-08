import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import connect_DB from "@/lib/mongo";

import User from "@/lib/modals/user";

const razorpay = new Razorpay({
  key_id: process.env.RAZPAY_KEY_ID!,
  key_secret: process.env.RAZPAY_KEY_SECRET!,
});

// first creating an order id through rzpay
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { userId } = await request.json();
    await connect_DB();
    const findUser = await User.findById(userId);
    if(!findUser){
      return NextResponse.json(
      { message: "user not found" },
      { status: 500 }
    );    
    } 
    var options = {
      amount: 199 * 100,
      currency: "INR",
      receipt: `${Date.now()}`,
      notes: {
        key1: userId,
      },
    };
    console.log("till here i have reached"); 
    const order = await razorpay.orders.create(options);
    console.log(order);
    
    return NextResponse.json({ order : order , message : "order created SuccessFullyy" , succes : true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error  } , 
      { status: 500  } , 
    );  
  }
}
