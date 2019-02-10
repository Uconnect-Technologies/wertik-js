import getDirectoriesInFolder from "./getDirectoriesInFolder.js";
import {get} from "lodash";
import gql from "graphql-tag";
var path = require('path');
export default function () {
  var appDir = path.dirname(require.main.filename);
  // let f = getDirectoriesInFolder(`${appDir}/app/modules/`);
  let f = ['user', 'forgetPassword','permission','role','rolePermission','userRole','userPermission',"profile" ];
  let object = {};
  f.forEach((folder) => {
    let schemaPath = `${appDir}/app/modules/${folder}/schema.js`;
    let file = require(schemaPath).default;
    let schema = gql(file);
    let fields = get(schema,'definitions[0].fields',[]);
    let definitions = get(schema,'definitions[0]',[]);
    let name = get(definitions,'name.value','');
    if (fields.length == 0) {
      throw `Fields not found for ${folder}`;
    }
    object = {...object,[name.toLowerCase()]: fields}
  });
  return object;
}