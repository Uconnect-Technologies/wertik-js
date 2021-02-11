"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const port = 5200;
const app = express_1.default();
const lodash_1 = require("lodash");
const consoleMessages_1 = require("../../logger/consoleMessages");
function default_1(options, cb) {
    const { configuration } = options;
    const port = lodash_1.get(options, "port", 5200);
    app.use(express_1.default.static("index"));
    app.use(express_1.default.static(path_1.default.join(__dirname, "/content")));
    app.use(function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ip = req.connection.remoteAddress;
            next();
        });
    });
    app.get("/", function (req, res) {
        res.sendFile("./index.html", { root: __dirname });
    });
    app.listen(port, function () {
        consoleMessages_1.successMessage(`Rest API docs running at`, `http://localhost:${port}/`);
        cb();
    });
}
exports.default = default_1;
//# sourceMappingURL=index.js.map