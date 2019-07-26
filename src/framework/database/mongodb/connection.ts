let mongoose = require("mongoose");
let { Schema } = require("mongoose");
let mongoosePaginate = require("mongoose-paginate");
import getAppSchemaAsObject from "../../helpers/getAppSchemaAsObject";
import generateMongoDBSchema from "./generateMongoDBSchema";

const mongo = process.env.mongoURI;

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
  .catch((err: any) => console.log(err.message));

export default mongoose.connection;
export let models = mongodbModels;
