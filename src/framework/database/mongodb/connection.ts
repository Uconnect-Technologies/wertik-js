let mongoose = require("mongoose");
let {Schema} = require("mongoose");
let mongoosePaginate = require("mongoose-paginate");
import getAllSchemasAsObject from "../../helpers/getAllSchemasAsObject";
import generateMongoDBSchema from "./generateMongoDBSchema";

const mongo = process.env.mongoURI;

mongoose.connect(mongo,{keepAlive: 1,useNewUrlParser: true}).then(() => {
  console.log("Connected to mongodb successfully")
}).catch((err: any) => console.log(err.message));

let mongoCollections = generateMongoDBSchema(mongoose.connection,getAllSchemasAsObject());
let mongodbModels: any = {};

Object.keys(mongoCollections).forEach((item) => {
  let schema = new Schema(mongoCollections[item],{ collection: item });
  schema.plugin(mongoosePaginate);
  mongodbModels[item] = mongoose.model(item,schema);
});

export default mongoose.connection;
export let models = mongodbModels;