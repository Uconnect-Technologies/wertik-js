import getRequestedFieldsFromResolverInfo from "./../helpers/getRequestedFieldsFromResolverInfo";
import { IConfiguration, IConfigurationCustomModule } from "../types/configuration";
import { get, isFunction } from "lodash";
import { firstLetterLowerCase, removeColumnsFromAccordingToSelectIgnoreFields } from "../helpers/index";
import convertFiltersIntoSequalizeObject from "../database/helpers/convertFiltersIntoSequalizeObject";

const identityColumn = "id";
const identityColumnGraphQLType = "Int";

export const generateQueriesCrudSchema = (moduleName: String) => {
  let string = "";
  const byFilter = `${firstLetterLowerCase(moduleName)}(filters: [FilterInput]): ${moduleName}`;
  const viewString = `view${moduleName}(${identityColumn}: ${identityColumnGraphQLType}): ${moduleName}`;
  const listString = `list${moduleName}(cache: CacheOptionsInput, pagination: PaginationInput, filters: ${moduleName}FilterInput, sorting: [SortingInput]): ${moduleName}List`;
  const countString = `count${moduleName}(filters: ${moduleName}FilterInput):  Int`;
  string = `
    ${viewString}
    ${listString}
    ${countString}
  `;
  string = string + " " + " " + byFilter;
  return string;
};

export const generateMutationsCrudSubscriptionSchema = (moduleName: String) => {
  return `
    ${moduleName}Deleted: SuccessResponse
    ${moduleName}BulkCreated: [${moduleName}]
    ${moduleName}BulkUpdated: [${moduleName}]
  `;
};

export const getSubscriptionConstants = (moduleName: String) => {
  return {
    deletedModule: `${moduleName}Deleted`,
    bulkCreatedModule: `${moduleName}BulkCreated`,
    bulkUpdatedModule: `${moduleName}BulkUpdated`,
  };
};

export const generateSubscriptionsCrudResolvers = (moduleName: String, pubsub: any) => {
  const { deletedModule, bulkCreatedModule, bulkUpdatedModule } = getSubscriptionConstants(moduleName);
  let object = {
    [deletedModule]: {
      subscribe: () => pubsub.asyncIterator([deletedModule]),
    },
    [bulkCreatedModule]: {
      subscribe: () => pubsub.asyncIterator([bulkCreatedModule]),
    },
    [bulkUpdatedModule]: {
      subscribe: () => pubsub.asyncIterator([bulkUpdatedModule]),
    },
  };
  return object;
};

export const generateMutationsCrudSchema = (moduleName: String) => {
  const bulkUpdateString = `bulkUpdate${moduleName}(input: [${moduleName}Input]): ${moduleName}BulkMutationResponse`;
  const bulkCreateString = `bulkCreate${moduleName}(input: [${moduleName}Input]): ${moduleName}BulkMutationResponse`;
  const bulkDeleteString = `bulkDelete${moduleName}(input: IDDeleteInput): SuccessResponse`;
  return `
    ${bulkUpdateString}
    ${bulkCreateString}
    ${bulkDeleteString}
  `;
};

export const generateCrudResolvers = (module: IConfigurationCustomModule, pubsub, configuration: IConfiguration) => {
  const overrideMutationBulkCreate = get(configuration, `override.${module.name}.graphql.mutation.bulkCreate`, null);
  const overrideMutationBulkUpdate = get(configuration, `override.${module.name}.graphql.mutation.bulkUpdate`, null);
  const overrideMutationBulkDelete = get(configuration, `override.${module.name}.graphql.mutation.bulkDelete`, null);

  const overrideQueryList = get(configuration, `override.${module.name}.graphql.query.list`, null);
  const overrideQueryView = get(configuration, `override.${module.name}.graphql.query.view`, null);

  const beforeBulkDelete = get(configuration, `events.graphql.${module.name}.beforeBulkDelete`, null);
  const afterBulkDelete = get(configuration, `events.graphql.${module.name}.afterBulkDelete`, null);
  const beforeBulkCreate = get(configuration, `events.graphql.${module.name}.beforeBulkCreate`, null);
  const afterBulkCreate = get(configuration, `events.graphql.${module.name}.afterBulkCreate`, null);
  const beforeBulkUpdate = get(configuration, `events.graphql.${module.name}.beforeBulkUpdate`, null);
  const afterBulkUpdate = get(configuration, `events.graphql.${module.name}.afterBulkUpdate`, null);
  // R
  const beforeList = get(configuration, `events.graphql.${module.name}.beforeList`, null);
  const afterList = get(configuration, `events.graphql.${module.name}.afterList`, null);

  const beforeView = get(configuration, `events.graphql.${module.name}.beforeView`, null);
  const afterView = get(configuration, `events.graphql.${module.name}.afterView`, null);

  const { bulkCreatedModule, bulkUpdatedModule } = getSubscriptionConstants(module.name);

  let object = {
    mutations: {
      [`bulkDelete${module.name}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationBulkDelete && overrideMutationBulkDelete.constructor == Function) {
          let response = await overrideMutationBulkDelete(_, args, context, info);
          return response;
        }
        const finalArgs = isFunction(beforeBulkDelete)
          ? await beforeBulkDelete({
              mode: "graphql",
              params: { _, args, context, info },
            })
          : args;
        let model = context.wertik.models[module.name];
        await model.destroy({ where: { id: finalArgs.input.id } });
        if (isFunction(afterBulkDelete)) {
          await afterBulkDelete({
            mode: "graphql",
            params: { _, args, context, info },
          });
        }
        return { message: `${module.name} deleted successfully.` };
      },
      [`bulkCreate${module.name}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationBulkCreate && overrideMutationBulkCreate.constructor == Function) {
          let response = await overrideMutationBulkCreate(_, args, context, info);
          return response;
        }
        const finalArgs = isFunction(beforeBulkCreate)
          ? await beforeBulkCreate({
              mode: "graphql",
              params: { _, args, context, info },
            })
          : args;
        let model = context.wertik.models[module.name];
        let result = await model.bulkCreate(finalArgs.input);
        pubsub.publish(bulkCreatedModule, {
          [bulkCreatedModule]: result,
        });
        if (isFunction(afterBulkCreate)) {
          afterBulkCreate({
            mode: "graphql",
            params: { _, args, context, info, instance: result },
          });
        }
        return {
          returning: result,
        };
      },
      [`bulkUpdate${module.name}`]: async (_: any, args: any, context: any, info: any) => {
        try {
          if (overrideMutationBulkUpdate && overrideMutationBulkUpdate.constructor == Function) {
            let response = await overrideMutationBulkUpdate(_, args, context, info);
            return response;
          }
          const finalArgs = isFunction(beforeBulkUpdate)
            ? await beforeBulkUpdate({
                mode: "graphql",
                params: { _, args, context, info },
              })
            : args;
          let model = context.wertik.models[module.name];
          let result = [];
          // fixme: Try to use knex here to avoid many queries.
          for (const value of finalArgs.input) {
            const find = await model.findOne({
              where: {
                id: value.id,
              },
            });

            if (find) {
              let a = await find.update(value);
              result.push(a);
            }
          }
          pubsub.publish(bulkUpdatedModule, {
            [bulkUpdatedModule]: result,
          });
          if (isFunction(afterBulkUpdate)) {
            afterBulkUpdate({
              mode: "graphql",
              params: { _, args, context, info, instance: result },
            });
          }
          return {
            returning: result,
            affectedRows: result.length,
          };
        } catch (e) {
          console.log(e);
        }
      },
    },
    queries: {
      [`count${module.name}`]: async (_, args, context, info) => {
        let model = context.wertik.models[module.name];
        const filters = await convertFiltersIntoSequalizeObject(args ? args.filters || {} : {});
        let count = await model.count({
          where: filters,
        });
        return count;
      },
      [`view${module.name}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideQueryView && overrideQueryView.constructor == Function) {
          let response = await overrideQueryView(_, args, context, info);
          return response;
        }
        const finalArgs = isFunction(beforeList)
          ? await beforeView({
              mode: "graphql",
              params: { _, args, context, info },
            })
          : args;
        let model = context.wertik.models[module.name];
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let view = await model.findOne({
          where: { id: finalArgs.id },
          attributes: removeColumnsFromAccordingToSelectIgnoreFields(Object.keys(requestedFields), model.selectIgnoreFields),
        });
        if (isFunction(afterView)) {
          afterView({
            mode: "graphql",
            params: { _, args, context, info, instance: view },
          });
        }
        return view;
      },
      [`list${module.name}`]: async (_: any, args: any, context: any, info: any) => {
        let response;
        if (overrideQueryList && overrideQueryList.constructor == Function) {
          let response = await overrideQueryList(_, args, context, info);
          return response;
        }
        const finalArgs = isFunction(beforeList)
          ? await beforeList({
              mode: "graphql",
              params: { _, args, context, info },
            })
          : args;
        const cacheWith = (args.cache && args.cache.name) || "";
        const cacheValue = context.wertik.cache.get(cacheWith);

        if (cacheWith && cacheValue) {
          response = cacheValue;
        } else {
          let model = context.wertik.models[module.name];
          let requestedFields = getRequestedFieldsFromResolverInfo(info);
          response = await model.paginate(finalArgs, Object.keys(requestedFields.list));
        }
        if (isFunction(afterList)) {
          afterList({
            mode: "graphql",
            params: { _, args, context, info, instance: response },
          });
        }
        if (cacheWith) {
          context.wertik.cache.set(cacheWith, response, (args.cache && args.cache.expiry) || 0);
        }
        return response;
      },
    },
  };
  return object;
};

export const generateModuleSearchShema = (module) => {
  let string = `
    input ${module.name}FilterInput {
      _or: [${module.name}FilterInput]
      _and: [${module.name}FilterInput]
  `;
  string = `${string}
      id: IntFilterInput
      created_at: DateFilterInput
      updated_at: DateFilterInput
    `;
  const fields = get(module, "database.sql.fields", {});
  const keys = Object.keys(fields);
  keys.forEach((key) => {
    const field = fields[key];

    const getType = () => {
      const type = field.oldType.toLowerCase();
      if (type === "string") {
        return "String";
      } else if (type === "integer") {
        return "Int";
      } else if (type === "boolean") {
        return "Boolean";
      }
    };
    string =
      string +
      `
      ${key}: ${getType()}FilterInput
      `;
  });

  string = string + " }";

  return string;
};

export const generateListTypeForModule = (module: IConfigurationCustomModule) => {
  return `
    ${generateModuleSearchShema(module)}
    type ${module.name}List {
      list: [${module.name}]
      pagination: Pagination
      filters: [Filter]
      sorting: Sorting
      paginationProperties: PaginationProperties
    }
    type ${module.name}BulkMutationResponse {
      returning: [${module.name}]
      affectedRows: Int
    }
    type Count${module.name} {
      count: Int
    }
  `;
};
