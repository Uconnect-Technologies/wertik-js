System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function default_1(data) {
        var string = "";
        var split = data.split(" ");
        var addedModules = [];
        split.forEach(function (data) {
            var splitColon = data.split(":");
            var moduleName = splitColon[0], type = splitColon[1];
            var relationType = (type == "many") ? "[" + moduleName + "]" : moduleName;
            string = string + (moduleName + ": " + relationType + "\n\t\t");
        });
        return string;
    }
    exports_1("default", default_1);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=mapRelationFieldsToSchema.js.map