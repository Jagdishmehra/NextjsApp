import { Resend } from "resend";
import EmailVerificationTemplate from "../../emails/my-email";
import { NextResponse } from "next/server";
const resend = new Resend(process.env.EMAIL_VERIFICATION_API_KEY);

const sendVerificationCode = async (email, verifyCode) => {
  console.log(email, verifyCode);
  try {
    const data = await resend.emails.send({
      from: "Jagdish <onboarding@resend.dev>",
      to: "jagdishsinghmehra25@gmail.com",
      subject: "Verification Code",
      react: <EmailVerificationTemplate verifyCode={verifyCode} />,
    });
    console.log(data);
    return NextResponse.json({
      message: "fetched otp",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error occured while sending mail: " + NextResponse.error,
      },
      {
        status: 400,
      }
    );
  }
};

export default sendVerificationCode;
