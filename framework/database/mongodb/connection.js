import mongoose from "mongoose";
import {Schema} from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import getAllSchemasAsObject from "../../helpers/getAllSchemasAsObject.js";
import generateMongoDBSchema from "./generateMongoDBSchema.js";

const mongo = process.env.MONGO_DB;

mongoose.connect(mongo,{keepAlive: 1,useNewUrlParser: true}).then(() => {
  console.log("Connected to mongodb successfully")
}).catch(err => console.log(err.message));

let mongoCollections = generateMongoDBSchema(mongoose.connection,getAllSchemasAsObject());
let mongodbModels = {};

console.log(mongoCollections);

Object.keys(mongoCollections).forEach((item) => {
  let schema = new Schema(mongoCollections[item],{ collection: item });
  schema.plugin(mongoosePaginate);
  mongodbModels[item] = mongoose.model(item,schema);
});

export default mongoose.connection;
export let models = mongodbModels;