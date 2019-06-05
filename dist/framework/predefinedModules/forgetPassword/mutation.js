System.register([], function (exports_1, context_1) {
    "use strict";
    var DIALECT, relationSchemaType;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            DIALECT = process.env.DIALECT;
            relationSchemaType = "Int";
            if (DIALECT == "MONGO_DB") {
                relationSchemaType = "String";
            }
            exports_1("default", "\n  requestPasswordReset(input: ForgetPasswordInput): ForgetPassword\n  resetPassword(input: ForgetPasswordInput): ForgetPassword\n");
        }
    };
});
//# sourceMappingURL=mutation.js.map