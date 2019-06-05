System.register(["fs"], function (exports_1, context_1) {
    "use strict";
    var fs_1;
    var __moduleName = context_1 && context_1.id;
    function getDirectoriesInFolder(path) {
        return fs_1["default"].readdirSync(path).filter(function (file) {
            return fs_1["default"].statSync(path + '/' + file).isDirectory();
        });
    }
    exports_1("default", getDirectoriesInFolder);
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
//# sourceMappingURL=getDirectoriesInFolder.js.map