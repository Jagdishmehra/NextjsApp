import { connectdb } from "@/helper/database";
import { UserModel } from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectdb();

  const { email, content } = await request.json();
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }
    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage);
    await user.save();
    return NextResponse.json(
      {
        message: "message sent sucessfully",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "message not sent",
      },
      {
        status: 500,
      }
    );
  }
}
