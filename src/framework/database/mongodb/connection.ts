let mongoosePaginate = require("mongoose-paginate");
let { Schema } = require("mongoose");
let mongoose = require("mongoose");

const mongo = process.env.mongoURI;

import getAppSchemaAsObject from "../../helpers/getAppSchemaAsObject";
import generateMongoDBSchema from "./generateMongoDBSchema";

let mongoCollections = generateMongoDBSchema(mongoose.connection, getAppSchemaAsObject());
let mongodbModels: any = {};

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
  .catch((err: any) => {
    console.log(err.message);
  });

export default mongoose.connection;
export let models = mongodbModels;
export let modelsWithSchema = mongoCollections;
