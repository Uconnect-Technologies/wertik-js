System.register([], function (exports_1, context_1) {
    "use strict";
    var camelCase;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            camelCase = require("lodash").camelCase;
            exports_1("default", {
                generateMutationsSchema: function (moduleName) {
                    return "\n        create" + moduleName + "(input: " + moduleName + "Input): " + moduleName + "\n        delete" + moduleName + "(input: " + moduleName + "Input): " + moduleName + "\n        update" + moduleName + "(input: " + moduleName + "Input): " + moduleName + "\n        updateBulk" + moduleName + "(input: [" + moduleName + "Input]): [" + moduleName + "]\n        createBulk" + moduleName + "(input: [" + moduleName + "Input]): [" + moduleName + "]\n        deleteBulk" + moduleName + "(input: [" + moduleName + "Input]): [" + moduleName + "]\n    ";
                }
            });
        }
    };
});
//# sourceMappingURL=mutations.js.map