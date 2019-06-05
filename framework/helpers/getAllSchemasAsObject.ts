import {get} from "lodash";
import * as gql from "graphql-tag";
const path = require('path');
import {join} from "path";
import fileExists from "./fileExists";

export default function () {
  var appDir = path.dirname(require.main.filename);
  let f = process.env.MODULES_ENABLED.split(",");
  let predefinedModules = process.env.PREDEFINED_MODULES.split(",");
  let fList = predefinedModules.map((c) => c + "List");
  let object = {};
  predefinedModules.forEach((folder) => {
    let schemaPath = join(__dirname,"../../framework/predefinedModules",folder,"schema.ts");
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