import { authProvider } from "./options";
import NextAuth from "next-auth";

const handler = NextAuth(authProvider);

export { handler as GET, handler as POST }; //as in route only http method works
