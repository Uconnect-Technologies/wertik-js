System.register(["./getMongoDBSchemaType"], function (exports_1, context_1) {
    "use strict";
    var get, getMongoDBSchemaType_1, restrictColumns;
    var __moduleName = context_1 && context_1.id;
    function default_1(mongoose, schemas) {
        var tables = Object.keys(schemas);
        var object = {};
        tables.forEach(function (table) {
            var tableColumnsArray = schemas[table];
            var tableColumns = {};
            tableColumnsArray.forEach(function (tableColumn) {
                var tableColumnName = get(tableColumn, 'name.value');
                if (restrictColumns.indexOf(tableColumn) == -1) {
                    var type = "";
                    var kind = get(tableColumn, 'type.kind');
                    if (kind == "NonNullType") {
                        type = get(tableColumn, 'type.type.name.value', '');
                    }
                    else {
                        type = get(tableColumn, 'type.name.value', '');
                    }
                    if (type) {
                        type = getMongoDBSchemaType_1["default"](type);
                        tableColumns[tableColumnName] = type;
                    }
                }
            });
            object[table] = tableColumns;
        });
        return object;
    }
    exports_1("default", default_1);
    return {
        setters: [
            function (getMongoDBSchemaType_1_1) {
                getMongoDBSchemaType_1 = getMongoDBSchemaType_1_1;
            }
        ],
        execute: function () {
            get = require("lodash").get;
            restrictColumns = [
                "errors", "successMessage", "successMessageType", "statusCode", "statusCodeNumber", "created_at", "id", "updated_at",
            ];
        }
    };
});
//# sourceMappingURL=generateMongoDBSchema.js.map