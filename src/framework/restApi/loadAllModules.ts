import {get,kebabCase} from "lodash";
export default function (expressApp, configuration) {
  let modules = configuration.builtinModules.split(",");
  modules = [...modules, ...get(configuration,'modules', [])]

  const processModule = (module) => {
    expressApp.post(`/api/v1/${kebabCase(module.name)}/create`, async (req,res) => {
      res.json({
        message: `${module.name} created`,
        result: await req.models[module.name].create(req.body.input)
      });
    });
    expressApp.post(`/api/v1/${kebabCase(module.name)}/bulkCreate`, async (req,res) => {
      res.json({
        message: `${module.name} created`,
        result: await req.models[module.name].bulkCreate(req.body.input)
      });
    });
    expressApp.put(`/api/v1/${kebabCase(module.name)}/update`, async (req,res) => {
      res.json({
        message: `${module.name} updated`,
        result: await req.models[module.name].update(req.body.input)
      });
    });
    expressApp.put(`/api/v1/${kebabCase(module.name)}/bulkUpdate`, async (req,res) => {
      res.json({
        message: `${module.name} updated`,
        result: await req.models[module.name].bulkUpdate(req.body.input)
      });
    });
    expressApp.delete(`/api/v1/${kebabCase(module.name)}/delete`, async (req,res) => {
      res.json({
        message: `${module.name} deleted`,
        result: await req.models[module.name].delete(req.body.input)
      });
    });
    expressApp.delete(`/api/v1/${kebabCase(module.name)}/bulkDelete`, async (req,res) => {
      res.json({
        message: `${module.name} deleted`,
        result: await req.models[module.name].bulkDelete(req.body.input)
      });
    });
    expressApp.get(`/api/v1/${kebabCase(module.name)}/list`, async (req,res) => {
      let model = req.models[module.name];
      res.json({
        message: `${module.name} list`,
        result: await model.paginate(get(req.body,'pagination',{}),"*")
      });
    });
    expressApp.get(`/api/v1/${kebabCase(module.name)}/view`, async (req,res) => {
      console.log(req.body.input);
      let model = req.models[module.name];
      res.json({
        message: `${module.name} view`,
        result: await req.models[module.name].view(req.body.input, "*")
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