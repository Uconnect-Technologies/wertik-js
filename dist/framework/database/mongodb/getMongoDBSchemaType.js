System.register([], function (exports_1, context_1) {
    "use strict";
    var relations;
    var __moduleName = context_1 && context_1.id;
    function default_1(type) {
        type = type.toLowerCase();
        if (type == "string") {
            return String;
        }
        else if (type == "int") {
            return Number;
        }
        else if (type == "boolean") {
            return Boolean;
        }
        else if (type == "date" || type == "datetime") {
            return Date;
        }
        else if (relations.indexOf(type) > -1) {
            return String;
        }
    }
    exports_1("default", default_1);
    return {
        setters: [],
        execute: function () {
            relations = ['user', 'forgetPassword', 'permission', 'role', 'rolePermission', 'userRole', 'userPermission', "profile"];
        }
    };
});
//# sourceMappingURL=getMongoDBSchemaType.js.map