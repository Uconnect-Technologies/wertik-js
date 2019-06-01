import fileExists from "./../helpers/fileExists";
import dynamic from "./../dynamic/index";
import {join} from "path";
import {camelCase,upperFirst} from "lodash";

export default function(rootDirectory) {
  let path = `${rootDirectory}/app/modules/`;
  let frameworkPath = `${rootDirectory}/frameworkPath/`;
  let modules = process.env.MODULES_ENABLED.split(",");
  let predefinedModules = process.env.PREDEFINED_MODULES.split(",");
  let output = "";
  predefinedModules.forEach(async name => {
    let filePath = join(__dirname,"../../framework/predefinedModules",name,"query");
    let isQueryFileExists = fileExists(filePath);
    let content = "";
    if (!isQueryFileExists) {
      content = dynamic.queries.generateQueriesSchema(upperFirst(camelCase(name)));
    }else {
      content = require(filePath).default;
    }
    content = content.replace("type Query {", "");
    content = content.replace("}", "");
    output = output + content;
  });
  return output;
}
