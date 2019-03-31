import fileExists from "./../helpers/fileExists.js";
import dynamic from "./../dynamic/index.js";
import {join} from "path";
import {camelCase,upperFirst} from "lodash";

export default function(rootDirectory) {
  let path = `${rootDirectory}/app/modules/`;
  let modules = process.env.MODULES_ENABLED.split(",");
  let output = "";
  modules.forEach(async name => {
    let isQueryFileExists = fileExists(join(__dirname,"../../app/modules/",name,"query.js"));
    let content = "";
    if (!isQueryFileExists) {
      content = dynamic.queries.generateQueriesSchema(upperFirst(camelCase(name)));
    }else {
      content = require(`${path}${name}/query.js`).default;
    }
    content = content.replace("type Query {", "");
    content = content.replace("}", "");
    output = output + content;
  });
  return output;
}
