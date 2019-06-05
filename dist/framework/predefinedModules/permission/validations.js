System.register(["./../../../framework/helpers/getIdName"], function (exports_1, context_1) {
    "use strict";
    var _a, _b, _c, DIALECT, getIdName_1;
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
                createPermission: {
                    action: "string|required"
                },
                deletePermission: (_a = {},
                    _a[getIdName_1["default"]] = (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
                    _a),
                updatePermission: (_b = {},
                    _b[getIdName_1["default"]] = (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
                    _b.action = "string|required",
                    _b),
                permission: (_c = {},
                    _c[getIdName_1["default"]] = (DIALECT == "MONGO_DB") ? "string|required" : "integer|required",
                    _c)
            });
        }
    };
});
//# sourceMappingURL=validations.js.map