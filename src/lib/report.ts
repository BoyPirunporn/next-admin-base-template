import { isAxiosError } from "axios";
import logger from "./logger";

export default function(error: unknown){
  if (isAxiosError(error)) {
    logger.error("Axios Error " + error);
  } else {
    logger.error("Exception Error " + error);
  }
  return isAxiosError(error) ? (error.response?.data.message ?? error.message) : (error as Error).message;
};