import { authConfig } from "@/config/auth-config";
import { NextAuthConfig } from "next-auth";

export type AuthAdapterConfig = Omit<NextAuthConfig, keyof typeof authConfig>;

export function defineAuthAdapterConfig(
  authAdapter: AuthAdapterConfig
): AuthAdapterConfig {
  return authAdapter;
}
