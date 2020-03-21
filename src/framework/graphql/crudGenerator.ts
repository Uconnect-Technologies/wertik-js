import getRequestedFieldsFromResolverInfo from "./../helpers/getRequestedFieldsFromResolverInfo";
import { IConfiguration } from "../types/configuration";
import { get, isFunction } from "lodash";

export const generateQueriesCrudSchema = (moduleName: String, operationsRead) => {
  const viewString = `view${moduleName}(id: Int): ${moduleName}`;
  const listString = `list${moduleName}(pagination: PaginationInput, filters: [FilterInput], sorting: [SortingInput]): ${moduleName}List`;
  if (operationsRead == "*") {
    return `
      ${viewString}
      ${listString}
    `;
  } else {
    return `
      ${operationsRead.toLowerCase().includes("view") ? viewString : ""}
      ${operationsRead.toLowerCase().includes("list") ? listString : ""}
    `;
  }
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
    updatedModule: `${moduleName}Updated`
  };
};

export const generateSubscriptionsCrudResolvers = (moduleName: String, pubsub: any, operationsModify) => {
  const operationsModifySplit = operationsModify.toLowerCase().split(" ");
  const { createdModule, deletedModule, updatedModule, softDeletedModule, savedModule } = getSubscriptionConstants(moduleName);
  let object = {
    [createdModule]: {
      subscribe: () => pubsub.asyncIterator([createdModule])
    },
    [savedModule]: {
      subscribe: () => pubsub.asyncIterator([savedModule])
    },
    [deletedModule]: {
      subscribe: () => pubsub.asyncIterator([deletedModule])
    },
    [updatedModule]: {
      subscribe: () => pubsub.asyncIterator([updatedModule])
    },
    [softDeletedModule]: {
      subscribe: () => pubsub.asyncIterator([softDeletedModule])
    }
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
  const bulkDeleteString = `bulkDelete${moduleName}(input: [Int]): SuccessResponse`;
  const bulkSoftDeleteString = `bulkSoftDelete${moduleName}(input: [Int]): SuccessResponse`;
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

export const generateCrudResolvers = (moduleName: string, pubsub, operationsModify, operationsRead, configuration: IConfiguration) => {
  const operationsModifySplit = operationsModify.toLowerCase().split(" ");
  const operationsReadSplit = operationsRead.toLowerCase().split(" ");
  const overrideMutationCreate = get(configuration, `override.${moduleName}.graphql.mutation.create`, null);
  const overrideMutationSave = get(configuration, `override.${moduleName}.graphql.mutation.save`, null);
  const overrideMutationUpdate = get(configuration, `override.${moduleName}.graphql.mutation.update`, null);
  const overrideMutationDelete = get(configuration, `override.${moduleName}.graphql.mutation.delete`, null);
  const overrideMutationSoftDelete = get(configuration, `override.${moduleName}.graphql.mutation.softDelete`, null);
  const overrideMutationBulkCreate = get(configuration, `override.${moduleName}.graphql.mutation.bulkCreate`, null);
  const overrideMutationBulkUpdate = get(configuration, `override.${moduleName}.graphql.mutation.bulkUpdate`, null);
  const overrideMutationBulkDelete = get(configuration, `override.${moduleName}.graphql.mutation.bulkDelete`, null);
  const overrideMutationBulkSoftDelete = get(configuration, `override.${moduleName}.graphql.mutation.bulkSoftDelete`, null);
  const overrideQueryList = get(configuration, `override.${moduleName}.graphql.query.list`, null);
  const overrideQueryView = get(configuration, `override.${moduleName}.graphql.query.view`, null);

  const beforeCreate = get(configuration, `events.database.${moduleName}.beforeCreate`, null);
  const afterCreate = get(configuration, `events.database.${moduleName}.afterCreate`, null);
  const beforeUpdate = get(configuration, `events.database.${moduleName}.beforeUpdate`, null);
  const afterUpdate = get(configuration, `events.database.${moduleName}.afterUpdate`, null);
  const beforeDelete = get(configuration, `events.database.${moduleName}.beforeDelete`, null);
  const afterDelete = get(configuration, `events.database.${moduleName}.afterDelete`, null);
  const beforeSoftDelete = get(configuration, `events.database.${moduleName}.beforeSoftDelete`, null);
  const afterSoftDelete = get(configuration, `events.database.${moduleName}.afterSoftDelete`, null);
  const beforeBulkDelete = get(configuration, `events.database.${moduleName}.beforeBulkDelete`, null);
  const afterBulkDelete = get(configuration, `events.database.${moduleName}.afterBulkDelete`, null);
  const beforeBulkSoftDelete = get(configuration, `events.database.${moduleName}.beforeBulkSoftDelete`, null);
  const afterBulkSoftDelete = get(configuration, `events.database.${moduleName}.afterBulkSoftDelete`, null);
  const beforeBulkCreate = get(configuration, `events.database.${moduleName}.beforeBulkCreate`, null);
  const afterBulkCreate = get(configuration, `events.database.${moduleName}.afterBulkCreate`, null);
  const beforeBulkSoftCreate = get(configuration, `events.database.${moduleName}.beforeBulkSoftCreate`, null);
  const afterBulkSoftCreate = get(configuration, `events.database.${moduleName}.afterBulkSoftCreate`, null);
  const beforeBulkUpdate = get(configuration, `events.database.${moduleName}.beforeBulkUpdate`, null);
  const afterBulkUpdate = get(configuration, `events.database.${moduleName}.afterBulkUpdate`, null);
  const beforeBulkSoftUpdate = get(configuration, `events.database.${moduleName}.beforeBulkSoftUpdate`, null);
  const afterBulkSoftUpdate = get(configuration, `events.database.${moduleName}.afterBulkSoftUpdate`, null);
  // R
  const beforeList = get(configuration, `events.database.${moduleName}.beforeList`, null);
  const afterList = get(configuration, `events.database.${moduleName}.afterList`, null);
  const beforeView = get(configuration, `events.database.${moduleName}.beforeView`, null);
  const afterView = get(configuration, `events.database.${moduleName}.afterView`, null);

  const { createdModule, deletedModule, updatedModule, softDeletedModule, savedModule } = getSubscriptionConstants(moduleName);
  let object = {
    mutations: {
      [`create${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationCreate && overrideMutationCreate.constructor == Function) {
          let response = await overrideMutationCreate(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeCreate)) {
          finalArgs = await beforeCreate({
            mode: "graphql",
            params: { _, args, context, info }
          });
        } else {
          finalArgs = args.input;
        }
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let model = context.models[moduleName].getModel();
        let result = await model.create(finalArgs, requestedFields);
        pubsub.publish(createdModule, {
          [createdModule]: result.instance
        });
        if (isFunction(afterCreate)) {
          await afterCreate({
            mode: "graphql",
            params: { instance: result.instance, _, args, context, info }
          });
        }
        return result.instance;
      },
      [`update${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationUpdate && overrideMutationUpdate.constructor == Function) {
          let response = await overrideMutationUpdate(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeUpdate)) {
          finalArgs = await beforeUpdate({
            mode: "graphql",
            params: { _, args, context, info }
          });
        } else {
          finalArgs = args.input;
        }
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let model = context.models[moduleName].getModel();
        let result = await model.update(finalArgs, requestedFields);
        pubsub.publish(updatedModule, {
          [updatedModule]: result.instance
        });
        if (isFunction(afterUpdate)) {
          await afterUpdate({
            mode: "graphql",
            params: { _, args, context, info, instance: result.instance }
          });
        }
        return result.instance;
      },
      [`save${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationSave && overrideMutationSave.constructor == Function) {
          let response = await overrideMutationSave(_, args, context, info);
          return response;
        }
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let model = context.models[moduleName].getModel();
        let result = await model.save(args.input, requestedFields);
        pubsub.publish(createdModule, {
          [savedModule]: result
        });
        return result.instance;
      },
      [`delete${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationDelete && overrideMutationDelete.constructor == Function) {
          let response = await overrideMutationDelete(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeDelete)) {
          finalArgs = await beforeDelete({
            mode: "graphql",
            params: { _, args, context, info }
          });
        } else {
          finalArgs = args.input;
        }
        let model = context.models[moduleName].getModel();
        await model.delete(finalArgs);
        pubsub.publish(deletedModule, {
          [deletedModule]: {
            message: `${moduleName} successfully deleted`
          }
        });
        if (isFunction(afterDelete)) {
          await afterDelete({
            mode: "graphql",
            params: { _, args, context, info }
          });
        }
        return { message: `${moduleName} successfully deleted` };
      },
      [`softDelete${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationSoftDelete && overrideMutationSoftDelete.constructor == Function) {
          let response = await overrideMutationSoftDelete(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeSoftDelete)) {
          finalArgs = await beforeSoftDelete({
            mode: "graphql",
            params: { _, args, context, info }
          });
        } else {
          finalArgs = args.input;
        }
        let model = context.models[moduleName].getModel();
        let result = await model.update({
          ...finalArgs,
          isDeleted: 1
        });
        pubsub.publish(softDeletedModule, {
          [softDeletedModule]: result
        });
        if (isFunction(afterSoftDelete)) {
          await afterSoftDelete({
            mode: "graphql",
            params: { _, args, context, info }
          });
        }
        return { message: `${moduleName} successfully deleted` };
      },
      [`bulkDelete${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationBulkSoftDelete && overrideMutationBulkSoftDelete.constructor == Function) {
          let response = await overrideMutationBulkSoftDelete(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeBulkDelete)) {
          finalArgs = await beforeBulkDelete({
            mode: "graphql",
            params: { _, args, context, info }
          });
        } else {
          finalArgs = args.input;
        }
        let model = context.models[moduleName].getModel();
        let result = await model.bulkDelete(finalArgs);
        if (isFunction(afterBulkDelete)) {
          await afterBulkDelete({
            mode: "graphql",
            params: { _, args, context, info }
          });
        }
        return { message: `${moduleName} bulk items deleted successfully.` };
      },
      [`bulkSoftDelete${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationBulkDelete && overrideMutationBulkDelete.constructor == Function) {
          let response = await overrideMutationBulkDelete(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeBulkSoftDelete)) {
          finalArgs = await beforeBulkSoftDelete({
            mode: "graphql",
            params: { _, args, context, info }
          });
        } else {
          finalArgs = args.input;
        }
        let model = context.models[moduleName].getModel();
        let result = await model.bulkSoftDelete(finalArgs);
        if (isFunction(afterBulkSoftDelete)) {
          await afterBulkSoftDelete({
            mode: "graphql",
            params: { _, args, context, info }
          });
        }
        return { message: `${moduleName} bulk items deleted successfully.` };
      },
      [`bulkCreate${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationBulkCreate && overrideMutationBulkCreate.constructor == Function) {
          let response = await overrideMutationBulkCreate(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeBulkCreate)) {
          finalArgs = await beforeBulkCreate({
            mode: "graphql",
            params: { _, args, context, info }
          });
        } else {
          finalArgs = args.input;
        }
        let model = context.models[moduleName].getModel();
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let result = await model.bulkCreate(finalArgs, requestedFields);
        if (isFunction(afterBulkCreate)) {
          afterBulkCreate({
            mode: "graphql",
            params: { _, args, context, info, instance: result.bulkInstances }
          });
        }
        return result.bulkInstances;
      },
      [`bulkUpdate${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationBulkUpdate && overrideMutationBulkUpdate.constructor == Function) {
          let response = await overrideMutationBulkUpdate(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeBulkUpdate)) {
          finalArgs = await beforeBulkUpdate({
            mode: "graphql",
            params: { _, args, context, info }
          });
        } else {
          finalArgs = args.input;
        }
        let model = context.models[moduleName].getModel();
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let result = await model.bulkUpdate(args, requestedFields);
        if (isFunction(afterBulkUpdate)) {
          afterBulkUpdate({
            mode: "graphql",
            params: { _, args, context, info, instance: result.bulkInstances }
          });
        }
        return result.bulkInstances;
      }
    },
    queries: {
      [`view${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideQueryView && overrideQueryView.constructor == Function) {
          let response = await overrideQueryView(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeView)) {
          finalArgs = await beforeView({
            mode: "graphql",
            params: { _, args, context, info }
          });
        } else {
          finalArgs = args;
        }
        let model = context.models[moduleName].getModel();
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let view = await model.view(finalArgs, Object.keys(requestedFields));
        if (isFunction(afterView)) {
          afterView({
            mode: "graphql",
            params: { _, args, context, info, instance: view.instance }
          });
        }
        return view.instance;
      },
      [`list${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideQueryList && overrideQueryList.constructor == Function) {
          let response = await overrideQueryList(_, args, context, info);
          return response;
        }
        let finalArgs;
        if (isFunction(beforeList)) {
          finalArgs = await beforeList({
            mode: "graphql",
            params: { _, args, context, info }
          });
        } else {
          finalArgs = args;
        }
        let model = context.models[moduleName].getModel();
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let response = await model.paginate(finalArgs, Object.keys(requestedFields.list));
        if (isFunction(afterList)) {
          afterList({
            mode: "graphql",
            params: { _, args, context, info, instance: response }
          });
        }
        return response;
      }
    }
  };
  if (operationsModify !== "*") {
    if (!operationsModifySplit.includes("create")) {
      delete object.mutations[`create${moduleName}`];
    }
    if (!operationsModifySplit.includes("update")) {
      delete object.mutations[`update${moduleName}`];
    }
    if (!operationsModifySplit.includes("delete")) {
      delete object.mutations[`delete${moduleName}`];
    }
    if (!operationsModifySplit.includes("bulkcreate")) {
      delete object.mutations[`bulkCreate${moduleName}`];
    }
    if (!operationsModifySplit.includes("bulkupdate")) {
      delete object.mutations[`bulkUpdate${moduleName}`];
    }
    if (!operationsModifySplit.includes("bulkdelete")) {
      delete object.mutations[`bulkDelete${moduleName}`];
    }
  }

  if (operationsRead !== "*") {
    if (!operationsReadSplit.includes("view")) {
      delete object.queries[`view${moduleName}`];
    }

    if (!operationsReadSplit.includes("list")) {
      delete object.queries[`list${moduleName}`];
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
