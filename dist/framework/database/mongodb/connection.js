System.register(["../../helpers/getAllSchemasAsObject", "./generateMongoDBSchema"], function (exports_1, context_1) {
    "use strict";
    var mongoose, Schema, mongoosePaginate, getAllSchemasAsObject_1, generateMongoDBSchema_1, mongo, mongoCollections, mongodbModels, models;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (getAllSchemasAsObject_1_1) {
                getAllSchemasAsObject_1 = getAllSchemasAsObject_1_1;
            },
            function (generateMongoDBSchema_1_1) {
                generateMongoDBSchema_1 = generateMongoDBSchema_1_1;
            }
        ],
        execute: function () {
            mongoose = require("mongoose");
            Schema = require("mongoose").Schema;
            mongoosePaginate = require("mongoose-paginate");
            mongo = process.env.MONGO_DB;
            mongoose.connect(mongo, { keepAlive: 1, useNewUrlParser: true }).then(function () {
                console.log("Connected to mongodb successfully");
            })["catch"](function (err) { return console.log(err.message); });
            mongoCollections = generateMongoDBSchema_1["default"](mongoose.connection, getAllSchemasAsObject_1["default"]());
            mongodbModels = {};
            Object.keys(mongoCollections).forEach(function (item) {
                var schema = new Schema(mongoCollections[item], { collection: item });
                schema.plugin(mongoosePaginate);
                mongodbModels[item] = mongoose.model(item, schema);
            });
            exports_1("default", mongoose.connection);
            exports_1("models", models = mongodbModels);
        }
    };
});
//# sourceMappingURL=connection.js.map