"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let mongoose = require("mongoose");
let { Schema } = require("mongoose");
let mongoosePaginate = require("mongoose-paginate");
const getAllSchemasAsObject_1 = __importDefault(require("../../helpers/getAllSchemasAsObject"));
const generateMongoDBSchema_1 = __importDefault(require("./generateMongoDBSchema"));
const mongo = process.env.mongoURI;
let mongoCollections = generateMongoDBSchema_1.default(mongoose.connection, getAllSchemasAsObject_1.default());
let mongodbModels = {};
Object.keys(mongoCollections).forEach((item) => {
    let schema = new Schema(mongoCollections[item], { collection: item, timestamps: true });
    schema.plugin(mongoosePaginate);
    mongodbModels[item] = mongoose.model(item, schema);
});
mongoose.connect(mongo, { keepAlive: 1, useNewUrlParser: true }).then(() => {
    console.log("Connected to mongodb successfully");
}).catch((err) => console.log(err.message));
exports.default = mongoose.connection;
exports.models = mongodbModels;
//# sourceMappingURL=connection.js.map