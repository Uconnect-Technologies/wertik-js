import getRequestedFieldsFromResolverInfo from "./../helpers/getRequestedFieldsFromResolverInfo";
import { IConfiguration, IConfigurationCustomModule } from "../types/configuration";
import { get, isFunction } from "lodash";
import { firstLetterLowerCase } from "../helpers/index";

const identityColumn = "id";
const identityColumnGraphQLType = "Int";

export const generateQueriesCrudSchema = (moduleName: String) => {
  let string = "";
  const byId = `${firstLetterLowerCase(moduleName)}ById(${identityColumn}: ${identityColumnGraphQLType}): ${moduleName}`;
  const byFilter = `${firstLetterLowerCase(moduleName)}(filters: [FilterInput]): ${moduleName}`;
  const viewString = `view${moduleName}(${identityColumn}: ${identityColumnGraphQLType}): ${moduleName}`;
  const listString = `list${moduleName}(pagination: PaginationInput, filters: ${moduleName}FilterInput, sorting: [SortingInput]): ${moduleName}List`;
  const statsString = `${firstLetterLowerCase(moduleName)}Stats: ModuleStats`;
  string = `
    ${viewString}
    ${listString}
  `;
  string = string + " " + byId + " " + byFilter + " " + statsString;
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
  const deleteString = `delete${moduleName}(input: IDDeleteInput): SuccessResponse`;
  const bulkUpdateString = `bulkUpdate${moduleName}(input: [${moduleName}Input]): ${moduleName}BulkMutationResponse`;
  const bulkCreateString = `bulkCreate${moduleName}(input: [${moduleName}Input]): ${moduleName}BulkMutationResponse`;
  const bulkDeleteString = `bulkDelete${moduleName}(input: [IDDeleteInput]): SuccessResponse`;
  return `
    ${deleteString}
    ${bulkUpdateString}
    ${bulkCreateString}
    ${bulkDeleteString}
  `;
};

export const generateCrudResolvers = (module: IConfigurationCustomModule, pubsub, configuration: IConfiguration) => {
  const overrideMutationDelete = get(configuration, `override.${module.name}.graphql.mutation.delete`, null);
  const overrideMutationBulkCreate = get(configuration, `override.${module.name}.graphql.mutation.bulkCreate`, null);
  const overrideMutationBulkUpdate = get(configuration, `override.${module.name}.graphql.mutation.bulkUpdate`, null);
  const overrideMutationBulkDelete = get(configuration, `override.${module.name}.graphql.mutation.bulkDelete`, null);
  const overrideModuleQuery = get(configuration, `override.${module.name}.graphql.query.${firstLetterLowerCase(module.name)}`, null);
  const overrideQueryList = get(configuration, `override.${module.name}.graphql.query.list`, null);
  const overrideQueryView = get(configuration, `override.${module.name}.graphql.query.view`, null);
  const overrideQueryById = get(configuration, `override.${module.name}.graphql.query.byId`, null);

  const beforeDelete = get(configuration, `events.database.${module.name}.beforeDelete`, null);
  const afterDelete = get(configuration, `events.database.${module.name}.afterDelete`, null);
  const beforeBulkDelete = get(configuration, `events.database.${module.name}.beforeBulkDelete`, null);
  const afterBulkDelete = get(configuration, `events.database.${module.name}.afterBulkDelete`, null);
  const beforeBulkCreate = get(configuration, `events.database.${module.name}.beforeBulkCreate`, null);
  const afterBulkCreate = get(configuration, `events.database.${module.name}.afterBulkCreate`, null);
  const beforeBulkUpdate = get(configuration, `events.database.${module.name}.beforeBulkUpdate`, null);
  const afterBulkUpdate = get(configuration, `events.database.${module.name}.afterBulkUpdate`, null);
  // R
  const beforeList = get(configuration, `events.database.${module.name}.beforeList`, null);
  const afterList = get(configuration, `events.database.${module.name}.afterList`, null);

  const beforeView = get(configuration, `events.database.${module.name}.beforeView`, null);
  const afterView = get(configuration, `events.database.${module.name}.afterView`, null);

  const beforeById = get(configuration, `events.database.${module.name}.beforeById`, null);
  const afterById = get(configuration, `events.database.${module.name}.afterById`, null);

  const beforeByModule = get(configuration, `events.database.${module.name}.beforeByModule`, null);
  const afterByModule = get(configuration, `events.database.${module.name}.afterByModule`, null);

  const { deletedModule, bulkCreatedModule, bulkUpdatedModule } = getSubscriptionConstants(module.name);

  let object = {
    mutations: {
      [`delete${module.name}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationDelete && overrideMutationDelete.constructor == Function) {
          let response = await overrideMutationDelete(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeDelete)) {
          finalArgs = await beforeDelete({
            mode: "graphql",
            params: { _, args, context, info },
          });
        } else {
          finalArgs = args.input;
        }
        let model = context.wertik.models[module.name].getModel();
        await model.delete(finalArgs);
        pubsub.publish(deletedModule, {
          [deletedModule]: {
            message: `${module.name} successfully deleted`,
          },
        });
        if (isFunction(afterDelete)) {
          await afterDelete({
            mode: "graphql",
            params: { _, args, context, info },
          });
        }
        return { message: `${module.name} successfully deleted` };
      },
      [`bulkDelete${module.name}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationBulkDelete && overrideMutationBulkDelete.constructor == Function) {
          let response = await overrideMutationBulkDelete(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeBulkDelete)) {
          finalArgs = await beforeBulkDelete({
            mode: "graphql",
            params: { _, args, context, info },
          });
        } else {
          finalArgs = args.input;
        }
        let model = context.wertik.models[module.name].getModel();
        let result = await model.bulkDelete(finalArgs);
        if (isFunction(afterBulkDelete)) {
          await afterBulkDelete({
            mode: "graphql",
            params: { _, args, context, info },
          });
        }
        return { message: `${module.name} bulk items deleted successfully.` };
      },
      [`bulkCreate${module.name}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationBulkCreate && overrideMutationBulkCreate.constructor == Function) {
          let response = await overrideMutationBulkCreate(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeBulkCreate)) {
          finalArgs = await beforeBulkCreate({
            mode: "graphql",
            params: { _, args, context, info },
          });
        } else {
          finalArgs = args.input;
        }
        let model = context.wertik.models[module.name].getModel();
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let result = await model.bulkCreate(finalArgs, requestedFields);
        pubsub.publish(bulkCreatedModule, {
          [bulkCreatedModule]: result.bulkInstances,
        });
        if (isFunction(afterBulkCreate)) {
          afterBulkCreate({
            mode: "graphql",
            params: { _, args, context, info, instance: result.bulkInstances },
          });
        }
        return {
          returning: [...result.bulkInstances],
          affectedRows: result.affectedRows,
        };
      },
      [`bulkUpdate${module.name}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationBulkUpdate && overrideMutationBulkUpdate.constructor == Function) {
          let response = await overrideMutationBulkUpdate(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeBulkUpdate)) {
          finalArgs = await beforeBulkUpdate({
            mode: "graphql",
            params: { _, args, context, info },
          });
        } else {
          finalArgs = args.input;
        }
        let model = context.wertik.models[module.name].getModel();
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let result = await model.bulkUpdate(finalArgs, requestedFields);
        pubsub.publish(bulkUpdatedModule, {
          [bulkUpdatedModule]: result.bulkInstances,
        });
        if (isFunction(afterBulkUpdate)) {
          afterBulkUpdate({
            mode: "graphql",
            params: { _, args, context, info, instance: result.bulkInstances },
          });
        }
        // return result.bulkInstances;
        return {
          returning: [...result.bulkInstances],
          affectedRows: result.affectedRows,
        };
      },
    },
    queries: {
      [`${firstLetterLowerCase(module.name)}Stats`]: async (_: any, args: any, context: any, info: any) => {
        let database = context.wertik.database;
        let requestedReports = getRequestedFieldsFromResolverInfo(info);
        let model = context.wertik.models[module.name].getModel();
        return model.stats(database, requestedReports);
      },
      [`${firstLetterLowerCase(module.name)}ById`]: async (_: any, args: any, context: any, info: any) => {
        let model = context.wertik.models[module.name].getModel();
        if (overrideQueryById && overrideQueryById.constructor == Function) {
          let response = await overrideQueryById(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeById)) {
          finalArgs = await beforeById({
            mode: "graphql",
            params: { _, args, context, info },
          });
        } else {
          finalArgs = args;
        }
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let findById = await model.findOneById(finalArgs[identityColumn], Object.keys(requestedFields));
        if (isFunction(afterById)) {
          afterById({
            mode: "graphql",
            params: { _, args, context, info, instance: findById.instance },
          });
        }
        return findById.instance;
      },
      [`${firstLetterLowerCase(module.name)}`]: async (_: any, args: any, context: any, info: any) => {
        let model = context.wertik.models[module.name].getModel();
        if (overrideModuleQuery && overrideModuleQuery.constructor == Function) {
          let response = await overrideModuleQuery(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeByModule)) {
          finalArgs = await beforeByModule({
            mode: "graphql",
            params: { _, args, context, info },
          });
        } else {
          finalArgs = args;
        }
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        const filters = get(finalArgs, "filters", []);
        let response = await model.findOneByArgs(filters, Object.keys(requestedFields));
        if (isFunction(afterById)) {
          afterByModule({
            mode: "graphql",
            params: { _, args, context, info, instance: response.instance },
          });
        }
        return response.instance;
      },
      [`view${module.name}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideQueryView && overrideQueryView.constructor == Function) {
          let response = await overrideQueryView(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeView)) {
          finalArgs = await beforeView({
            mode: "graphql",
            params: { _, args, context, info },
          });
        } else {
          finalArgs = args;
        }
        let model = context.wertik.models[module.name].getModel();
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let view = await model.view(finalArgs, Object.keys(requestedFields));
        if (isFunction(afterView)) {
          afterView({
            mode: "graphql",
            params: { _, args, context, info, instance: view.instance },
          });
        }
        return view.instance;
      },
      [`list${module.name}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideQueryList && overrideQueryList.constructor == Function) {
          let response = await overrideQueryList(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeList)) {
          finalArgs = await beforeList({
            mode: "graphql",
            params: { _, args, context, info },
          });
        } else {
          finalArgs = args;
        }
        let model = context.wertik.models[module.name].getModel();
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let response = await model.paginate(finalArgs, Object.keys(requestedFields.list));
        if (isFunction(afterList)) {
          afterList({
            mode: "graphql",
            params: { _, args, context, info, instance: response },
          });
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
    `
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
  `;
};
