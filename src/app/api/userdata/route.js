import { NextResponse } from "next/server";

export function DELETE(request) {
  try {
    return NextResponse.json({ message: "user deleted successfully" });
  } catch (err) {
    console.log("err: " + err.message);
  }
}
