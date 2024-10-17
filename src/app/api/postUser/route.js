import { connectdb } from "@/helper/database";
import { NextResponse } from "next/server";

export const POST = async (request, response) => {
  try {
    connectdb();
    console.log("db connected sucessfully");
    return NextResponse.json({
      message: "data posted succesfully",
    });
  } catch (err) {
    console.log("err: " + err.message);
  }
};
