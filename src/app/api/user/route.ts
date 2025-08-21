//building 3 apis
//getUserDetails
//createuser
//findUser

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import connect_DB from "@/lib/mongo";
import mongoose from "mongoose";
import User from "@/lib/modals/user";

//getuserDetails
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const { getUser } = getKindeServerSession();
    const kindUser = await getUser();
    if (!kindUser) {
      console.log("there is no user registered here");
      return NextResponse.json(
        { status: 401, message: "User not authenticated" },
        { status: 401 }
      );
    }
    console.log("kindUser", kindUser);

    await connect_DB();
    const userDetails = await User.findOne({ email: kindUser.email }).populate("project");
    console.log("userDetails", userDetails);
    if (userDetails) {
      return NextResponse.json({
        status: 200,
        userDetails: userDetails , 
        message: "here is the complete user details",
      });
    } else {
      const newUser = await User.create({
        username: kindUser.given_name,
        email: kindUser.email,
        kindeId: kindUser.id,
        picture: kindUser.picture,
        plan: "free",
      });
      return NextResponse.json({
        status: 200,
        userDetails: newUser,
        message: "here is the complete user details",
      });
    }
  } catch (error) {
    console.log(error, "<-- error occurred while creating user");
    return NextResponse.json(
      { status: 500, message: "Server error", error },
      { status: 500 }
    );
  }
}
//createUser
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();
    const { username, email, kindeId, picture } = body;
    if (!username || !email || !kindeId) {
      if (!username || !email || !kindeId) {
        return NextResponse.json(
          { message: "Missing required fields" },
          { status: 400 } // Bad Request
        );
      }
    }
   
    await connect_DB();
    const user = await User.findOne({email : email});
    if(user){
        NextResponse.json(
               { message: "already present" },
              { status: 409 }
        )
    }

  } catch (error) {
    console.error(error, "<-- error occurred while creating user");
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


// //finduser
// export const findUser = async (KindeId:string)=>{
//   try {
//     if (!KindeId){
//         throw new Error('_id is not provided');
//         return
//     }
//     await connect_DB();
//     const Getuser = await User.findOne({KindeId: KindeId});
//     return Getuser

//   } catch (error) {
//     console.log(error);
//   }
// }