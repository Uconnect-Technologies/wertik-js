System.register([], function (exports_1, context_1) {
    "use strict";
    var DIALECT;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            DIALECT = process.env.DIALECT;
            exports_1("default", {
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
            });
        }
    };
});
//# sourceMappingURL=validations.js.map