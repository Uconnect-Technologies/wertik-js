System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function default_1(moduleName) {
        return "\n    type " + moduleName + "List {\n      list: [" + moduleName + "]\n      pagination: Pagination\n      filters: [Filter]\n    }\n  ";
    }
    exports_1("default", default_1);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=getListByPaginationAndFiltersSchema.js.map