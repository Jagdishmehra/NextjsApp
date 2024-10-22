import { connectdb } from "@/helper/database";
import { UserModel } from "@/models/userModel";
import { NextResponse } from "next/server";
//add authentication logic here

//logic for sending email to verify user
export async function POST(request) {
  await connectdb();
  const { email, otp } = await request.json();
  console.log(email, otp);
  const userVerification = await UserModel.findOne({ email });
  //console.log(userVerification.isUserVerified);
  if (userVerification && userVerification.isUserVerified === false) {
    if (userVerification.verificationCode === otp) {
      userVerification.isUserVerified = true;
      userVerification.verificationCode = null;
      await userVerification.save();
      return NextResponse.json(
        {
          message: "User Verified Successfully",
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Incorrect Otp",
        },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      {
        message: "User already verified",
      },
      { status: 201 }
    );
  }
}
