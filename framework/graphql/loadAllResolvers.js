import getDirectoriesInfolder from "./../helpers/getDirectoriesInFolder.js";
import {camelCase,upperFirst} from "lodash";

export default function(rootDirectory) {
  let path = `${rootDirectory}/app/modules/`;
  let folders = ['user', 'forgetPassword','permission','role','rolePermission','userRole','userPermission' ,"profile"];
  let output = {
    Query: {},
    Mutation: {}
  };
  folders.forEach(async name => {
    let content = require(`${path}${name}/resolvers.js`).default;
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
