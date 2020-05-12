export default function () {
  return new Promise((resolve, reject) => {
    const { createLogger, format, transports } = require("winston");
    const { printf, combine, timestamp, label } = format;

    const myFormat = printf(({ level, message, label, timestamp }) => {
      // return `${timestamp} [${label}] ${level}: ${message}`;
      return JSON.stringify({
        timestamp: timestamp,
        label: label,
        level: level,
        message: message && message.constructor == String ? message : message,
      });
    });

    const logger = createLogger({
      format: combine(label({ label: "right meow!" }), timestamp(), myFormat),
      transports: [
        new transports.Console(),
        new transports.File({
          filename: "info.log",
          level: "info",
        }),
        new transports.File({
          filename: "error.log",
          level: "error",
        }),
        new transports.File({
          filename: "warning.log",
          level: "warning",
        }),
      ],
    });

    resolve(logger);
  });
}
