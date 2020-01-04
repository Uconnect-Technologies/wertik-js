import { get, kebabCase } from "lodash";
import { IConfiguration } from "src/framework/types/configuration";

export const getModuleApiPaths = (name: string) => {
  return {
    create: `/api/v1/${kebabCase(name)}/create`,
    update: `/api/v1/${kebabCase(name)}/update`,
    view: `/api/v1/${kebabCase(name)}/view/:id`,
    delete: `/api/v1/${kebabCase(name)}/:id/delete`,
    paginate: `/api/v1/${kebabCase(name)}/list`,
    bulkCreate: `/api/v1/${kebabCase(name)}/bulk-create`,
    bulkUpdate: `/api/v1/${kebabCase(name)}/bulk-update`,
    bulkDelete: `/api/v1/${kebabCase(name)}/bulk-delete`
  };
};

export default function(expressApp, configuration: IConfiguration, customApi) {
  let modules = configuration.builtinModules.split(",");
  modules = modules.filter(c => c);
  modules = [...modules, ...get(configuration, "modules", [])];

  const processModule = module => {
    const overrideView = get(configuration, `override.${module.name}.restApi.view`, null);
    const overrideList = get(configuration, `override.${module.name}.restApi.list`, null);
    const overrideCreate = get(configuration, `override.${module.name}.restApi.create`, null);
    const overrideUpdate = get(configuration, `override.${module.name}.restApi.update`, null);
    const overrideDelete = get(configuration, `override.${module.name}.restApi.delete`, null);
    const overrideBulkCreate = get(configuration, `override.${module.name}.restApi.bulkCreate`, null);
    const overrideBuklUpdate = get(configuration, `override.${module.name}.restApi.bulkUpdate`, null);
    const overrideBuklDelete = get(configuration, `override.${module.name}.restApi.bulkDelete`, null);

    if (module && module.hasOwnProperty("restApi")) {
      let modulePaths = getModuleApiPaths(module.name);
      const restApi = get(module, "restApi", {});
      const restApiEndpoints = get(restApi, "endpoints", []);
      restApiEndpoints.forEach(restApiEndpointsElement => {
        customApi(expressApp, restApiEndpointsElement, module);
      });

      expressApp.get(modulePaths.view, async (req, res) => {
        if (overrideView && overrideView.constructor == Function) {
          overrideView(req, res);
        } else {
          let result = await req.models[module.name].view({ id: req.params.id }, "*");
          res.json({
            message: `${module.name} view`,
            result: result.instance
          });
        }
      });

      // console.log(`Registering api: ${modulePaths.create}`);
      expressApp.post(modulePaths.create, async (req, res) => {
        if (overrideCreate && overrideCreate.constructor == Function) {
          overrideCreate(req, res);
        } else {
          let result = await req.models[module.name].create(req.body.input);
          res.json({
            message: `${module.name} created`,
            result: result.instance
          });
        }
      });
      expressApp.post(modulePaths.bulkCreate, async (req, res) => {
        if (overrideBulkCreate && overrideBulkCreate.constructor == Function) {
          overrideBulkCreate(req, res);
        } else {
          let result = await req.models[module.name].bulkCreate(get(req, "body.input", []));
          res.json({
            message: `${module.name} bulk operation successfull.`,
            result: result.bulkInstances
          });
        }
      });
      expressApp.put(modulePaths.update, async (req, res) => {
        if (overrideUpdate && overrideUpdate.constructor == Function) {
          overrideUpdate(req, res);
        } else {
          let result = await req.models[module.name].update(req.body.input);
          res.json({
            message: `${module.name} updated`,
            result: result.instance
          });
        }
      });
      expressApp.put(modulePaths.bulkUpdate, async (req, res) => {
        if (overrideBuklUpdate && overrideBuklUpdate.constructor == Function) {
          overrideBuklUpdate(req, res);
        } else {
          let result = await req.models[module.name].bulkUpdate(req.body.input);
          res.json({
            message: `${module.name} updated`,
            result: result.bulkInstances
          });
        }
      });
      expressApp.delete(modulePaths.delete, async (req, res) => {
        if (overrideDelete && overrideDelete.constructor == Function) {
          overrideDelete(req, res);
        } else {
          await req.models[module.name].delete({ id: req.params.id });
          res.json({
            message: `${module.name} deleted`,
            result: {}
          });
        }
      });
      expressApp.delete(modulePaths.bulkDelete, async (req, res) => {
        if (overrideBuklDelete && overrideBuklDelete.constructor == Function) {
          overrideBuklDelete(req, res);
        } else {
          res.json({
            message: `${module.name} deleted`,
            result: await req.models[module.name].bulkDelete(req.body.input)
          });
        }
      });
      expressApp.get(modulePaths.paginate, async (req, res) => {
        if (overrideList && overrideList.constructor == Function) {
          overrideList(req, res);
        } else {
          let model = req.models[module.name];
          let args = {
            pagination: get(req.body, "pagination", {}),
            filters: get(req.body, "filters", [])
          };
          let response = await model.paginate(args, "*");
          res.json({
            message: `${module.name} list`,
            result: response
          });
        }
      });
    }
  };

  modules.forEach(element => {
    let module;
    if (element.constructor === String) {
      module = require(`./../../../builtinModules/${element}/index`).default;
    } else if (element.constructor === Object) {
      module = element;
    }
    processModule(module);
  });
}
