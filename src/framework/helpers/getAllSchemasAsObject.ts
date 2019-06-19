let {get} = require('lodash');
let gql = require("graphql-tag")
const path = require('path');
import {join} from "path";
import fileExists from "./fileExists";

export default function () {
  let predefinedModules = process.env.predefinedModules.split(",");
  let object = {};
  predefinedModules.forEach((folder) => {
    let schemaPath = join(__dirname,"../../framework/predefinedModules",folder,"schema.js");
    if (fileExists(schemaPath)) {
      let file = require(schemaPath).default;
      let schema = gql(file);
      let fields = get(schema,'definitions[0].fields',[]);
      let definitions = get(schema,'definitions[0]',[]);
      let name = get(definitions,'name.value','');
      if (fields.length == 0) {
        throw `Fields not found for ${folder}`;
      }
      object = {...object,[name.toLowerCase()]: fields}
    }
  });
  return object;
}