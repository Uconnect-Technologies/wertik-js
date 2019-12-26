import getRequestedFieldsFromResolverInfo from "./../helpers/getRequestedFieldsFromResolverInfo";

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
  const deletedString = `deleted${moduleName}: ${moduleName}`;
  const updatedString = `updated${moduleName}: ${moduleName}`;
  const bulkUpdatedString = `bulkUpdated${moduleName}:  [${moduleName}]`;
  const bulkCreatedString = `bulkCreated${moduleName}:  [${moduleName}]`;
  const bulkDeletedString = `bulkDeleted${moduleName}:  [${moduleName}]`;
  return `
    ${createdString}
    ${deletedString}
    ${updatedString}
    ${bulkUpdatedString}
    ${bulkCreatedString}
    ${bulkDeletedString}
  `;
};

export const getSubscriptionConstants = (moduleName: String) => {
  return {
    createdModule: `created${moduleName}`,
    deletedModule: `deleted${moduleName}`,
    updatedModule: `updated${moduleName}`,
    bulkCreatedModule: `bulkUpdated${moduleName}`,
    bulkUpdatedModule: `bulkCreated${moduleName}`,
    bulkDeletedModule: `bulkDeleted${moduleName}`
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
    bulkDeletedModule
  } = getSubscriptionConstants(moduleName);
  let object = {
    [createdModule]: {
      subscribe: () => pubsub.asyncIterator([createdModule])
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
  }
  return object;
};

export const generateMutationsCrudSchema = (moduleName: String, operations) => {
  const operationsSplit = operations.toLowerCase().split(" ");
  const createString = `create${moduleName}(input: ${moduleName}Input): ${moduleName}`;
  const deleteString = `delete${moduleName}(input: ${moduleName}Input): SuccessReponse`;
  const updateString = `update${moduleName}(input: ${moduleName}Input): ${moduleName}`;
  const bulkUpdateString = `bulkUpdate${moduleName}(input: [${moduleName}Input]): [${moduleName}]`;
  const bulkCreateString = `bulkCreate${moduleName}(input: [${moduleName}Input]): [${moduleName}]`;
  const bulkDeleteString = `bulkDelete${moduleName}(input: [Int]): SuccessReponse`;
  if (operations == "*") {
    return `
      ${createString}
      ${deleteString}
      ${updateString}
      ${bulkUpdateString}
      ${bulkCreateString}
      ${bulkDeleteString}
    `;
  } else {
    return `
      ${operationsSplit.includes("create") ? createString : ""}
      ${operationsSplit.includes("update") ? updateString : ""}
      ${operationsSplit.includes("delete") ? deleteString : ""}
      ${operationsSplit.includes("bulkupdate") ? bulkUpdateString : ""}
      ${operationsSplit.includes("bulkdelete") ? bulkDeleteString : ""}
      ${operationsSplit.includes("bulkcreate") ? bulkCreateString : ""}
    `;
  }
};

export const generateCrudResolvers = (moduleName: string, pubsub, operationsModify, operationsRead) => {
  const operationsModifySplit = operationsModify.toLowerCase().split(" ");
  const operationsReadSplit = operationsRead.toLowerCase().split(" ");
  const {
    createdModule,
    deletedModule,
    updatedModule,
    bulkCreatedModule,
    bulkUpdatedModule,
    bulkDeletedModule
  } = getSubscriptionConstants(moduleName);
  let object = {
    mutations: {
      [`create${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let result = await context.models[moduleName].create(args.input, requestedFields);
        pubsub.publish(createdModule, {
          [createdModule]: result
        });
        return result.instance;
      },
      [`delete${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        let result = await context.models[moduleName].delete(args.input);
        pubsub.publish(deletedModule, {
          [deletedModule]: result
        });
        return { message: `${moduleName} successfully deleted` };
      },
      [`update${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let model = context.models[moduleName];
        let result = await model.update(args.input, requestedFields);
        pubsub.publish(updatedModule, {
          [updatedModule]: result
        });
        return result.instance;
      },
      [`bulkDelete${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let result = await context.models[moduleName].bulkDelete(args.input, requestedFields);
        pubsub.publish(bulkCreatedModule, {
          [bulkCreatedModule]: result
        });
        return { message: `${moduleName} bulk items deleted successfully.` };
      },
      [`bulkCreate${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let result = await context.models[moduleName].bulkCreate(args.input, requestedFields);
        pubsub.publish(bulkUpdatedModule, {
          [bulkUpdatedModule]: result
        });
        return result.bulkInstances;
      },
      [`bulkUpdate${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let result = await context.models[moduleName].bulkUpdate(args.input, requestedFields);
        pubsub.publish(bulkDeletedModule, {
          [bulkDeletedModule]: result
        });
        return result.bulkInstances;
      }
    },
    queries: {
      [`view${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let view = await context.models[moduleName].view(args, requestedFields);
        return view.instance;
      },
      [`list${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        return await context.models[moduleName].paginate(args, requestedFields);
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
