"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
exports.default = default_1;
//# sourceMappingURL=randomString.js.map