"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_fields_1 = __importDefault(require("graphql-fields"));
function default_1(info) {
    let fields = graphql_fields_1.default(info);
    null, 2;
    ;
    delete fields['pagination'];
    delete fields['filters'];
    return fields;
}
exports.default = default_1;
//# sourceMappingURL=getRequestedFieldsFromResolverInfo.js.map