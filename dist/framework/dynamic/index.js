System.register(["./mutations", "./queries", "./resolvers", "./loader"], function (exports_1, context_1) {
    "use strict";
    var mutations_1, queries_1, resolvers_1, loader_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (mutations_1_1) {
                mutations_1 = mutations_1_1;
            },
            function (queries_1_1) {
                queries_1 = queries_1_1;
            },
            function (resolvers_1_1) {
                resolvers_1 = resolvers_1_1;
            },
            function (loader_1_1) {
                loader_1 = loader_1_1;
            }
        ],
        execute: function () {
            exports_1("default", {
                mutations: mutations_1["default"],
                queries: queries_1["default"],
                resolvers: resolvers_1["default"],
                loader: loader_1["default"]
            });
        }
    };
});
//# sourceMappingURL=index.js.map