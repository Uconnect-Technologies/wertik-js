import moment from "moment";

export default function () {
  return new Promise((resolve, reject) => {
    const { createLogger, format, transports } = require("winston");
    const { printf } = format;

    const myFormat = printf((obj) => {
      return JSON.stringify({
        timestamp: moment().format(),
        formattedTimeStamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
        ...obj,
      });
    });

    const logger = createLogger({
      format: myFormat,
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
