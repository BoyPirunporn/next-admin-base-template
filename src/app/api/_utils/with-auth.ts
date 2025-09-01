// app/api/_utils/with-auth.ts (หรือ path ที่คุณต้องการ)

import { authOptions } from "@/lib/auth/auth";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

// 1. กำหนด Type ของ handler ที่จะรับ session เพิ่มเข้ามา
type AuthenticatedRouteHandler<T = {}> = (
    req: NextRequest,
    context: { params: T; },
    session: Session // 👈 เราจะส่ง session ที่ตรวจสอบแล้วเข้าไป
) => Promise<NextResponse | Response>;

// 2. สร้างฟังก์ชัน withAuth
export function withAuth<T = {}>(handler: AuthenticatedRouteHandler<T>) {
    return async (req: NextRequest,context:{params:T}) => {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        // ถ้า session ถูกต้อง ให้เรียก handler เดิมโดยส่ง req และ session เข้าไป
        return handler(req, context,session);
    };
}