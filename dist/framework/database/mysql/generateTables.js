System.register(["./getSequelizeType"], function (exports_1, context_1) {
    "use strict";
    var __assign = (this && this.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var get, getSequelizeType_1, restrictColumns;
    var __moduleName = context_1 && context_1.id;
    function default_1(graphqlFields, database) {
        var keys = Object.keys(graphqlFields);
        var tables = [];
        keys.forEach(function (element) {
            var fields = graphqlFields[element];
            var table = {
                tableName: element,
                fields: {}
            };
            fields.forEach(function (fieldElement) {
                var _a;
                var fieldName = get(fieldElement, 'name.value');
                if (restrictColumns.indexOf(fieldName) == -1) {
                    var type = "";
                    var kind = get(fieldElement, 'type.kind');
                    if (kind == "NonNullType") {
                        type = get(fieldElement, 'type.type.name.value', '');
                    }
                    else {
                        type = get(fieldElement, 'type.name.value', '');
                    }
                    var field = (_a = {},
                        _a[fieldName] = {
                            type: getSequelizeType_1["default"](type),
                            allowNull: (kind == "NonNullType") ? false : true
                        },
                        _a);
                    table.fields = __assign({}, table.fields, field);
                }
            });
            tables.push(table);
        });
        return tables;
    }
    exports_1("default", default_1);
    return {
        setters: [
            function (getSequelizeType_1_1) {
                getSequelizeType_1 = getSequelizeType_1_1;
            }
        ],
        execute: function () {
            get = require("lodash").get;
            restrictColumns = [
                "errors", "successMessage", "successMessageType", "statusCode", "statusCodeNumber", "created_at", "id", "updated_at",
                "_id", "permissions", "assignedPermissions", "assignedRoles"
            ];
        }
    };
});
//# sourceMappingURL=generateTables.js.map