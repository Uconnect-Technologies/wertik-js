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
            exports_1("default", "\n\ttype game {\n\t\t_id: String\n\t\tid: Int\n\t\tname: String\n\t\t\tplays: Int\n\t\t\t\n\t\tuser: [user]\n\t\t\n\t\tcreated_by: User\n\t\tcreated_at: String\n\t\tupdated_at: String\n\t}\n\tinput gameInput {\n\t\t_id: String\n\t\tid: Int\n\t\tname: String\n\t\t\tplays: Int\n\t\t\t\n\t\tcreated_by: User\n\t\tcreated_at: String\n\t\tupdated_at: String\n\t}\n");
        }
    };
});
//# sourceMappingURL=schema.js.map