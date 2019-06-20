import getDirectoriesInfolder from "./../helpers/getDirectoriesInFolder";
let {camelCase,upperFirst} = require("lodash");
let {join} = require("path");

export default function(rootDirectory: any) {
  let predefinedModules = process.env.predefinedModules.split(",");
  let output = {
    Query: {},
    Mutation: {}
  };
  predefinedModules.forEach(async name => {
    let filePath = join(__dirname,"../../framework/predefinedModules",name,"resolvers.js");
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
