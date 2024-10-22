import { connectdb } from "@/helper/database";
import { UserModel } from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { passwordValidate } from "@/helper/customPasswordValidtor";
import sendVerificationCode from "@/helper/emailVerification";
// Signing up new user and verification using email
export async function POST(request) {
  try {
    await connectdb();
    const { firstName, lastName, email, password, gender } =
      await request.json();
    const findUserByEmailId = await UserModel.findOne({ email });
    if (findUserByEmailId && findUserByEmailId.isUserVerified === false) {
      return NextResponse.json({
        message: "User already exist. Please Verify your account !",
      });
    } else if (findUserByEmailId) {
      return NextResponse.json({
        message:
          "User with this email-id already exist! Try signing up using different email-id.",
      });
    }
    const verifyCode = Math.floor(100000 + Math.random() * 900000);
    await sendVerificationCode(email, verifyCode);
    passwordValidate(password);
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new UserModel({
      firstName,
      lastName,
      email,
      password: passwordHash,
      gender,
      isUserVerified: false,
      verificationCode: verifyCode,
    });
    const savedUser = await user.save();
    return NextResponse.json({
      message: "User registered successfully, Verify code to proceed.",
      data: savedUser,
    });
  } catch (err) {
    return NextResponse.json({
      message: "err: " + err.message,
    });
  }
}
