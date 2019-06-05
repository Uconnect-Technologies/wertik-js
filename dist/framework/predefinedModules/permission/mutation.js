System.register(["./../../../framework/dynamic/index"], function (exports_1, context_1) {
    "use strict";
    var index_1, DIALECT, relationSchemaType;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            DIALECT = process.env.DIALECT;
            relationSchemaType = "Int";
            if (DIALECT == "MONGO_DB") {
                relationSchemaType = "String";
            }
            exports_1("default", "\n  " + index_1["default"].mutations.generateMutationsSchema("Permission") + "\n");
        }
    };
});
//# sourceMappingURL=mutation.js.map