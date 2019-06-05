System.register([], function (exports_1, context_1) {
    "use strict";
    var fs;
    var __moduleName = context_1 && context_1.id;
    function exists(path) {
        try {
            fs.accessSync(path);
        }
        catch (err) {
            return false;
        }
        return true;
    }
    exports_1("default", exists);
    return {
        setters: [],
        execute: function () {
            fs = require("fs");
        }
    };
});
//# sourceMappingURL=fileExists.js.map