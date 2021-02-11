"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let { ApolloError } = require("apollo-server");
function default_1(e, code = 500) {
    return new ApolloError(e.message, code, {});
}
exports.default = default_1;
//# sourceMappingURL=internalServerError.js.map