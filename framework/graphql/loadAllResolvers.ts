import getDirectoriesInfolder from "./../helpers/getDirectoriesInFolder";
import {camelCase,upperFirst} from "lodash";
import {join} from "path";

export default function(rootDirectory: any) {
  let path = `${rootDirectory}/app/modules/`;
  let modules = process.env.MODULES_ENABLED.split(",");
  let predefinedModules = process.env.PREDEFINED_MODULES.split(",");
  let output = {
    Query: {},
    Mutation: {}
  };
  predefinedModules.forEach(async name => {
    let filePath = join(__dirname,"../../framework/predefinedModules",name,"resolvers.ts");
    let content = require(filePath).default;
    let queries = content.queries;
    let mutations = content.mutations;
    output.Query = {...output.Query,...queries};
    output.Mutation = {...output.Mutation,...mutations};
    delete content['queries']
    delete content['mutations'];
    output = {...output,...content}
  });
  return output;
}
