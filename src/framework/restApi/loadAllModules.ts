import {get,kebabCase} from "lodash";
export default function (expressApp, configuration) {
  let modules = configuration.builtinModules.split(",");

  const processModule = (module) => {
    expressApp.post(`/api/v1/${kebabCase(module.name)}/create`, async (req,res) => {
      res.json({
        message: `${module.name} created`,
      });
    });
    expressApp.post(`/api/v1/${kebabCase(module.name)}/bulkCreate`, async (req,res) => {
      res.json({
        message: `${module.name} created`,
      });
    });
    expressApp.put(`/api/v1/${kebabCase(module.name)}/update`, async (req,res) => {
      res.json({
        message: `${module.name} updated`,
      });
    });
    expressApp.put(`/api/v1/${kebabCase(module.name)}/bulkUpdate`, async (req,res) => {
      res.json({
        message: `${module.name} updated`,
      });
    });
    expressApp.delete(`/api/v1/${kebabCase(module.name)}/delete`, async (req,res) => {
      res.json({
        message: `${module.name} deleted`,
      });
    });
    expressApp.delete(`/api/v1/${kebabCase(module.name)}/bulkDelete`, async (req,res) => {
      res.json({
        message: `${module.name} deleted`,
      });
    });
    expressApp.get(`/api/v1/${kebabCase(module.name)}/list`, async (req,res) => {
      let model = req.models[module.name];
      res.json({
        message: `${module.name} list`,
        list: await model.paginate({},"*")
      });
    });
  }

  modules.forEach(element => {
    let module;
    if (element.constructor === String) {
      module = require(`./../builtinModules/${element}/index`).default;
    }else if (element.constructor === Object) {
      module = element;
    }
    processModule(module);
  });
}