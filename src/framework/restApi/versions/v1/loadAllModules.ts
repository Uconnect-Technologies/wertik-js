import { get, kebabCase } from "lodash";
import { IConfiguration } from "src/framework/types/configuration";
import restApiErrorResponse from "../../restApiErrorResponse";
import restApiSuccessResponse from "../../restApiSuccessResponse";

export const getModuleApiPaths = (name: string) => {
  return {
    create: `/api/v1/${kebabCase(name)}/create`,
    update: `/api/v1/${kebabCase(name)}/update`,
    view: `/api/v1/${kebabCase(name)}/view/:id`,
    delete: `/api/v1/${kebabCase(name)}/:id/delete`,
    paginate: `/api/v1/${kebabCase(name)}/list`,
    bulkCreate: `/api/v1/${kebabCase(name)}/bulk-create`,
    bulkUpdate: `/api/v1/${kebabCase(name)}/bulk-update`,
    bulkDelete: `/api/v1/${kebabCase(name)}/bulk-delete`,
    softDelete: `/api/v1/${kebabCase(name)}/soft-delete`,
    bulkSoftDelete: `/api/v1/${kebabCase(name)}/bulk-soft-delete`
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
    const overrideSoftDelete = get(configuration, `override.${module.name}.restApi.softDelete`, null);
    const overrideBulkSoftDelete = get(configuration, `override.${module.name}.restApi.bulkSoftDelete`, null);
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
        try {
          let model = req.models[module.name].getModel();
          if (overrideView && overrideView.constructor == Function) {
            overrideView(req, res);
          } else {
            let result = await model.view({ id: req.params.id }, ["*"]);
            if (result.instance) {
              restApiSuccessResponse({
                res: res,
                data: result.instance,
                message: `${module.name} Found`
              });
            } else {
              restApiErrorResponse({
                code: 404,
                err: { message: "Not Found" },
                res: res,
                data: {}
              });
            }
          }
        } catch (e) {
          // handleError(res, e, {});
          restApiErrorResponse({
            err: e,
            res: res,
            data: {}
          });
        }
      });

      expressApp.post(modulePaths.create, async (req, res) => {
        try {
          let model = req.models[module.name].getModel();
          if (overrideCreate && overrideCreate.constructor == Function) {
            overrideCreate(req, res);
          } else {
            let result = await model.create(req.body.input);
            restApiSuccessResponse({
              res: res,
              data: result.instance,
              message: `${module.name} created`
            });
          }
        } catch (e) {
          restApiErrorResponse({
            err: e,
            res: res,
            data: {}
          });
        }
      });

      expressApp.post(modulePaths.bulkCreate, async (req, res) => {
        try {
          let model = req.models[module.name].getModel();
          if (overrideBulkCreate && overrideBulkCreate.constructor == Function) {
            overrideBulkCreate(req, res);
          } else {
            let result = await model.bulkCreate(get(req, "body.input", []));
            restApiSuccessResponse({
              res: res,
              data: result.instances,
              message: `${module.name} bulk operation successfull.`
            });
          }
        } catch (e) {
          restApiErrorResponse({
            err: e,
            res: res,
            data: {}
          });
        }
      });

      expressApp.put(modulePaths.update, async (req, res) => {
        try {
          let model = req.models[module.name].getModel();
          if (overrideUpdate && overrideUpdate.constructor == Function) {
            overrideUpdate(req, res);
          } else {
            let result = await model.update(req.body.input);
            restApiSuccessResponse({
              res: res,
              message: `${module.name} updated`,
              data: result.instance
            });
          }
        } catch (e) {
          restApiErrorResponse({
            err: e,
            res: res,
            data: {}
          });
        }
      });

      expressApp.put(modulePaths.bulkUpdate, async (req, res) => {
        try {
          let model = req.models[module.name].getModel();
          if (overrideBuklUpdate && overrideBuklUpdate.constructor == Function) {
            overrideBuklUpdate(req, res);
          } else {
            let result = await model.bulkUpdate(req.body.input);
            restApiSuccessResponse({
              res: res,
              message: `${module.name} updated`,
              data: result.bulkInstances
            });
          }
        } catch (e) {
          restApiErrorResponse({
            err: e,
            res: res,
            data: {}
          });
        }
      });

      expressApp.delete(modulePaths.bulkSoftDelete, async (req, res) => {
        try {
          let model = req.models[module.name].getModel();
          if (overrideBulkSoftDelete && overrideBulkSoftDelete.constructor == Function) {
            overrideBulkSoftDelete(req, res);
          } else {
            await model.bulkSoftDelete(req.body.input);
            restApiSuccessResponse({
              res: res,
              message: `Items deleted`,
              data: {}
            });
          }
        } catch (e) {
          restApiErrorResponse({
            err: e,
            res: res,
            data: {}
          });
        }
      });

      expressApp.delete(modulePaths.delete, async (req, res) => {
        try {
          let model = req.models[module.name].getModel();
          if (overrideDelete && overrideDelete.constructor == Function) {
            overrideDelete(req, res);
          } else {
            await model.delete({ id: req.params.id });
            restApiSuccessResponse({
              res: res,
              message: `${module.name} deleted`,
              data: {}
            });
          }
        } catch (e) {
          restApiErrorResponse({
            err: e,
            res: res,
            data: {}
          });
        }
      });
      expressApp.delete(modulePaths.bulkDelete, async (req, res) => {
        try {
          let model = req.models[module.name].getModel();
          if (overrideBuklDelete && overrideBuklDelete.constructor == Function) {
            overrideBuklDelete(req, res);
          } else {
            let result = await model.bulkDelete(req.body.input);
            restApiSuccessResponse({
              res: res,
              message: `${module.name} deleted`,
              data: {}
            });
          }
        } catch (e) {
          restApiErrorResponse({
            err: e,
            res: res,
            data: {}
          });
        }
      });

      expressApp.delete(modulePaths.softDelete, async (req, res) => {
        try {
          let model = req.models[module.name].getModel();
          if (overrideSoftDelete && overrideSoftDelete.constructor == Function) {
            overrideSoftDelete(req, res);
          } else {
            await model.update({
              id: req.body.input.id,
              isDeleted: 1
            });
            restApiSuccessResponse({
              res: res,
              message: `${module.name} deleted`,
              data: {}
            });
          }
        } catch (e) {
          restApiErrorResponse({
            err: e,
            res: res,
            data: {}
          });
        }
      });

      expressApp.post(modulePaths.paginate, async (req, res) => {
        try {
          if (overrideList && overrideList.constructor == Function) {
            overrideList(req, res);
          } else {
            let model = req.models[module.name];
            let args = {
              pagination: get(req.body, "pagination", {}),
              filters: get(req.body, "filters", [])
            };
            let response = await model.paginate(args, "*");
            restApiSuccessResponse({
              res: res,
              message: `${module.name} list`,
              data: response
            });
          }
        } catch (e) {
          restApiErrorResponse({
            err: e,
            res: res,
            data: {}
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
