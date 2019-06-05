System.register(["./fieldTypes"], function (exports_1, context_1) {
    "use strict";
    var has, fieldTypes_1, fieldTypes;
    var __moduleName = context_1 && context_1.id;
    function default_1(data) {
        var string = "";
        var split = data.split(" ");
        var addedColumns = [];
        split.forEach(function (data) {
            var splitColon = data.split(":");
            var columnName = splitColon[0], columnType = splitColon[1];
            var hasProperty = has(fieldTypes, columnType);
            if (addedColumns.indexOf(columnName) > -1) {
                return;
            }
            if (hasProperty) {
                addedColumns.push(splitColon[0]);
                string = string + (columnName + ": " + fieldTypes[columnType] + "\n\t\t\t");
            }
            else {
                console.log(splitColon[1] + " is not a type, Skipping, Please add it manually.");
            }
        });
        return string;
    }
    exports_1("default", default_1);
    return {
        setters: [
            function (fieldTypes_1_1) {
                fieldTypes_1 = fieldTypes_1_1;
            }
        ],
        execute: function () {
            has = require("lodash").has;
            fieldTypes = fieldTypes_1["default"];
        }
    };
});
//# sourceMappingURL=mapFieldsToGraphqlSchemaFields.js.map