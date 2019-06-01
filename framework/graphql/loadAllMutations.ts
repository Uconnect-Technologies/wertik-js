import fileExists from "./../helpers/fileExists.ts";
import dynamic from "./../dynamic/index.ts";
import {join} from "path";
import {camelCase,upperFirst} from "lodash";


export default function(rootDirectory) {
  let modules = process.env.MODULES_ENABLED.split(",");
  let predefinedModules = process.env.PREDEFINED_MODULES.split(",");
  let output = "";
  predefinedModules.forEach(async name => {
    let filePath = join(__dirname,"../../framework/predefinedModules",name,"mutation.ts");
    let isMutationFileExist = fileExists(filePath);
    let content = "";
    if (!isMutationFileExist) {
      content = dynamic.mutations.generateMutationsSchema(upperFirst(camelCase(name)));
    }else {
      content = require(filePath).default;
    }
    content = content.replace("type Mutation {", "");
    content = content.replace("}", "");
    output = output + content;
  });
  return output;
}
