System.register(["./../../../framework/helpers/getIdName"], function (exports_1, context_1) {
    "use strict";
    var _a, _b, _c, _d, getIdName_1, DIALECT;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (getIdName_1_1) {
                getIdName_1 = getIdName_1_1;
            }
        ],
        execute: function () {
            DIALECT = process.env.DIALECT;
            exports_1("default", {
                twoFactorLogin: {
                    email: "email|required"
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
                    password: "string|min:3|required",
                    confirmPassword: "string|min:3|required"
                },
                activateAccount: {
                    activationToken: "string|required"
                },
                viewUser: (_a = {},
                    _a[getIdName_1["default"]] = (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
                    _a),
                changePassword: (_b = {
                        oldPassword: "string|min:3|required",
                        newPassword: "string|min:3|required"
                    },
                    _b[getIdName_1["default"]] = (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
                    _b),
                deleteUser: (_c = {},
                    _c[getIdName_1["default"]] = (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
                    _c),
                updateUser: (_d = {},
                    _d[getIdName_1["default"]] = (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
                    _d.name = "string|min:3",
                    _d.email = "string",
                    _d.age = "integer",
                    _d.gender = "integer",
                    _d.isSuperUser = "boolean",
                    _d)
            });
        }
    };
});
//# sourceMappingURL=validations.js.map