import { get, kebabCase, isFunction } from "lodash";
import { IConfiguration } from "src/framework/types/configuration";
import restApiErrorResponse from "../../restApiErrorResponse";
import restApiSuccessResponse from "../../restApiSuccessResponse";
import { firstLetterLowerCase } from "../../../helpers/index";

export const getModuleApiPaths = (name: string) => {
  let a = {
    save: `/api/v1/${kebabCase(name)}/save`,
    create: `/api/v1/${kebabCase(name)}/create`,
    update: `/api/v1/${kebabCase(name)}/update`,
    view: `/api/v1/${kebabCase(name)}/view/:id`,
    module: `/api/v1/${kebabCase(name)}/`,
    delete: `/api/v1/${kebabCase(name)}/:id/delete`,
    paginate: `/api/v1/${kebabCase(name)}/list`,
    bulkCreate: `/api/v1/${kebabCase(name)}/bulk-create`,
    bulkUpdate: `/api/v1/${kebabCase(name)}/bulk-update`,
    bulkDelete: `/api/v1/${kebabCase(name)}/bulk-delete`,
    softDelete: `/api/v1/${kebabCase(name)}/soft-delete`,
    bulkSoftDelete: `/api/v1/${kebabCase(name)}/bulk-soft-delete`,
  };
  return a;
};

export default async function (expressApp, configuration: IConfiguration, customApi) {
  let modules = configuration.builtinModules.split(",");
  modules = modules.filter((c) => c);
  modules = [...modules, ...get(configuration, "modules", [])];

  const { dbDialect } = process.env;
  const isSQL = dbDialect.includes("sql");
  const isMongodb = dbDialect === "mongodb";
  const identityColumn = isSQL ? "id" : "_id";

  const processModule = (module) => {
    const overrideModuleQuery = get(configuration, `override.${module.name}.restApi.${firstLetterLowerCase(firstLetterLowerCase)}`, null);
    const overrideView = get(configuration, `override.${module.name}.restApi.view`, null);
    const overrideList = get(configuration, `override.${module.name}.restApi.list`, null);
    const overrideCreate = get(configuration, `override.${module.name}.restApi.create`, null);
    const overrideSave = get(configuration, `override.${module.name}.restApi.save`, null);
    const overrideUpdate = get(configuration, `override.${module.name}.restApi.update`, null);
    const overrideDelete = get(configuration, `override.${module.name}.restApi.delete`, null);
    const overrideSoftDelete = get(configuration, `override.${module.name}.restApi.softDelete`, null);
    const overrideBulkSoftDelete = get(configuration, `override.${module.name}.restApi.bulkSoftDelete`, null);
    const overrideBulkCreate = get(configuration, `override.${module.name}.restApi.bulkCreate`, null);
    const overrideBuklUpdate = get(configuration, `override.${module.name}.restApi.bulkUpdate`, null);
    const overrideBuklDelete = get(configuration, `override.${module.name}.restApi.bulkDelete`, null);

    const beforeCreate = get(configuration, `events.database.${module.name}.beforeCreate`, null);
    const afterCreate = get(configuration, `events.database.${module.name}.afterCreate`, null);
    const beforeUpdate = get(configuration, `events.database.${module.name}.beforeUpdate`, null);
    const afterUpdate = get(configuration, `events.database.${module.name}.afterUpdate`, null);
    const beforeDelete = get(configuration, `events.database.${module.name}.beforeDelete`, null);
    const afterDelete = get(configuration, `events.database.${module.name}.afterDelete`, null);
    const beforeSoftDelete = get(configuration, `events.database.${module.name}.beforeSoftDelete`, null);
    const afterSoftDelete = get(configuration, `events.database.${module.name}.afterSoftDelete`, null);
    const beforeBulkDelete = get(configuration, `events.database.${module.name}.beforeBulkDelete`, null);
    const afterBulkDelete = get(configuration, `events.database.${module.name}.afterBulkDelete`, null);
    const beforeBulkSoftDelete = get(configuration, `events.database.${module.name}.beforeBulkSoftDelete`, null);
    const afterBulkSoftDelete = get(configuration, `events.database.${module.name}.afterBulkSoftDelete`, null);
    const beforeBulkCreate = get(configuration, `events.database.${module.name}.beforeBulkCreate`, null);
    const afterBulkCreate = get(configuration, `events.database.${module.name}.afterBulkCreate`, null);
    const beforeBulkUpdate = get(configuration, `events.database.${module.name}.beforeBulkUpdate`, null);
    const afterBulkUpdate = get(configuration, `events.database.${module.name}.afterBulkUpdate`, null);
    const beforeList = get(configuration, `events.database.${module.name}.beforeList`, null);
    const afterList = get(configuration, `events.database.${module.name}.afterList`, null);

    const beforeView = get(configuration, `events.database.${module.name}.beforeView`, null);
    const afterView = get(configuration, `events.database.${module.name}.afterView`, null);

    const beforeByModule = get(configuration, `events.database.${module.name}.beforeByModule`, null);
    const afterByModule = get(configuration, `events.database.${module.name}.afterByModule`, null);

    if (module && module.hasOwnProperty("restApi")) {
      let modulePaths = getModuleApiPaths(module.name);
      const restApi = get(module, "restApi", {});
      const restApiEndpoints = get(restApi, "endpoints", []);
      restApiEndpoints.forEach((restApiEndpointsElement) => {
        customApi(expressApp, restApiEndpointsElement, module);
      });

      expressApp.post(modulePaths.paginate, async (req, res) => {
        try {
          if (overrideList && overrideList.constructor == Function) {
            overrideList(req, res);
          } else {
            let model = req.models[module.name];
            let args = {
              pagination: get(req.body, "pagination", {}),
              filters: get(req.body, "filters", []),
              sorting: get(req.body, "sorting", []),
            };
            let finalArgs;
            if (isFunction(beforeList)) {
              finalArgs = await beforeList({ mode: "restApi", params: { req, res } });
            } else {
              finalArgs = args;
            }
            let response = await model.paginate(finalArgs, "*");
            if (isFunction(afterList)) {
              afterList({ mode: "graphql", params: { req, res, instance: response } });
            }
            restApiSuccessResponse({
              res: res,
              message: `${module.name} list`,
              data: response,
            });
          }
        } catch (e) {
          restApiErrorResponse({
            err: e,
            res: res,
            data: {},
          });
        }
      });

      expressApp.post(modulePaths.module, async (req, res) => {
        try {
          let model = req.models[module.name].getModel();
          if (overrideModuleQuery && overrideModuleQuery.constructor == Function) {
            overrideModuleQuery(req, res);
          } else {
            let finalArgs;
            if (isFunction(beforeByModule)) {
              finalArgs = await beforeByModule({ mode: "restApi", params: { req, res } });
            } else {
              finalArgs = req.body.filters;
            }
            const filters = get(req.body, "filters", []);
            let response = await model.findOneByArgs(filters);
            restApiSuccessResponse({
              res: res,
              data: response.instance,
              message: `${module.name} Found`,
            });
            if (isFunction(afterByModule)) {
              afterByModule({ mode: "restApi", params: { req, res, instance: response.instance } });
            }
          }
        } catch (e) {
          restApiErrorResponse({
            err: e,
            res: res,
            data: {},
          });
        }
      });

      expressApp.get(modulePaths.view, async (req, res) => {
        try {
          let model = req.models[module.name].getModel();
          if (overrideView && overrideView.constructor == Function) {
            overrideView(req, res);
          } else {
            let finalArgs;
            if (isFunction(beforeView)) {
              finalArgs = await beforeView({ mode: "restApi", params: { req, res } });
            } else {
              finalArgs = req.params[identityColumn];
            }
            let result = await model.view({ id: finalArgs }, ["*"]);
            if (result.instance) {
              if (isFunction(afterView)) {
                afterView({ mode: "restApi", params: { req, res, instance: result.instance } });
              }
              restApiSuccessResponse({
                res: res,
                data: result.instance,
                message: `${module.name} Found`,
              });
            } else {
              restApiErrorResponse({
                code: 404,
                err: { message: "Not Found" },
                res: res,
                data: {},
              });
            }
          }
        } catch (e) {
          restApiErrorResponse({
            err: e,
            res: res,
            data: {},
          });
        }
      });

      expressApp.post(modulePaths.create, async (req, res) => {
        try {
          let model = req.models[module.name].getModel();
          if (overrideCreate && overrideCreate.constructor == Function) {
            overrideCreate(req, res);
          } else {
            let finalArgs;
            if (isFunction(beforeCreate)) {
              finalArgs = await beforeCreate({ mode: "restApi", params: { req, res } });
            } else {
              finalArgs = req.body.input;
            }
            let result = await model.create(finalArgs);
            if (isFunction(afterCreate)) {
              await afterCreate({ mode: "restApi", params: { req, res, instance: result.instance } });
            }
            restApiSuccessResponse({
              res: res,
              data: result.instance,
              message: `${module.name} created`,
            });
          }
        } catch (e) {
          restApiErrorResponse({
            err: e,
            res: res,
            data: {},
          });
        }
      });

      expressApp.post(modulePaths.save, async (req, res) => {
        try {
          let model = req.models[module.name].getModel();
          if (overrideSave && overrideSave.constructor == Function) {
            overrideSave(req, res);
          } else {
            let result = await model.save(req.body.input);
            restApiSuccessResponse({
              res: res,
              data: result.instance,
              message: `${module.name} saved`,
            });
          }
        } catch (e) {
          restApiErrorResponse({
            err: e,
            res: res,
            data: {},
          });
        }
      });

      expressApp.post(modulePaths.bulkCreate, async (req, res) => {
        try {
          let model = req.models[module.name].getModel();
          if (overrideBulkCreate && overrideBulkCreate.constructor == Function) {
            overrideBulkCreate(req, res);
          } else {
            let finalArgs;
            if (isFunction(beforeBulkCreate)) {
              finalArgs = await beforeBulkCreate({ mode: "graphql", params: { req, res } });
            } else {
              finalArgs = get(req, "body.input", []);
            }
            let result = await model.bulkCreate(finalArgs);
            if (isFunction(afterBulkCreate)) {
              await afterBulkCreate({ mode: "restApi", params: { req, res } });
            }
            restApiSuccessResponse({
              res: res,
              data: result.instances,
              message: `${module.name} bulk operation successfull.`,
            });
          }
        } catch (e) {
          restApiErrorResponse({
            err: e,
            res: res,
            data: {},
          });
        }
      });

      expressApp.put(modulePaths.update, async (req, res) => {
        try {
          let model = req.models[module.name].getModel();
          if (overrideUpdate && overrideUpdate.constructor == Function) {
            overrideUpdate(req, res);
          } else {
            let finalArgs;
            if (isFunction(beforeUpdate)) {
              finalArgs = await beforeUpdate({ mode: "restApi", params: { req, res } });
            } else {
              finalArgs = req.body.input;
            }
            let result = await model.update(finalArgs);
            if (isFunction(afterUpdate)) {
              await afterUpdate({ mode: "restApi", params: { req, res } });
            }
            restApiSuccessResponse({
              res: res,
              message: `${module.name} updated`,
              data: result.instance,
            });
          }
        } catch (e) {
          restApiErrorResponse({
            err: e,
            res: res,
            data: {},
          });
        }
      });

      expressApp.put(modulePaths.bulkUpdate, async (req, res) => {
        try {
          let model = req.models[module.name].getModel();
          if (overrideBuklUpdate && overrideBuklUpdate.constructor == Function) {
            overrideBuklUpdate(req, res);
          } else {
            let finalArgs;
            if (isFunction(beforeBulkUpdate)) {
              finalArgs = await beforeBulkUpdate({ mode: "restApi", params: { req, res } });
            } else {
              finalArgs = req.body.input;
            }
            let result = await model.bulkUpdate(finalArgs);
            if (isFunction(afterBulkUpdate)) {
              afterBulkUpdate({ mode: "restApi", params: { req, res, instance: result.bulkInstances } });
            }
            restApiSuccessResponse({
              res: res,
              message: `${module.name} updated`,
              data: result.bulkInstances,
            });
          }
        } catch (e) {
          restApiErrorResponse({
            err: e,
            res: res,
            data: {},
          });
        }
      });

      expressApp.delete(modulePaths.bulkSoftDelete, async (req, res) => {
        try {
          let model = req.models[module.name].getModel();
          if (overrideBulkSoftDelete && overrideBulkSoftDelete.constructor == Function) {
            overrideBulkSoftDelete(req, res);
          } else {
            let finalArgs;
            if (isFunction(beforeBulkSoftDelete)) {
              finalArgs = await beforeBulkSoftDelete({ mode: "restApi", params: { req, res } });
            } else {
              finalArgs = req.body.input;
            }
            await model.bulkSoftDelete(finalArgs);
            if (isFunction(afterBulkSoftDelete)) {
              await afterBulkDelete({ mode: "restApi", params: { req, res } });
            }
            restApiSuccessResponse({
              res: res,
              message: `Items deleted`,
              data: {},
            });
          }
        } catch (e) {
          restApiErrorResponse({
            err: e,
            res: res,
            data: {},
          });
        }
      });

      expressApp.delete(modulePaths.delete, async (req, res) => {
        try {
          let model = req.models[module.name].getModel();
          if (overrideDelete && overrideDelete.constructor == Function) {
            overrideDelete(req, res);
          } else {
            let finalArgs;
            if (isFunction(beforeDelete)) {
              finalArgs = await beforeDelete({ mode: "graphql", params: { req, res } });
            } else {
              finalArgs = req.params[identityColumn];
            }
            await model.delete({ id: finalArgs });
            if (isFunction(afterDelete)) {
              await afterDelete({ mode: "restApi", params: { req, res } });
            }
            restApiSuccessResponse({
              res: res,
              message: `${module.name} deleted`,
              data: {},
            });
          }
        } catch (e) {
          restApiErrorResponse({
            err: e,
            res: res,
            data: {},
          });
        }
      });
      expressApp.delete(modulePaths.bulkDelete, async (req, res) => {
        try {
          let model = req.models[module.name].getModel();
          if (overrideBuklDelete && overrideBuklDelete.constructor == Function) {
            overrideBuklDelete(req, res);
          } else {
            let finalArgs;
            if (isFunction(beforeBulkDelete)) {
              finalArgs = await beforeBulkDelete({ mode: "restApi", params: { req, res } });
            } else {
              finalArgs = req.body.input;
            }
            await model.bulkDelete(finalArgs);
            if (isFunction(afterBulkDelete)) {
              await afterBulkDelete({ mode: "restApi", params: { req, res } });
            }
            restApiSuccessResponse({
              res: res,
              message: `${module.name} deleted`,
              data: {},
            });
          }
        } catch (e) {
          restApiErrorResponse({
            err: e,
            res: res,
            data: {},
          });
        }
      });

      expressApp.delete(modulePaths.softDelete, async (req, res) => {
        try {
          let model = req.models[module.name].getModel();
          if (overrideSoftDelete && overrideSoftDelete.constructor == Function) {
            overrideSoftDelete(req, res);
          } else {
            let finalArgs;
            if (isFunction(beforeSoftDelete)) {
              finalArgs = await beforeSoftDelete({ mode: "restApi", params: { req, res } });
            } else {
              finalArgs = req.body.input[identityColumn];
            }
            await model.update({
              id: finalArgs,
              isDeleted: 1,
            });
            if (isFunction(afterSoftDelete)) {
              await afterSoftDelete({ mode: "restApi", params: { req, res } });
            }
            restApiSuccessResponse({
              res: res,
              message: `${module.name} deleted`,
              data: {},
            });
          }
        } catch (e) {
          restApiErrorResponse({
            err: e,
            res: res,
            data: {},
          });
        }
      });
    }
  };

  modules.forEach(async (element: any) => {
    let module;
    if (element.constructor === String) {
      module = require(`./../../../builtinModules/${element}/index`).default;
    } else if (element.constructor === Object || isFunction(element)) {
      if (element.constructor == Function) {
        module = await element(configuration);
      } else {
        module = element;
      }
    }
    processModule(module);
  });
}
