import controllerName from "./helpers/controllerName.js";
import schemaFields from "./helpers/schemaFields.js";
import tableFields from "./helpers/tableFields.js";
import mutationArguments from "./helpers/mutationArguments.js";
import modules from "./modules/modules.js";
module.exports = function (plop) {
  plop.setGenerator('module', modules);
  plop.addHelper('controllerName', controllerName);
  plop.addHelper('schemaFields', schemaFields);
  plop.addHelper('tableFields', tableFields);
  plop.addHelper('mutationArguments', mutationArguments);
}