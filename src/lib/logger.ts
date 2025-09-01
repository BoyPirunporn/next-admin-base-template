function getCallerInfo() {
  const err = new Error();
  const stack = err.stack?.split("\n");

  // stack[0] = Error
  // stack[1] = ที่เรียก getCallerInfo()
  // stack[2] = ที่เรียก logger (caller จริงๆ)
  const caller = stack?.[3] || "";
  return caller.trim();
}
const dev = process.env.NODE_ENV === "development";
export default {
  info: (...args: any[]) => {
    console.info(`[INFO] ${getCallerInfo()}`, ...args);
  },
  debug: (...args: any[]) => {
    if (dev) {
      console.debug(`[DEBUG] ${getCallerInfo()}`, ...args);
    }
  },
  warn: (...args: any[]) => {
    if (dev) {
      console.warn(`[WARN] ${getCallerInfo()}`, ...args);
    }
  },
  error: (...args: any[]) => {
    if (dev) {
      console.error(`[ERROR] ${getCallerInfo()}`, ...args);
    }
  },
};