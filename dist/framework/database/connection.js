System.register([], function (exports_1, context_1) {
    "use strict";
    var dialect, db_connect, db_models, models;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            dialect = process.env.DIALECT;
            db_connect = null;
            db_models = null;
            if (dialect == "MYSQL") {
                db_connect = require("./mysql/connection.ts")["default"];
                db_models = require("./mysql/connection.ts").models;
            }
            else if (dialect == "MONGO_DB") {
                db_connect = require("./mongodb/connection.ts")["default"];
                db_models = require("./mongodb/connection.ts").models;
            }
            exports_1("default", {
                db_connect: db_connect
            });
            exports_1("models", models = db_models);
        }
    };
});
//# sourceMappingURL=connection.js.map