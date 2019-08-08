"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let mongoosePaginate = require("mongoose-paginate");
let { Schema } = require("mongoose");
let mongoose = require("mongoose");
const mongo = process.env.mongoURI;
const getAppSchemaAsObject_1 = __importDefault(require("../../helpers/getAppSchemaAsObject"));
const generateMongoDBSchema_1 = __importDefault(require("./generateMongoDBSchema"));
let mongoCollections = generateMongoDBSchema_1.default(mongoose.connection, getAppSchemaAsObject_1.default());
let mongodbModels = {};
Object.keys(mongoCollections).forEach(item => {
    let schema = new Schema(mongoCollections[item], { collection: item, timestamps: true });
    schema.plugin(mongoosePaginate);
    mongodbModels[item] = mongoose.model(item, schema);
});
mongoose
    .connect(mongo, { keepAlive: 1, useNewUrlParser: true })
    .then(() => {
    console.log("Connected to mongodb successfully");
})
    .catch((err) => {
    console.log(err.message);
});
exports.default = mongoose.connection;
exports.models = mongodbModels;
exports.modelsWithSchema = mongoCollections;
//# sourceMappingURL=connection.js.map