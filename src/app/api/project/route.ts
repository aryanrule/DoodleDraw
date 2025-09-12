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
    console.log("checkuserPresent", checkUserPresent);
    console.log("checkuserPresntusername", checkUserPresent.username);
    // create the project
    const createProject = await File.create({
      filename: fileName,
      whiteboard: whiteboard || "",
      document: document || "",
      createdBy: checkUserPresent._id,
    });
    console.log("projectCreated" , createProject);   
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
    console.log("updatedUser", updatedUser);
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
        updatedUser: updatedUser,
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

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    // we can validate the user but i am not validating
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");
    if (!projectId) {
      return NextResponse.json(
        { message: "ProjectId is missing" },
        { status: 400 }
      );
    }
    await connect_DB();
    const findProject = await File.findById(projectId);
    if (!findProject) {
      return NextResponse.json(
        { message: "No Project is here with this projectId", success: false },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        message: "here is Your Project",
        success: true,
        file: findProject,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

//save project
export async function PATCH(request: NextRequest, response: NextResponse) {
  try {
    const { ProjectId, whiteboard, document } = await request.json();
    if (!ProjectId) {
      return NextResponse.json(
        { message: "ProjectId or fileName is missing" },
        { status: 400 }
      );
    }
    await connect_DB();
    const findProject = await File.findById(ProjectId);
    if (!findProject) {
      return NextResponse.json(
        { message: "No Project is here with this projectId", success: false },
        { status: 409 }
      );
    }
    const stringifiedDocument = JSON.stringify(document);
    const strigifiedWhiteBoard = JSON.stringify(whiteboard);
    const updatedProject = await File.findByIdAndUpdate(
      ProjectId,
      { document: stringifiedDocument, whiteboard: strigifiedWhiteBoard },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "here is Your updatedPrject",
        success: true,
        file: updatedProject,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(request: NextRequest) {
  try {
    const { userId, projectId } = await request.json();

    if (!userId || !projectId) {
      return NextResponse.json(
        { message: "ProjectId or userId is missing" },
        { status: 400 }
      );
    }

    await connect_DB();

    const checkUserPresent = await User.findById(userId);
    if (!checkUserPresent) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // First remove the project reference from User
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { project: { fileId: projectId } } },
      { new: true }
    ).populate("project");

    // Then delete the project document
    await File.findByIdAndDelete(projectId);

    return NextResponse.json(
      {
        message: "Project deleted successfully",
        success: true,
        userInfo: updatedUser, 
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
