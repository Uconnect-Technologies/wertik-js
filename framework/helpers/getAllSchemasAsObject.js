import {get} from "lodash";
import gql from "graphql-tag";
const path = require('path');
import fileExists from "./fileExists.js";

export default function () {
  var appDir = path.dirname(require.main.filename);
  let f = process.env.MODULES_ENABLED.split(",");
  let fList = f.map((c) => c + "List");
  let object = {};
  f.forEach((folder) => {
    let schemaPath = `${appDir}/app/modules/${folder}/schema.js`;
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