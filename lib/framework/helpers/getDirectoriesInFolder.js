"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function getDirectoriesInFolder(path) {
    return fs_1.default.readdirSync(path).filter(function (file) {
        return fs_1.default.statSync(path + '/' + file).isDirectory();
    });
}
exports.default = getDirectoriesInFolder;
//# sourceMappingURL=getDirectoriesInFolder.js.map