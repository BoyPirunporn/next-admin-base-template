// app/api/_utils/api-request.ts
import { authOptions } from "@/lib/auth/auth";
import logger from "@/lib/logger";
import report from "@/lib/report";
import { ResponseApi, ResponseWithError } from "@/model";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const apiBaseUrl = process.env.API_SERVICE!;

const api = axios.create({
  baseURL: apiBaseUrl,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    logger.error("API Error: ", error.response?.data || error.message, this);
    return Promise.reject(error);
  }
);

export async function apiRequest<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  const controller = new AbortController();
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  logger.debug({ token });
  if (config.signal) {
    // ถ้า config.signal ถูก abort ให้ cancel axios ด้วย
    config.signal.addEventListener?.("abort", () => {
      controller.abort();
    });
  }
  try {
    const response = await api.request<T>({
      ...config,
      headers: {
        ...config.headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    report(error);
    // logger.error({ error });
    return Promise.reject(error);
  }
}



export const responseError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return NextResponse.json<ResponseApi | ResponseWithError>({
      message: (error.response?.data.message ?? error.message),
      status: error.response?.status! ?? error.status,
      errors: error.response?.data?.errors ?? {},
      timestamp: error.response?.data.timestamp
    }, {
      status: error.response?.status ?? error.status
    });
  }
  return NextResponse.json<ResponseApi>({
    message: (error as Error).message,
    status: 500,
    timestamp: new Date()
  }, {
    status: 500,
  });
};