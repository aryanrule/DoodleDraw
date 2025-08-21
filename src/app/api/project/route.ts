"use server";

import connect_DB from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/modals/user";
import File from "@/lib/modals/project";
import { create } from "domain";
//create a project
export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  const { userId, fileName, document, whiteboard } = body;
  if (!userId || !fileName) {
    return NextResponse.json(
      { message: "userId or fileId is not recieved " },
      { status: 401 }
    );
  }
  //validate
  await connect_DB();
  const checkUserPresent = await User.findById({ _id: userId });
  if (!checkUserPresent) {
    return NextResponse.json({ message: "user not present" }, { status: 404 });
  }
  if (
    checkUserPresent?.plan == "free" &&
    checkUserPresent?.project.length >= 5
  ) {
    return NextResponse.json(
      { message: "You have reached a free limit kindly upgrade to premium" },
      { status: 507 }
    );
  }
  let Newdocument = document;
  let NewWhiteboard = whiteboard;
  if (!whiteboard) {
    NewWhiteboard = "";
  }
  if (!document) {
    Newdocument = "";
  }

  // now creating the project
  const createProject = await File.create({
    filename: fileName,
    whiteboard: NewWhiteboard,
    document: Newdocument,
    createdBy: checkUserPresent._id,
  });

  //update the user also that
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $push: {
        project: {
          fileName: fileName,
          fileId: createProject._id,
          userName: checkUserPresent?.userName,
        },
      },
    },

    { new: true }
  );

  if (!updatedUser) {
    return NextResponse.json(
      {
        message: "Failed to update user with the project ID",
        success: false,
      },
      { status: 409 }
    );
  }

  return NextResponse.json(
    {
      message: "Hurray you have created a project successfully",
      success: true,
      updatedUser: updatedUser,
    },
    { status: 201 }
  );
}
