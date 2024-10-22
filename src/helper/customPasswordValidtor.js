import validator from "validator";
export function passwordValidate(password) {
  if (password.length < 1) {
    throw new Error("password is required");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("enter a strong password");
  }
}
