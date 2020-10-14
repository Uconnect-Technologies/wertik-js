import getRequestedFieldsFromResolverInfo from "./../helpers/getRequestedFieldsFromResolverInfo";
import { IConfiguration, IConfigurationCustomModule } from "../types/configuration";
import { get, isFunction } from "lodash";
import { firstLetterLowerCase } from "../helpers/index";

const identityColumn = "id";
const identityColumnGraphQLType = "Int";

export const generateQueriesCrudSchema = (moduleName: String, operationsRead) => {
  let string = "";
  const byId = `${firstLetterLowerCase(moduleName)}ById(${identityColumn}: ${identityColumnGraphQLType}): ${moduleName}`;
  const byFilter = `${firstLetterLowerCase(moduleName)}(filters: [FilterInput]): ${moduleName}`;
  const viewString = `view${moduleName}(${identityColumn}: ${identityColumnGraphQLType}): ${moduleName}`;
  const listString = `list${moduleName}(pagination: PaginationInput, filters: ${moduleName}FilterInput, sorting: [SortingInput]): ${moduleName}List`;
  const statsString = `${firstLetterLowerCase(moduleName)}Stats: ModuleStats`;
  if (operationsRead == "*") {
    string = `
      ${viewString}
      ${listString}
    `;
  } else {
    string = `
      ${operationsRead.toLowerCase().includes("view") ? viewString : ""}
      ${operationsRead.toLowerCase().includes("list") ? listString : ""}
    `;
  }
  string = string + " " + byId + " " + byFilter + " " + statsString;
  return string;
};

export const generateMutationsCrudSubscriptionSchema = (moduleName: String, operationsModify, operationsRead) => {
  const deletedString = `${moduleName}Deleted: SuccessResponse`;
  const softDeleteString = `${moduleName}SoftDeleted: ${moduleName}`;
  return `
    ${deletedString}
    ${softDeleteString}
  `;
};

export const getSubscriptionConstants = (moduleName: String) => {
  return {
    deletedModule: `${moduleName}Deleted`,
    softDeletedModule: `${moduleName}SoftDeleted`,
  };
};

export const generateSubscriptionsCrudResolvers = (moduleName: String, pubsub: any, operationsModify) => {
  const operationsModifySplit = operationsModify.toLowerCase().split(" ");
  const { deletedModule, softDeletedModule } = getSubscriptionConstants(moduleName);
  let object = {
    [deletedModule]: {
      subscribe: () => pubsub.asyncIterator([deletedModule]),
    },
    [softDeletedModule]: {
      subscribe: () => pubsub.asyncIterator([softDeletedModule]),
    },
  };
  if (operationsModify !== "*") {
    if (!operationsModifySplit.includes("delete")) {
      delete object[deletedModule];
    }
    if (!operationsModifySplit.includes("softDelete")) {
      delete object[softDeletedModule];
    }
  }
  return object;
};

export const generateMutationsCrudSchema = (moduleName: String, operations) => {
  const operationsSplit = operations.toLowerCase().split(" ");
  const deleteString = `delete${moduleName}(input: IDDeleteInput): SuccessResponse`;
  const softDeleteString = `softDelete${moduleName}(input: IDDeleteInput): SuccessResponse`;
  const bulkUpdateString = `bulkUpdate${moduleName}(input: [${moduleName}Input]): ${moduleName}BulkMutationResponse`;
  const bulkCreateString = `bulkCreate${moduleName}(input: [${moduleName}Input]): ${moduleName}BulkMutationResponse`;
  const bulkDeleteString = `bulkDelete${moduleName}(input: [IDDeleteInput]): SuccessResponse`;
  const bulkSoftDeleteString = `bulkSoftDelete${moduleName}(input: [IDDeleteInput]): SuccessResponse`;
  if (operations == "*") {
    return `
      ${deleteString}
      ${softDeleteString}
      ${bulkUpdateString}
      ${bulkCreateString}
      ${bulkDeleteString}
      ${bulkSoftDeleteString}
    `;
  } else {
    return `
      ${operationsSplit.includes("softDelete") ? softDeleteString : ""}
      ${operationsSplit.includes("delete") ? deleteString : ""}
      ${operationsSplit.includes("bulkupdate") ? bulkUpdateString : ""}
      ${operationsSplit.includes("bulkdelete") ? bulkDeleteString : ""}
      ${operationsSplit.includes("bulksoftdelete") ? bulkSoftDeleteString : ""}
      ${operationsSplit.includes("bulkcreate") ? bulkCreateString : ""}
    `;
  }
};

export const generateCrudResolvers = (module: IConfigurationCustomModule, pubsub, operationsModify, operationsRead, configuration: IConfiguration) => {
  const operationsModifySplit = operationsModify.toLowerCase().split(" ");
  const operationsReadSplit = operationsRead.toLowerCase().split(" ");
  const overrideMutationDelete = get(configuration, `override.${module.name}.graphql.mutation.delete`, null);
  const overrideMutationSoftDelete = get(configuration, `override.${module.name}.graphql.mutation.softDelete`, null);
  const overrideMutationBulkCreate = get(configuration, `override.${module.name}.graphql.mutation.bulkCreate`, null);
  const overrideMutationBulkUpdate = get(configuration, `override.${module.name}.graphql.mutation.bulkUpdate`, null);
  const overrideMutationBulkDelete = get(configuration, `override.${module.name}.graphql.mutation.bulkDelete`, null);
  const overrideMutationBulkSoftDelete = get(configuration, `override.${module.name}.graphql.mutation.bulkSoftDelete`, null);
  const overrideModuleQuery = get(configuration, `override.${module.name}.graphql.query.${firstLetterLowerCase(module.name)}`, null);
  const overrideQueryList = get(configuration, `override.${module.name}.graphql.query.list`, null);
  const overrideQueryView = get(configuration, `override.${module.name}.graphql.query.view`, null);
  const overrideQueryById = get(configuration, `override.${module.name}.graphql.query.byId`, null);

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
  // R
  const beforeList = get(configuration, `events.database.${module.name}.beforeList`, null);
  const afterList = get(configuration, `events.database.${module.name}.afterList`, null);

  const beforeView = get(configuration, `events.database.${module.name}.beforeView`, null);
  const afterView = get(configuration, `events.database.${module.name}.afterView`, null);

  const beforeById = get(configuration, `events.database.${module.name}.beforeById`, null);
  const afterById = get(configuration, `events.database.${module.name}.afterById`, null);

  const beforeByModule = get(configuration, `events.database.${module.name}.beforeByModule`, null);
  const afterByModule = get(configuration, `events.database.${module.name}.afterByModule`, null);

  const { deletedModule, softDeletedModule } = getSubscriptionConstants(module.name);

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
      [`softDelete${module.name}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationSoftDelete && overrideMutationSoftDelete.constructor == Function) {
          let response = await overrideMutationSoftDelete(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeSoftDelete)) {
          finalArgs = await beforeSoftDelete({
            mode: "graphql",
            params: { _, args, context, info },
          });
        } else {
          finalArgs = args.input;
        }
        let model = context.wertik.models[module.name].getModel();
        let result = await model.update({
          ...finalArgs,
          is_deleted: 1,
        });
        pubsub.publish(softDeletedModule, {
          [softDeletedModule]: result,
        });
        if (isFunction(afterSoftDelete)) {
          await afterSoftDelete({
            mode: "graphql",
            params: { _, args, context, info },
          });
        }
        return { message: `${module.name} successfully deleted` };
      },
      [`bulkDelete${module.name}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationBulkSoftDelete && overrideMutationBulkSoftDelete.constructor == Function) {
          let response = await overrideMutationBulkSoftDelete(_, args, context, info);
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
      [`bulkSoftDelete${module.name}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationBulkDelete && overrideMutationBulkDelete.constructor == Function) {
          let response = await overrideMutationBulkDelete(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeBulkSoftDelete)) {
          finalArgs = await beforeBulkSoftDelete({
            mode: "graphql",
            params: { _, args, context, info },
          });
        } else {
          finalArgs = args.input;
        }
        let model = context.wertik.models[module.name].getModel();
        let result = await model.bulkSoftDelete(finalArgs);
        if (isFunction(afterBulkSoftDelete)) {
          await afterBulkSoftDelete({
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
  if (operationsModify !== "*") {
    if (!operationsModifySplit.includes("delete")) {
      delete object.mutations[`delete${module.name}`];
    }
    if (!operationsModifySplit.includes("bulkcreate")) {
      delete object.mutations[`bulkCreate${module.name}`];
    }
    if (!operationsModifySplit.includes("bulkupdate")) {
      delete object.mutations[`bulkUpdate${module.name}`];
    }
    if (!operationsModifySplit.includes("bulkdelete")) {
      delete object.mutations[`bulkDelete${module.name}`];
    }
  }

  if (operationsRead !== "*") {
    if (!operationsReadSplit.includes("view")) {
      delete object.queries[`view${module.name}`];
    }

    if (!operationsReadSplit.includes("list")) {
      delete object.queries[`list${module.name}`];
    }
  }

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
    }
    type ${module.name}BulkMutationResponse {
      returning: [${module.name}]
      affectedRows: Int
    }
  `;
};
