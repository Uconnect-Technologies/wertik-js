System.register([], function (exports_1, context_1) {
    "use strict";
    var dialect, action, path, create, paginate, update, view, destroy, findOne;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            dialect = process.env.DIALECT;
            action = dialect.toLowerCase();
            path = __dirname;
            create = require(path + "/" + action + "/create.ts")["default"];
            paginate = require(path + "/" + action + "/paginate.ts")["default"];
            update = require(path + "/" + action + "/update.ts")["default"];
            view = require(path + "/" + action + "/view.ts")["default"];
            destroy = require(path + "/" + action + "/destroy.ts")["default"];
            findOne = require(path + "/" + action + "/findOne.ts")["default"];
            exports_1("default", {
                create: create,
                update: update,
                paginate: paginate,
                view: view,
                destroy: destroy,
                findOne: findOne
            });
        }
    };
});
//# sourceMappingURL=index.js.map