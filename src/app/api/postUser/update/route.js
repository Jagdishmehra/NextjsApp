import { NextResponse } from "next/server";

export function POST() {
  return NextResponse.json({
    message: "this is nested route test",
  });
}
