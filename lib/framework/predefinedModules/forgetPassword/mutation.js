"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DIALECT } = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
    relationSchemaType = "String";
}
exports.default = `
  requestPasswordReset(input: ForgetPasswordInput): ForgetPassword
  resetPassword(input: ForgetPasswordInput): ForgetPassword
`;
//# sourceMappingURL=mutation.js.map