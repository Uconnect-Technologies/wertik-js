System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function default_1(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    exports_1("default", default_1);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=randomString.js.map