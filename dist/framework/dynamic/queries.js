System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("default", {
                generateQueriesSchema: function (moduleName) {
                    return "\n      view" + moduleName + "(id: Int, action: String,_id: String): " + moduleName + "\n      list" + moduleName + "(pagination: PaginationInput, filters: [FilterInput]): " + moduleName + "List\n    ";
                }
            });
        }
    };
});
//# sourceMappingURL=queries.js.map