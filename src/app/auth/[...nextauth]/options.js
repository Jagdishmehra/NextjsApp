import { UserModel } from "@/models/userModel";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectdb } from "@/helper/database";

export const authProvider = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectdb();
        const user = await UserModel.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("User not found");
        } else {
          const isUserValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isUserValid) {
            return user;
          } else {
            throw new Error("Invalid Password");
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in", //it will create a custom signin page by itself
  },
  session: {
    strategy: "jwt", //to use jwt token not database session
  },
  callbacks: {
    //these callbacks are to modify our functions accordingly
    async jwt({ token, user }) {
      if (user) {
        token._id = user?._id.toString(); /// to convert this obj value to string
        token.firstName = user.firstName;
        token.isUserVerified = user.isUserVerified;
        token.email = user.email;
      }
      return token;
    },
    secret: process.env.SECRET_KEY,
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user._email = token.email;
        session.user.firstName = token.firstName;
      }
      return session;
    },
  },
};
