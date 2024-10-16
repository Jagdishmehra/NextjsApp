import { NextResponse } from "next/server";

export function GET(request) {
  try {
    return NextResponse.json({
      message: "fetched succesfully",
    });
  } catch (err) {
    console.error("err: " + err);
  }
}
