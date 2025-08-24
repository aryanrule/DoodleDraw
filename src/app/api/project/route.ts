"use server";

import connect_DB from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/modals/user";
import File from "@/lib/modals/project";

// create a project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, fileName, document, whiteboard } = body;

    if (!userId || !fileName) {
      return NextResponse.json(
        { message: "userId or fileName is missing" },
        { status: 400 }
      );
    }

    await connect_DB();

    const checkUserPresent = await User.findById(userId);
    if (!checkUserPresent) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (
      checkUserPresent?.plan === "free" &&
      (checkUserPresent?.project?.length ?? 0) >= 5
    ) {
      return NextResponse.json(
        { message: "Free plan limit reached. Upgrade to premium." },
        { status: 403 }
      );
    }
    console.log("checkuserPresent" , checkUserPresent);
    console.log("checkuserPresntusername" , checkUserPresent.username);
    // create the project
    const createProject = await File.create({
      filename: fileName,
      whiteboard: whiteboard || "",
      document: document || "",
      createdBy: checkUserPresent._id,
    });

    // update the user with new project reference
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          project: {
            fileName: fileName,
            fileId: createProject._id,
            username: checkUserPresent.username,
          },
        },
      },
      { new: true }
    );
    console.log("updatedUser" , updatedUser);
    if (!updatedUser) {
      return NextResponse.json(
        { message: "Failed to update user with project ID", success: false },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        message: "Project created successfully",
        success: true,
        // userProjects: updatedUser.project, // safer response
        updatedUser : updatedUser , 
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}



