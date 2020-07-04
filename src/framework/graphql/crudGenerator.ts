import getRequestedFieldsFromResolverInfo from "./../helpers/getRequestedFieldsFromResolverInfo";
import { IConfiguration, IConfigurationCustomModule } from "../types/configuration";
import { get, isFunction } from "lodash";
import { firstLetterLowerCase } from "../helpers/index";

const { dbDialect } = process.env;
const isSQL = dbDialect.includes("sql");
const identityColumn = isSQL ? "id" : "_id";
const identityColumnGraphQLType = isSQL ? "Int" : "String";

export const generateQueriesCrudSchema = (moduleName: String, operationsRead) => {
  let string = "";
  const byId = `${firstLetterLowerCase(moduleName)}ById(${identityColumn}: ${identityColumnGraphQLType}): ${moduleName}`;
  const byFilter = `${firstLetterLowerCase(moduleName)}(filters: [FilterInput]): ${moduleName}`;
  const viewString = `view${moduleName}(${identityColumn}: ${identityColumnGraphQLType}): ${moduleName}`;
  const listString = `list${moduleName}(pagination: PaginationInput, filters: [FilterInput], sorting: [SortingInput]): ${moduleName}List`;
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
  const createdString = `${moduleName}Created: ${moduleName}`;
  const savedString = `${moduleName}Saved: ${moduleName}`;
  const deletedString = `${moduleName}Deleted: SuccessResponse`;
  const updatedString = `${moduleName}Updated: ${moduleName}`;
  const softDeleteString = `${moduleName}SoftDeleted: ${moduleName}`;
  return `
    ${createdString}
    ${savedString}
    ${deletedString}
    ${updatedString}
    ${softDeleteString}
  `;
};

export const getSubscriptionConstants = (moduleName: String) => {
  return {
    createdModule: `${moduleName}Created`,
    savedModule: `${moduleName}Saved`,
    deletedModule: `${moduleName}Deleted`,
    softDeletedModule: `${moduleName}SoftDeleted`,
    updatedModule: `${moduleName}Updated`,
  };
};

export const generateSubscriptionsCrudResolvers = (moduleName: String, pubsub: any, operationsModify) => {
  const operationsModifySplit = operationsModify.toLowerCase().split(" ");
  const { createdModule, deletedModule, updatedModule, softDeletedModule, savedModule } = getSubscriptionConstants(moduleName);
  let object = {
    [createdModule]: {
      subscribe: () => pubsub.asyncIterator([createdModule]),
    },
    [savedModule]: {
      subscribe: () => pubsub.asyncIterator([savedModule]),
    },
    [deletedModule]: {
      subscribe: () => pubsub.asyncIterator([deletedModule]),
    },
    [updatedModule]: {
      subscribe: () => pubsub.asyncIterator([updatedModule]),
    },
    [softDeletedModule]: {
      subscribe: () => pubsub.asyncIterator([softDeletedModule]),
    },
  };
  if (operationsModify !== "*") {
    if (!operationsModifySplit.includes("create")) {
      delete object[createdModule];
    }
    if (!operationsModifySplit.includes("update")) {
      delete object[updatedModule];
    }
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
  const createString = `create${moduleName}(input: ${moduleName}Input): ${moduleName}`;
  const saveString = `save${moduleName}(input: ${moduleName}Input): ${moduleName}`;
  const deleteString = `delete${moduleName}(input: IDDeleteInput): SuccessResponse`;
  const updateString = `update${moduleName}(input: ${moduleName}Input): ${moduleName}`;
  const softDeleteString = `softDelete${moduleName}(input: IDDeleteInput): SuccessResponse`;
  const bulkUpdateString = `bulkUpdate${moduleName}(input: [${moduleName}Input]): [${moduleName}]`;
  const bulkCreateString = `bulkCreate${moduleName}(input: [${moduleName}Input]): [${moduleName}]`;
  const bulkDeleteString = `bulkDelete${moduleName}(input: [IDDeleteInput]): SuccessResponse`;
  const bulkSoftDeleteString = `bulkSoftDelete${moduleName}(input: [IDDeleteInput]): SuccessResponse`;
  if (operations == "*") {
    return `
      ${createString}
      ${deleteString}
      ${saveString}
      ${updateString}
      ${softDeleteString}
      ${bulkUpdateString}
      ${bulkCreateString}
      ${bulkDeleteString}
      ${bulkSoftDeleteString}
    `;
  } else {
    return `
      ${operationsSplit.includes("create") ? createString : ""}
      ${operationsSplit.includes("save") ? saveString : ""}
      ${operationsSplit.includes("update") ? updateString : ""}
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
  const overrideMutationCreate = get(configuration, `override.${module.name}.graphql.mutation.create`, null);
  const overrideMutationSave = get(configuration, `override.${module.name}.graphql.mutation.save`, null);
  const overrideMutationUpdate = get(configuration, `override.${module.name}.graphql.mutation.update`, null);
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
  const beforeBulkSoftCreate = get(configuration, `events.database.${module.name}.beforeBulkSoftCreate`, null);
  const afterBulkSoftCreate = get(configuration, `events.database.${module.name}.afterBulkSoftCreate`, null);
  const beforeBulkUpdate = get(configuration, `events.database.${module.name}.beforeBulkUpdate`, null);
  const afterBulkUpdate = get(configuration, `events.database.${module.name}.afterBulkUpdate`, null);
  const beforeBulkSoftUpdate = get(configuration, `events.database.${module.name}.beforeBulkSoftUpdate`, null);
  const afterBulkSoftUpdate = get(configuration, `events.database.${module.name}.afterBulkSoftUpdate`, null);
  // R
  const beforeList = get(configuration, `events.database.${module.name}.beforeList`, null);
  const afterList = get(configuration, `events.database.${module.name}.afterList`, null);

  const beforeView = get(configuration, `events.database.${module.name}.beforeView`, null);
  const afterView = get(configuration, `events.database.${module.name}.afterView`, null);

  const beforeById = get(configuration, `events.database.${module.name}.beforeById`, null);
  const afterById = get(configuration, `events.database.${module.name}.afterById`, null);

  const beforeByModule = get(configuration, `events.database.${module.name}.beforeByModule`, null);
  const afterByModule = get(configuration, `events.database.${module.name}.afterByModule`, null);

  const { createdModule, deletedModule, updatedModule, softDeletedModule, savedModule } = getSubscriptionConstants(module.name);

  let object = {
    mutations: {
      [`create${module.name}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationCreate && overrideMutationCreate.constructor == Function) {
          let response = await overrideMutationCreate(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeCreate)) {
          finalArgs = await beforeCreate({
            mode: "graphql",
            params: { _, args, context, info },
          });
        } else {
          finalArgs = args.input;
        }
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let model = context.models[module.name].getModel();
        let result = await model.create(finalArgs, requestedFields);
        pubsub.publish(createdModule, {
          [createdModule]: result.instance,
        });
        if (isFunction(afterCreate)) {
          await afterCreate({
            mode: "graphql",
            params: { instance: result.instance, _, args, context, info },
          });
        }
        return result.instance;
      },
      [`update${module.name}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationUpdate && overrideMutationUpdate.constructor == Function) {
          let response = await overrideMutationUpdate(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeUpdate)) {
          finalArgs = await beforeUpdate({
            mode: "graphql",
            params: { _, args, context, info },
          });
        } else {
          finalArgs = args.input;
        }
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let model = context.models[module.name].getModel();
        let result = await model.update(finalArgs, requestedFields);
        pubsub.publish(updatedModule, {
          [updatedModule]: result.instance,
        });
        if (isFunction(afterUpdate)) {
          await afterUpdate({
            mode: "graphql",
            params: { _, args, context, info, instance: result.instance },
          });
        }
        return result.instance;
      },
      [`save${module.name}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationSave && overrideMutationSave.constructor == Function) {
          let response = await overrideMutationSave(_, args, context, info);
          return response;
        }
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let model = context.models[module.name].getModel();
        let result = await model.save(args.input, requestedFields);
        pubsub.publish(createdModule, {
          [savedModule]: result,
        });
        return result.instance;
      },
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
        let model = context.models[module.name].getModel();
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
        let model = context.models[module.name].getModel();
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
        let model = context.models[module.name].getModel();
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
        let model = context.models[module.name].getModel();
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
        let model = context.models[module.name].getModel();
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let result = await model.bulkCreate(finalArgs, requestedFields);
        if (isFunction(afterBulkCreate)) {
          afterBulkCreate({
            mode: "graphql",
            params: { _, args, context, info, instance: result.bulkInstances },
          });
        }
        return result.bulkInstances;
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
        let model = context.models[module.name].getModel();
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let result = await model.bulkUpdate(finalArgs, requestedFields);
        if (isFunction(afterBulkUpdate)) {
          afterBulkUpdate({
            mode: "graphql",
            params: { _, args, context, info, instance: result.bulkInstances },
          });
        }
        return result.bulkInstances;
      },
    },
    queries: {
      [`${firstLetterLowerCase(module.name)}Stats`]: async (_: any, args: any, context: any, info: any) => {
        let database = context.database;
        let requestedReports = getRequestedFieldsFromResolverInfo(info);
        let model = context.models[module.name].getModel();
        return model.stats(database, requestedReports);
      },
      [`${firstLetterLowerCase(module.name)}ById`]: async (_: any, args: any, context: any, info: any) => {
        let model = context.models[module.name].getModel();
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
        let model = context.models[module.name].getModel();
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
        let response = await model.findOneByArgs(filters, requestedFields);
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
        let model = context.models[module.name].getModel();
        let requestedFields = getRequestedFieldsFromResolverInfo(info, get(module, "database.selectIgnoreFields", []));
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
        let model = context.models[module.name].getModel();
        let requestedFields = getRequestedFieldsFromResolverInfo(info, get(module, "database.selectIgnoreFields", []));
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
    if (!operationsModifySplit.includes("create")) {
      delete object.mutations[`create${module.name}`];
    }
    if (!operationsModifySplit.includes("update")) {
      delete object.mutations[`update${module.name}`];
    }
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

export const generateListTypeForModule = (moduleName: String) => {
  return `
    type ${moduleName}List {
      list: [${moduleName}]
      pagination: Pagination
      filters: [Filter]
      sorting: Sorting
    }
  `;
};
