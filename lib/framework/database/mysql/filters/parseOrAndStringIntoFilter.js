"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(value, type) {
    let split = value.split(type);
    let a = split.map(c => {
        return c.split("=")[1];
    });
    return a;
}
exports.default = default_1;
//# sourceMappingURL=parseOrAndStringIntoFilter.js.map