System.register([], function (exports_1, context_1) {
    "use strict";
    var ApolloError;
    var __moduleName = context_1 && context_1.id;
    function default_1(e) {
        throw new ApolloError(e.message, 500, {});
    }
    exports_1("default", default_1);
    return {
        setters: [],
        execute: function () {
            ApolloError = require("apollo-server").ApolloError;
        }
    };
});
//# sourceMappingURL=internalServerError.js.map