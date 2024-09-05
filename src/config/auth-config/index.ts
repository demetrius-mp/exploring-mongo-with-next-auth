import { providers } from "@/config/auth-config/providers";
import { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers,
  cookies: {
    sessionToken: {
      name: "sessionToken",
      options: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        domain: process.env.SESSION_DOMAIN,
        path: process.env.SESSION_PATH || "/",
        maxAge: 30 * 24 * 60 * 60, // 30 days
      },
    },
    csrfToken: {
      name: "csrfToken",
    },
    callbackUrl: {
      name: "callbackUrl",
    },
  },
} satisfies NextAuthConfig;
