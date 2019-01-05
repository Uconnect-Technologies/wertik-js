import controllerName from "./helpers/controllerName.js";
import modules from "./modules/modules.js";
module.exports = function (plop) {
  plop.setGenerator('module', modules);
  plop.addHelper('controllerName', controllerName);
}