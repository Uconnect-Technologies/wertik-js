import {get,kebabCase} from "lodash";
export default function (expressApp, configuration,customApi) {
  let modules = configuration.builtinModules.split(",");
  modules = [...modules, ...get(configuration,'modules', [])]

  const processModule = (module) => {
    const restApi = get(module,'restApi',{});
    const restApiEndpoints = get(restApi,'endpoints',[]);
    restApiEndpoints.forEach(restApiEndpointsElement => {
      customApi(expressApp, restApiEndpointsElement,module);
    });
    expressApp.post(`/api/v1/${kebabCase(module.name)}/create`, async (req,res) => {
      let result = await req.models[module.name].create(req.body.input);
      res.json({
        message: `${module.name} created`,
        result: result.instance
      });
    });
    expressApp.post(`/api/v1/${kebabCase(module.name)}/bulk-create`, async (req,res) => {
      let result = await req.models[module.name].bulkCreate(req.body.input);
      res.json({
        message: `${module.name} created`,
        result: result.bulkInstances
      });
    });
    expressApp.put(`/api/v1/${kebabCase(module.name)}/update`, async (req,res) => {
      let result = await req.models[module.name].update(req.body.input);
      res.json({
        message: `${module.name} updated`,
        result: result.instance
      });
    });
    expressApp.put(`/api/v1/${kebabCase(module.name)}/bulk-update`, async (req,res) => {
      let result = await req.models[module.name].bulkUpdate(req.body.input);
      res.json({
        message: `${module.name} updated`,
        result: result.bulkInstances
      });
    });
    expressApp.delete(`/api/v1/${kebabCase(module.name)}/:id/delete`, async (req,res) => {
      res.json({
        message: `${module.name} deleted`,
        result: await req.models[module.name].delete({id: req.params.id})
      });
    });
    expressApp.delete(`/api/v1/${kebabCase(module.name)}/bulk-delete`, async (req,res) => {
      res.json({
        message: `${module.name} deleted`,
        result: await req.models[module.name].bulkDelete(req.body.input)
      });
    });
    expressApp.get(`/api/v1/${kebabCase(module.name)}/list`, async (req,res) => {
      let model = req.models[module.name];
      res.json({
        message: `${module.name} list`,
        result: await model.paginate({
          pagination: get(req.body,'pagination',{}),
          filters: get(req.body,'filters',[])
        },"*")
      });
    });
    expressApp.get(`/api/v1/${kebabCase(module.name)}/:id`, async (req,res) => {
      let result = await req.models[module.name].view({id: req.params.id}, "*");
      res.json({
        message: `${module.name} view`,
        result: result.instance
      });
    });
  }

  modules.forEach(element => {
    let module;
    if (element.constructor === String) {
      module = require(`./../../../builtinModules/${element}/index`).default;
    }else if (element.constructor === Object) {
      module = element;
    }
    processModule(module);
  });
}