import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const publicPages: [] = [

];

const redirectTo = (path: string, req: NextRequest) => NextResponse.redirect(new URL(path, req.url));

// 1. สร้าง intlMiddleware เพื่อจัดการเรื่องภาษาโดยเฉพาะ
const intlMiddleware = createIntlMiddleware(routing);

// 2. สร้าง authMiddleware เพื่อจัดการเรื่องบทบาทโดยเฉพาะ
const authMiddleware = withAuth(
  function middleware(req: NextRequestWithAuth) {
    // จัดการ logic ที่นี้
   NextResponse.next();

  },
  {
    callbacks: {
      authorized: () => {
        return true;
      },
    },
    // ระบุหน้า login (next-auth จะเติม locale ให้เอง)
    pages: {
      signIn: "/auth",
    },
  }
);

const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE;
// 3. Middleware หลักที่ทำหน้าที่ "ต่อท่อ"
export default async function middleware(req: NextRequest) {

  // จัดการ middleware ที่นี่
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return redirectTo(`/${DEFAULT_LOCALE}/auth`, req); 
  }
  // ตรวจสอบว่าเป็นหน้า public หรือไม่ (โดยไม่สน locale)
  const isPublic = publicPages.some((path) => pathname.endsWith(path));

  // ถ้าเป็นหน้า public ให้ intlMiddleware ทำงานอย่างเดียว
  if (isPublic) {
    return intlMiddleware(req);
  }

  // ถ้าไม่ใช่หน้า public ให้ authMiddleware (ที่ข้างในมี intl) ทำงาน
  // แต่เราจะเรียกใช้ authMiddleware ซึ่งจะจัดการทุกอย่างให้
  return (authMiddleware as any)(req);
}

// 4. Matcher ที่ถูกต้อง
export const config = {
  // Matcher จะทำงานกับทุก path ยกเว้นที่ระบุ
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};