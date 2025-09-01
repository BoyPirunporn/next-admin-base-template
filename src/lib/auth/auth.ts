import { apiRequest } from "@/app/api/_utils/api-request";
import { MenuPermissionNode, ResponseApiWithPayload } from "@/model";
import axios from "axios";
import { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import logger from "../logger";
import report from "../report";

export async function refreshAccessToken(token: JWT) {
  logger.info("Refreshing access token", { token });
  try {
    const res = await fetch(process.env.API_SERVICE + "/api/v1/auth/refresh-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });
    logger.info("RESPONSE ", res.ok);
    if (!res.ok) {
      logger.error("RESPONSE ERROR ", await res.text());
      return { ...token, error: "RefreshAccessTokenError" };
    }

    const refreshed = await res.json();

    return {
      ...token,
      accessToken: refreshed.payload.token,
      accessTokenExpires: extractToken(refreshed.payload.token).exp * 1000, // e.g. 15 mins
      refreshToken: refreshed.payload.refreshToken,
    };
  } catch (error) {
    console.error("Refresh error:", error);
    return { ...token as JWT, error: "RefreshAccessTokenError" };
  }
}

const extractToken = (token: string) => JSON.parse(atob(token.split(".").at(1)!));

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        // logger.debug({ credentials });
        try {
          const res = await apiRequest({
            url: "/api/v1/auth/login",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: credentials,
          });

          const user = res as ResponseApiWithPayload<{
            token: string;
            refreshToken: string;
            roles: string[];
            firstName: string;
            lastName: string;
            image: string;
            isEmailVerify:boolean;
            permissions: MenuPermissionNode[];
          }>;

          const authentication = {
            email: credentials?.email,
            accessToken: user.payload.token,
            refreshToken: user.payload.refreshToken,
            firstName: user.payload.firstName,
            lastName: user.payload.lastName,
            image: user.payload.image,
            roles: user.payload.roles,
            verifyEmail: user.payload.isEmailVerify,
            accessTokenExpires: JSON.parse(atob(user.payload.token.split(".").at(1)!)).exp * 1000, //ที่ *1000 เพราะ ได้ค่าเป็น second เลยต่อง * 1000
            permissions: user.payload.permissions
          } as User;

          return authentication;
        } catch (error) {
          throw new Error(report(error));
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production", // เปลี่ยนบรรทัดนี้
      },
    },
  },
  callbacks: {
    async jwt({ token, trigger, user, session }) {
      // กรณีมี user ใหม่ (ตอน login หรือ session ใหม่)
      if (trigger === "update" && session?.permissions) {
        token.permissions = session.permissions;
        return token;
      }

      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user.accessTokenExpires; // สมมติเป็น ms
        token.permissions = user.permissions;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.image = user.image;
        token.roles = user.roles;
        token.verifyEmail = user.verifyEmail;
        return token;
      }

      // เช็คว่า accessToken หมดอายุหรือยัง
      const isAccessTokenValid = token.accessTokenExpires
        ? Date.now() < (token.accessTokenExpires as number)
        : false;

      if (isAccessTokenValid) {
        // ยังไม่หมดอายุ ใช้ token เดิม
        return token;
      }

      // accessToken หมดอายุแล้ว ต้อง refresh
      try {
        const refreshedToken = await refreshAccessToken(token);
        if (refreshedToken.error) {
          return {
            ...token,
            error: "RefreshAccessTokenError",
          };
        }
        return refreshedToken;
      } catch (error) {
        console.error("Failed to refresh access token", error);
        // ถ้า refresh ไม่ได้ คืน token เดิม (หรือใส่ error flag)
        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      }
    },
    async session({ session, token }: { session: Session, token: JWT; }) {
      session.accessToken = token.accessToken!;
      session.refreshToken = token.refreshToken!;
      session.roles = token.roles;
      session.permissions = token.permissions;
      session.verifyEmail = token.verifyEmail;
      session = {
        ...session,
        user: { ...session.user!, firstName: token.firstName, lastName: token.lastName, image: token.image, roles: token.roles }
      };
      if (token.error) {
        session.error = token.error;
      }
      if (token.permissions) {
        session.permissions = token.permissions;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const handleClearSession = async () => {
  await axios.post("/api/v1/auth/signout");
};