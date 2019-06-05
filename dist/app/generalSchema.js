System.register([], function (exports_1, context_1) {
    "use strict";
    var pagination, filter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            pagination = "\n\tpage: Int\n\tlimit: Int\n";
            filter = "\n\tcolumn: String\n\toperator: String\n\tvalue: String\n";
            exports_1("default", "\n\tinput PaginationInput {\n\t\t" + pagination + "\n\t}\n\tinput FilterInput {\n\t\t" + filter + "\n\t}\n\ttype Pagination {\n\t\t" + pagination + "\n\t}\n\ttype Filter {\n\t\t" + filter + "\n\t}\n\ttype SuccessMessage {\n\t\tsuccessMessage: String\n\t}\n");
        }
    };
});
//# sourceMappingURL=generalSchema.js.map