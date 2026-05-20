type LogLevel = "info" | "warn" | "error";

type LogContext = Record<string, unknown> | undefined;

const IS_PRODUCTION = process.env.NODE_ENV === "production";

function shouldLog(level: LogLevel) {
  return !IS_PRODUCTION || level === "error";
}

function writeLog(level: LogLevel, message: string, context?: LogContext) {
  if (!shouldLog(level)) {
    return;
  }

  const timestamp = new Date().toISOString();
  const payload = context ? [message, context] : [message];

  if (level === "info") {
    console.info(timestamp, ...payload);
    return;
  }

  if (level === "warn") {
    console.warn(timestamp, ...payload);
    return;
  }

  console.error(timestamp, ...payload);
}

export const logger = {
  info(message: string, context?: LogContext) {
    writeLog("info", message, context);
  },
  warn(message: string, context?: LogContext) {
    writeLog("warn", message, context);
  },
  error(message: string, context?: LogContext) {
    writeLog("error", message, context);
  },
};
