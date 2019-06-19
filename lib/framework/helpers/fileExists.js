"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function exists(path) {
    try {
        fs.accessSync(path);
    }
    catch (err) {
        return false;
    }
    return true;
}
exports.default = exists;
//# sourceMappingURL=fileExists.js.map