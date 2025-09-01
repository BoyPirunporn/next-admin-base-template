import { isAxiosError } from "axios";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import report from "./report";

export const handleError = async (error: unknown) => {
  report(error);
  if (isAxiosError(error)) {
    if (error.response?.status === 401) {
      throw redirect(`/${await getLocale()}/auth`);
    }
  }
  throw error;
};
