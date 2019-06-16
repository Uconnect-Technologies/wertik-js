"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let { ApolloError } = require("apollo-server");
function default_1(e) {
    throw new ApolloError(e.message, 500, {});
}
exports.default = default_1;
//# sourceMappingURL=internalServerError.js.map