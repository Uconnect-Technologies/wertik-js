System.register(["./../model/model", "./../database/connection"], function (exports_1, context_1) {
    "use strict";
    var model_1, connection_1, modules, predefinedModules, allModels;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (model_1_1) {
                model_1 = model_1_1;
            },
            function (connection_1_1) {
                connection_1 = connection_1_1;
            }
        ],
        execute: function () {
            modules = process.env.MODULES_ENABLED.split(",");
            predefinedModules = process.env.PREDEFINED_MODULES.split(",");
            allModels = {};
            predefinedModules.forEach(function (moduleName, index) {
                if (moduleName !== "auth") {
                    allModels[moduleName + "Model"] = new model_1["default"]({
                        models: connection_1.models,
                        tableName: moduleName.toLowerCase()
                    });
                }
            });
            exports_1("default", allModels);
        }
    };
});
//# sourceMappingURL=allModels.js.map