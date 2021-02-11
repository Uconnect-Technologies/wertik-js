"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
function default_1() {
    return new Promise((resolve, reject) => {
        const { createLogger, format, transports } = require("winston");
        const { printf } = format;
        const myFormat = printf((obj) => {
            return JSON.stringify(Object.assign({ timestamp: moment_1.default().format(), formattedTimeStamp: moment_1.default().format("MMMM Do YYYY, h:mm:ss a") }, obj));
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
exports.default = default_1;
//# sourceMappingURL=index.js.map