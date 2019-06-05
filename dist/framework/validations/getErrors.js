System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function default_1(errorJoi) {
        var errors = [];
        errorJoi.forEach(function (element) {
            var key = element.context.key;
            var message = element.message;
            errors.push(key + ": " + message);
        });
        return errors;
    }
    exports_1("default", default_1);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=getErrors.js.map