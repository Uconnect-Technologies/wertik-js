"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoMessage = exports.warningMessage = exports.errorMessage = exports.successMessage = void 0;
const log_symbols_1 = __importDefault(require("log-symbols"));
const chalk_1 = __importDefault(require("chalk"));
const log = console.log;
exports.successMessage = function (message, secondMessage) {
    log(log_symbols_1.default.success, ` [Wertik-js]: `, chalk_1.default.green(message), secondMessage ? chalk_1.default.blue.underline.bold(secondMessage) : "");
};
exports.errorMessage = function (message) {
    log(log_symbols_1.default.error, ` [Wertik-js]:`, chalk_1.default.red(message));
};
exports.warningMessage = function () { };
exports.infoMessage = function () { };
//# sourceMappingURL=consoleMessages.js.map