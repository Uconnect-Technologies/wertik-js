import getRequestedFieldsFromResolverInfo from "./../helpers/getRequestedFieldsFromResolverInfo";
import { IConfiguration } from "../types/configuration";
import { get } from "lodash";

export const generateQueriesCrudSchema = (moduleName: String, operationsRead) => {
  const split = operationsRead.toLowerCase().split(" ");
  const viewString = `view${moduleName}(id: Int): ${moduleName}`;
  const listString = `list${moduleName}(pagination: PaginationInput, filters: [FilterInput]): ${moduleName}List`;
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
  const createdString = `created${moduleName}: ${moduleName}`;
  const savedString = `saved${moduleName}: ${moduleName}`;
  const deletedString = `deleted${moduleName}: ${moduleName}`;
  const updatedString = `updated${moduleName}: ${moduleName}`;
  const softDeleteString = `softDeleted${moduleName}: ${moduleName}`;
  const bulkUpdatedString = `bulkUpdated${moduleName}:  [${moduleName}]`;
  const bulkCreatedString = `bulkCreated${moduleName}:  [${moduleName}]`;
  const bulkDeletedString = `bulkDeleted${moduleName}:  [${moduleName}]`;
  const bulkSoftDeletedString = `bulkSoftDeleted${moduleName}:  [${moduleName}]`;
  return `
    ${createdString}
    ${savedString}
    ${deletedString}
    ${updatedString}
    ${softDeleteString}
    ${bulkUpdatedString}
    ${bulkSoftDeletedString}
    ${bulkCreatedString}
    ${bulkDeletedString}
  `;
};

export const getSubscriptionConstants = (moduleName: String) => {
  return {
    createdModule: `created${moduleName}`,
    savedModule: `saved${moduleName}`,
    deletedModule: `deleted${moduleName}`,
    softDeletedModule: `softDeleted${moduleName}`,
    updatedModule: `updated${moduleName}`,
    bulkCreatedModule: `bulkUpdated${moduleName}`,
    bulkUpdatedModule: `bulkCreated${moduleName}`,
    bulkDeletedModule: `bulkDeleted${moduleName}`,
    bulkSoftDeletedModule: `bulkSoftDeleted${moduleName}`
  };
};

export const generateSubscriptionsCrudResolvers = (moduleName: String, pubsub: any, operationsModify) => {
  const operationsModifySplit = operationsModify.toLowerCase().split(" ");
  const {
    createdModule,
    deletedModule,
    updatedModule,
    bulkCreatedModule,
    bulkUpdatedModule,
    bulkDeletedModule,
    softDeletedModule,
    bulkSoftDeletedModule,
    savedModule
  } = getSubscriptionConstants(moduleName);
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
    [bulkCreatedModule]: {
      subscribe: () => pubsub.asyncIterator([bulkCreatedModule])
    },
    [bulkUpdatedModule]: {
      subscribe: () => pubsub.asyncIterator([bulkCreatedModule])
    },
    [bulkDeletedModule]: {
      subscribe: () => pubsub.asyncIterator([bulkDeletedModule])
    },
    [softDeletedModule]: {
      subscribe: () => pubsub.asyncIterator([softDeletedModule])
    },
    [bulkSoftDeletedModule]: {
      subscribe: () => pubsub.asyncIterator([bulkSoftDeletedModule])
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
    if (!operationsModifySplit.includes("bulkcreate")) {
      delete object[bulkCreatedModule];
    }
    if (!operationsModifySplit.includes("bulkupdate")) {
      delete object[bulkUpdatedModule];
    }
    if (!operationsModifySplit.includes("bulkdelete")) {
      delete object[bulkDeletedModule];
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
  const bulkUpdateString = `bulkUpdate${moduleName}(input: [${moduleName}Input]): [${moduleName}]`;
  const bulkCreateString = `bulkCreate${moduleName}(input: [${moduleName}Input]): [${moduleName}]`;
  const bulkDeleteString = `bulkDelete${moduleName}(input: [Int]): SuccessResponse`;
  const bulkSoftDeleteString = `bulkSoftDelete${moduleName}(input: [Int]): SuccessResponse`;
  const softDeleteString = `softDelete${moduleName}(input: IDDeleteInput): SuccessResponse`;
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
  const {
    createdModule,
    deletedModule,
    updatedModule,
    bulkCreatedModule,
    bulkUpdatedModule,
    bulkDeletedModule,
    softDeletedModule,
    bulkSoftDeletedModule,
    savedModule
  } = getSubscriptionConstants(moduleName);
  let object = {
    mutations: {
      [`create${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationCreate && overrideMutationCreate.constructor == Function) {
          let response = await overrideMutationCreate(_, args, context, info);
          return response;
        }
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let model = context.models[moduleName].getModel();
        let result = await model.create(args.input, requestedFields);
        pubsub.publish(createdModule, {
          [createdModule]: result
        });
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
        let model = context.models[moduleName].getModel();
        let result = await model.delete(args.input);
        pubsub.publish(deletedModule, {
          [deletedModule]: result
        });
        return { message: `${moduleName} successfully deleted` };
      },
      [`softDelete${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationSoftDelete && overrideMutationSoftDelete.constructor == Function) {
          let response = await overrideMutationSoftDelete(_, args, context, info);
          return response;
        }
        let model = context.models[moduleName].getModel();
        let result = await model.update({
          ...args.input,
          isDeleted: 1
        });
        pubsub.publish(softDeletedModule, {
          [softDeletedModule]: result
        });
        return { message: `${moduleName} successfully deleted` };
      },
      [`update${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationUpdate && overrideMutationUpdate.constructor == Function) {
          let response = await overrideMutationUpdate(_, args, context, info);
          return response;
        }
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let model = context.models[moduleName].getModel();
        let result = await model.update(args.input, requestedFields);
        pubsub.publish(updatedModule, {
          [updatedModule]: result
        });
        return result.instance;
      },
      [`bulkDelete${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationBulkSoftDelete && overrideMutationBulkSoftDelete.constructor == Function) {
          let response = await overrideMutationBulkSoftDelete(_, args, context, info);
          return response;
        }
        let model = context.models[moduleName].getModel();
        let result = await model.bulkDelete(args.input);
        pubsub.publish(bulkCreatedModule, {
          [bulkCreatedModule]: result
        });
        return { message: `${moduleName} bulk items deleted successfully.` };
      },
      [`bulkSoftDelete${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationBulkDelete && overrideMutationBulkDelete.constructor == Function) {
          let response = await overrideMutationBulkDelete(_, args, context, info);
          return response;
        }
        let model = context.models[moduleName].getModel();
        let result = await model.bulkSoftDelete(args.input);
        pubsub.publish(bulkCreatedModule, {
          [bulkCreatedModule]: result
        });
        return { message: `${moduleName} bulk items deleted successfully.` };
      },
      [`bulkCreate${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationBulkCreate && overrideMutationBulkCreate.constructor == Function) {
          let response = await overrideMutationBulkCreate(_, args, context, info);
          return response;
        }
        let model = context.models[moduleName].getModel();
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let result = await model.bulkCreate(args.input, requestedFields);
        pubsub.publish(bulkUpdatedModule, {
          [bulkUpdatedModule]: result
        });
        return result.bulkInstances;
      },
      [`bulkUpdate${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideMutationBulkUpdate && overrideMutationBulkUpdate.constructor == Function) {
          let response = await overrideMutationBulkUpdate(_, args, context, info);
          return response;
        }
        let model = context.models[moduleName].getModel();
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let result = await model.bulkUpdate(args.input, requestedFields);
        pubsub.publish(bulkDeletedModule, {
          [bulkDeletedModule]: result
        });
        return result.bulkInstances;
      }
    },
    queries: {
      [`view${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideQueryView && overrideQueryView.constructor == Function) {
          let response = await overrideQueryView(_, args, context, info);
          return response;
        }
        let model = context.models[moduleName].getModel();
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let view = await model.view(args, Object.keys(requestedFields));
        return view.instance;
      },
      [`list${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        if (overrideQueryList && overrideQueryList.constructor == Function) {
          let response = await overrideQueryList(_, args, context, info);
          return response;
        }
        let model = context.models[moduleName].getModel();
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        return await model.paginate(args, Object.keys(requestedFields.list));
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
    }
  `;
};
