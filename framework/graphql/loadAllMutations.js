import fileExists from "./../helpers/fileExists.js";
import dynamic from "./../dynamic/index.js";
import {join} from "path";
import {camelCase,upperFirst} from "lodash";


export default function(rootDirectory) {
  let path = `${rootDirectory}/app/modules/`;
  let modules = process.env.MODULES_ENABLED.split(",");
  let output = "";
  modules.forEach(async name => {
    let isMutationFileExist = fileExists(join(__dirname,"../../app/modules/",name,"mutation.js"));
    let content = "";
    if (!isMutationFileExist) {
      content = dynamic.mutations.generateMutationsSchema(upperFirst(camelCase(name)));
    }else {
      content = require(`${path}${name}/mutation.js`).default;
    }
    content = content.replace("type Mutation {", "");
    content = content.replace("}", "");
    output = output + content;
  });
  return output;
}
