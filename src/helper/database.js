import mongoose from "mongoose";

export const connectdb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://jagdishsinghmehra25:20b4WzCVrrVdhVUq@cluster0.pslq1.mongodb.net/",
      {
        dbName: "next_db",
      }
    );
  } catch (err) {
    console.log("err: " + err.message);
  }
};
