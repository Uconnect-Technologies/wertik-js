const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json } = format;
const winston = require("winston");
const logger = createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    json()
  ),
  transports: [
    new winston.transports.Console({ level: "error", timestamp: true }),
    new winston.transports.Console({ level: "info", timestamp: true }),
    new winston.transports.Console({ level: "warning", timestamp: true }),
    new winston.transports.Console({ level: "notice", timestamp: true }),
    new winston.transports.File({
      filename: "emerg.log",
      level: "emerg"
    }),
    new winston.transports.File({
      filename: "alert.log",
      level: "alert"
    }),
    new winston.transports.File({
      filename: "crit.log",
      level: "crit"
    }),
    new winston.transports.File({
      filename: "error.log",
      level: "error"
    }),
    new winston.transports.File({
      filename: "warning.log",
      level: "warning"
    }),
    new winston.transports.File({
      filename: "notice.log",
      level: "notice"
    }),
    new winston.transports.File({
      filename: "info.log",
      level: "info"
    }),
    new winston.transports.File({
      filename: "debug.log",
      level: "debug"
    })
  ]
});

export default logger;
