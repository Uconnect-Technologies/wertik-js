System.register(["path", "./fileExists"], function (exports_1, context_1) {
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
    var get, gql, path, path_1, fileExists_1;
    var __moduleName = context_1 && context_1.id;
    function default_1() {
        var appDir = path.dirname(require.main.filename);
        var f = process.env.MODULES_ENABLED.split(",");
        var predefinedModules = process.env.PREDEFINED_MODULES.split(",");
        var fList = predefinedModules.map(function (c) { return c + "List"; });
        var object = {};
        predefinedModules.forEach(function (folder) {
            var _a;
            var schemaPath = path_1.join(__dirname, "../../framework/predefinedModules", folder, "schema.ts");
            if (fileExists_1["default"](schemaPath)) {
                var file = require(schemaPath)["default"];
                var schema = gql(file);
                var fields = get(schema, 'definitions[0].fields', []);
                var definitions = get(schema, 'definitions[0]', []);
                var name_1 = get(definitions, 'name.value', '');
                if (fields.length == 0) {
                    throw "Fields not found for " + folder;
                }
                object = __assign({}, object, (_a = {}, _a[name_1.toLowerCase()] = fields, _a));
            }
        });
        return object;
    }
    exports_1("default", default_1);
    return {
        setters: [
            function (path_1_1) {
                path_1 = path_1_1;
            },
            function (fileExists_1_1) {
                fileExists_1 = fileExists_1_1;
            }
        ],
        execute: function () {
            get = require('lodash').get;
            gql = require("graphql-tag");
            path = require('path');
        }
    };
});
//# sourceMappingURL=getAllSchemasAsObject.js.map