System.register(["./../../../framework/helpers/getIdName"], function (exports_1, context_1) {
    "use strict";
    var _a, Validator, getIdName_1, DIALECT;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (getIdName_1_1) {
                getIdName_1 = getIdName_1_1;
            }
        ],
        execute: function () {
            Validator = require('validatorjs');
            DIALECT = process.env.DIALECT;
            exports_1("default", {
                twoFactorLogin: {
                    email: "required|email"
                },
                loginWithAccessToken: {
                    accessToken: "string|required",
                    refreshToken: "string"
                },
                twoFactorLoginValidate: {
                    twoFactorCode: "string|required"
                },
                signup: {
                    email: "email|required",
                    name: "string",
                    referer: "string",
                    password: "string|required|min:3",
                    confirmPassword: "string|required|min:3"
                },
                activateAccount: {
                    activationToken: "string|required"
                },
                viewUser: (_a = {},
                    _a[getIdName_1["default"]] = (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
                    _a),
                login: {
                    email: "string|required",
                    password: "string|required"
                },
                refreshToken: {
                    refreshToken: "string|required"
                }
            });
        }
    };
});
//# sourceMappingURL=validations.js.map