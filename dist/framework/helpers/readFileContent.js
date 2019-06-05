System.register(["fs"], function (exports_1, context_1) {
    "use strict";
    var fs_1;
    var __moduleName = context_1 && context_1.id;
    function default_1(directory) {
        return new Promise(function (resolve, reject) {
            fs_1["default"].readFile(directory, "utf8", function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    exports_1("default", default_1);
    return {
        setters: [
            function (fs_1_1) {
                fs_1 = fs_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=readFileContent.js.map