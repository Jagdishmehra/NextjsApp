// this is mongo schema
import mongoose, { model, Schema } from "mongoose";
import validator from "validator";
const userSchema = new Schema(
  {
    firstName: { type: String, required: true, maxLength: 20, minLength: 2 },
    lastName: { type: String, required: true, maxLength: 20 },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("incorrect email");
        }
      },
    },
    about: { type: String, default: "this is user about", maxLength: 250 },
    gender: {
      type: String,
      required: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("gender type not valid");
        }
      },
    },
    password: {
      type: String,
    },
    photoURL: {
      type: String,
      default:
        "https://cn.i.cdn.ti-platform.com/content/2167/we-baby-bears/showpage/fr/webabybears-icon.8db091e9.8db091e9.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("enter valid photo URL");
        }
      },
    },
    verificationCode: {
      type: String,
    },
    isUserVerified: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
export const UserModel =
  mongoose.models.UserModel || new model("UserModel", userSchema);
