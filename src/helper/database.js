import mongoose from "mongoose";
//check the first connection before connecting to db again for unnecessary connections
export const connectdb = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("connection already exists");
    return;
  }
  try {
    const mongo = await mongoose.connect(process.env.MONGO_DB_CONNECT, {
      dbName: "next_db",
    });
    //console.log(mongo);
    console.log("db connected sucessfully for the 2 nd time");
  } catch (err) {
    console.log("err: " + err.message);
  }
};
