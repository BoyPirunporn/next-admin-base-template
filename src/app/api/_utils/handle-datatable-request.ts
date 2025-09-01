import { PagedResponse } from "@/model";
import { NextRequest, NextResponse } from "next/server";
import { apiRequest, responseError } from "./api-request";

export async function handleDataTableRequest<T>(req: NextRequest, apiUrl: string) {
    const params: Record<string, string> = {};
    for (const [key, value] of req.nextUrl.searchParams.entries()) {
        params[key] = value;
    }

    // logger.debug({params})
    try {
        const response = await apiRequest<PagedResponse<T>>({
            url: apiUrl,
            method: "GET",
            params,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return NextResponse.json(response);
    } catch (error) {
        return responseError(error);
    }
}