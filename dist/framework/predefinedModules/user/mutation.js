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
            exports_1("default", "\n\tdeleteUser(id: Int,_id: String): User\n\tchangePassword(input: UserInput): User\n\tupdateUser(input: UserInput): User\n");
        }
    };
});
//# sourceMappingURL=mutation.js.map