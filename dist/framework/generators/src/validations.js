System.register([], function (exports_1, context_1) {
    "use strict";
    var DIALECT;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            DIALECT = process.env.DIALECT;
            exports_1("default", {
                creategame: function () {
                    return {};
                },
                updategame: function () {
                    return {};
                },
                deletegame: function () {
                    return {};
                },
                game: function () {
                    return {};
                }
            });
        }
    };
});
//# sourceMappingURL=validations.js.map