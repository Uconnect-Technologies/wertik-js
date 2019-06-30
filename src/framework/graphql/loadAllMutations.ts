import fileExists from "./../helpers/fileExists";
import dynamic from "./../dynamic/index";
let {join} = require("path");
let {camelCase,upperFirst} = require("lodash");


export default function(rootDirectory: any) {
  let predefinedModules = process.env.predefinedModules.split(",");
  let output = "";
  predefinedModules.forEach(async (name: string) => {
    let filePath = join(__dirname,"../../framework/predefinedModules",name,"mutation.js");
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
