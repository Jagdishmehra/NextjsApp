import mongoose from "mongoose";

export const connectdb = async () => {
  try {
    const mongo = await mongoose.connect(process.env.MONGO_DB_CONNECT, {
      dbName: "next_db",
    });
    console.log(mongo);
  } catch (err) {
    console.log("err: " + err.message);
  }
};
