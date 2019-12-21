export default function() {
  return new Promise((resolve, reject) => {
    const { createLogger, format, transports } = require("winston");

    const logger = createLogger({
      format: format.combine(format.splat(), format.simple()),
      transports: [
        new transports.Console(),
        new transports.File({
          filename: "info.log",
          level: "info"
        }),
        new transports.File({
          filename: "error.log",
          level: "error"
        }),
        new transports.File({
          filename: "warning.log",
          level: "warning"
        })
      ]
    });

    resolve(logger);
  });
}
