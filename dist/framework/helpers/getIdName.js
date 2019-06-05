System.register([], function (exports_1, context_1) {
    "use strict";
    var DIALECT;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            DIALECT = process.env.DIALECT;
            exports_1("default", (DIALECT == "MONGO_DB") ? "_id" : "id");
        }
    };
});
//# sourceMappingURL=getIdName.js.map