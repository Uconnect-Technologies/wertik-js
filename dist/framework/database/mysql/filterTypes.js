System.register([], function (exports_1, context_1) {
    "use strict";
    var Sequelize, op, types, typeValues;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Sequelize = require("sequelize");
            op = Sequelize.Op;
            exports_1("types", types = [
                "equals", "not_equals",
                "in_list", "not_in_list", "starts_with",
                "between", "not_between", "greater_than",
                "less_than", "less_than_equals", "greater_than_equals",
            ]);
            exports_1("typeValues", typeValues = {
                "equals": op.eq,
                "not_equals": op.ne,
                "in_list": op["in"],
                "not_in_list": op.notIn,
                "starts_with": op.startsWith,
                "between": op.between,
                "not_between": op.notBetween,
                "greater_than": op.ge,
                "less_than": op.le,
                "less_than_equals": op.lte,
                "greater_than_equals": op.gte
            });
        }
    };
});
//# sourceMappingURL=filterTypes.js.map