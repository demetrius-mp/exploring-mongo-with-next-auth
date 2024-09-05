import { authConfig } from "@/config/auth-config";
import { AuthAdapterConfig } from "@/drivers/interfaces/auth/auth-adapter-config";
import NextAuth, { NextAuthResult } from "next-auth";

function createNextAuth(): NextAuthResult {
  const authAdapterName = "mongo";

  let authAdapterConfig: AuthAdapterConfig;

  if (authAdapterName === "mongo") {
    authAdapterConfig =
      require("@/drivers/mongo/auth/mongo-auth-adapter").default;
  } else {
    throw new Error(`Invalid auth adapter ${authAdapterName}`);
  }

  const nextAuth = NextAuth({
    ...authConfig,
    ...authAdapterConfig,
  });

  return nextAuth;
}

export const { auth, handlers, signIn, signOut } = createNextAuth();
