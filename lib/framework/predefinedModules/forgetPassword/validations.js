"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    requestPasswordReset: {
        email: "email|required"
    },
    forgetPassword: {
        token: "string|required"
    },
    resetPassword: {
        password: "string|min:3|required",
        confirmPassword: "string|min:3|required",
        token: "string|required"
    }
};
//# sourceMappingURL=validations.js.map