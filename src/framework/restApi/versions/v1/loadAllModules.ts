import {get,kebabCase} from "lodash";

export const getModuleApiPaths = (name: string) => {
  return {
    create: `/api/v1/${kebabCase(name)}/create`,
    update: `/api/v1/${kebabCase(name)}/update`,
    view: `/api/v1/${kebabCase(name)}/:id`,
    delete: `/api/v1/${kebabCase(name)}/:id/delete`,
    paginate: `/api/v1/${kebabCase(name)}/list`,
    bulkCreate: `/api/v1/${kebabCase(name)}/bulk-create`,
    bulkUpdate: `/api/v1/${kebabCase(name)}/bulk-update`,
    bulkDelete: `/api/v1/${kebabCase(name)}/bulk-delete`,
  }
}

export default function (expressApp, configuration,customApi) {
  let modules = configuration.builtinModules.split(",");
  modules = [...modules, ...get(configuration,'modules', [])]
  
  const processModule = (module) => {
    if (module && module.hasOwnProperty("restApi")) {
      let modulePaths = getModuleApiPaths(module.name);
      const restApi = get(module,'restApi',{});
      const restApiEndpoints = get(restApi,'endpoints',[]);
      restApiEndpoints.forEach(restApiEndpointsElement => {
        customApi(expressApp, restApiEndpointsElement,module);
      });

      expressApp.get(modulePaths.view, async (req,res) => {
        let result = await req.models[module.name].view({id: req.params.id}, "*");
        res.json({
          message: `${module.name} view`,
          result: result.instance
        });
      });
      
      // console.log(`Registering api: ${modulePaths.create}`);
      expressApp.post(modulePaths.create, async (req,res) => {
        let result = await req.models[module.name].create(req.body.input);
        res.json({
          message: `${module.name} created`,
          result: result.instance 
        });
      });
      expressApp.post(modulePaths.bulkCreate, async (req,res) => {
        let result = await req.models[module.name].bulkCreate(get(req,'body.input',[]));
        res.json({
          message: `${module.name} bulk operation successfull.`,
          result: result.bulkInstances
        });
      });
      expressApp.put(modulePaths.update, async (req,res) => {
        let result = await req.models[module.name].update(req.body.input);
        res.json({
          message: `${module.name} updated`,
          result: result.instance
        });
      });
      expressApp.put(modulePaths.bulkUpdate, async (req,res) => {
        let result = await req.models[module.name].bulkUpdate(req.body.input);
        res.json({
          message: `${module.name} updated`,
          result: result.bulkInstances
        });
      });
      expressApp.delete(modulePaths.delete, async (req,res) => {
        await req.models[module.name].delete({id: req.params.id})
        res.json({
          message: `${module.name} deleted`,
          result: {}
        });
      });
      expressApp.delete(modulePaths.bulkDelete, async (req,res) => {
        res.json({
          message: `${module.name} deleted`,
          result: await req.models[module.name].bulkDelete(req.body.input)
        });
      });
      expressApp.get(modulePaths.paginate, async (req,res) => {
        let model = req.models[module.name];
        res.json({
          message: `${module.name} list`,
          result: await model.paginate({
            pagination: get(req.body,'pagination',{}),
            filters: get(req.body,'filters',[])
          },"*")
        });
      });
    }
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