const { ApolloError, PubSub } = require("apollo-server");
const { camelCase, get } = require("lodash");

import removeRestrictedColumnsFromRequestedFields from "./../helpers/removeRestrictedColumnsFromRequestedFields";
import getRequestedFieldsFromResolverInfo from "./../helpers/getRequestedFieldsFromResolverInfo";
import internalServerError from "./../helpers/internalServerError";
import statusCodes from "./../helpers/statusCodes";
import logger from "./../helpers/logger";
import validate from "./../validations/validate";
import primaryKey from "../helpers/primaryKey";

const pubsub = new PubSub();

export default function(info: any) {
  let { moduleName, validations, model } = info;
  let restricedColumns = get(info, "restricedColumns", []);
  const moduleCreated = `${camelCase(moduleName)}`;
  const moduleUpdated = `${camelCase(moduleName)}`;
  const moduleDeleted = `${camelCase(moduleName)}`;
  const moduleBulkCreated = `${camelCase(moduleName)}`;
  const moduleBulkDeleted = `${camelCase(moduleName)}`;
  const moduleBulkUpdated = `${camelCase(moduleName)}`;

  return {
    subscriptions: {
      [`${camelCase(moduleName)}Created`]: {
        subscribe: () => pubsub.asyncIterator([`${camelCase(moduleName)}Created`])
      },
      [`${camelCase(moduleName)}Updated`]: {
        subscribe: () => pubsub.asyncIterator([`${camelCase(moduleName)}Updated`])
      },
      [`${camelCase(moduleName)}Deleted`]: {
        subscribe: () => pubsub.asyncIterator([`${camelCase(moduleName)}Deleted`])
      }
    },
    queries: {
      [`list${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        requestedFields.list = await removeRestrictedColumnsFromRequestedFields(requestedFields.list, restricedColumns);
        try {
          let paginate = await model.paginate(args, requestedFields);
          console.log(context.permissions);
          logger.info(`List ${moduleName}`, {
            pagination: paginate.paginate,
            paginationProperties: paginate.paginationProperties,
            args: args
          });
          return paginate;
        } catch (e) {
          throw internalServerError(e);
        }
      },
      [`view${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let v = await validate(validations.view, args);
        let { success } = v;
        if (!success) {
          return new ApolloError("Validation error", statusCodes.BAD_REQUEST.number, { list: v.errors });
        }
        try {
          let view = await model.view(args, requestedFields);
          if (!view) {
            return new ApolloError(`${moduleName} not found`, statusCodes.NOT_FOUND.number);
          }
          logger.info(`View ${moduleName}`, {
            [primaryKey]: view[primaryKey]
          });
          return view;
        } catch (e) {
          throw internalServerError(e);
        }
      }
    },
    mutations: {
      [`updateBulk${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        return args.input.map(async (e: any) => {
          logger.info(`Update ${moduleName} with bulk update`, {
            [primaryKey]: e[primaryKey]
          });
          let v = await validate(validations.update, e);
          let { success } = v;
          if (!success) {
            return new ApolloError("Validation error", statusCodes.BAD_REQUEST.number, { list: v.errors });
          }
          try {
            return await model.update(e, requestedFields);
          } catch (e) {
            throw internalServerError(e);
          }
        });
      },
      [`deleteBulk${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        return args.input.map(async (item: any) => {
          logger.info(`Delete ${moduleName} with bulk update`, {
            [primaryKey]: item[primaryKey]
          });
          let v = await validate(validations.delete, item);
          let { success } = v;
          if (!success) {
            return new ApolloError("Validation error", statusCodes.BAD_REQUEST.number, { list: v.errors });
          }
          try {
            return await model.delete(item);
          } catch (e) {
            throw internalServerError(e);
          }
        });
      },
      [`createBulk${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        return args.input.map(async (e: any) => {
          let v = await validate(validations.create, e);
          let { success } = v;
          if (!success) {
            return new ApolloError("Validation error", statusCodes.BAD_REQUEST.number, { list: v.errors });
          }
          try {
            let createModel = await model.create(e, requestedFields);
            logger.info(`Create ${moduleName} with bulk update`, {
              [primaryKey]: createModel[primaryKey]
            });
            return createModel;
          } catch (e) {
            throw internalServerError(e);
          }
        });
      },
      [`create${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let v = await validate(validations.create, args.input);
        let { success } = v;
        if (!success) {
          throw new ApolloError("Validation error", statusCodes.BAD_REQUEST.number, { list: v.errors });
        }
        try {
          let createModel = await model.create(args.input, requestedFields);
          pubsub.publish(`${camelCase(moduleName)}Created`, {
            [`${camelCase(moduleName)}Created`]: createModel
          });
          logger.info(`Create ${moduleName}`, {
            [primaryKey]: createModel[primaryKey]
          });
          return createModel;
        } catch (e) {
          throw internalServerError(e);
        }
      },
      [`update${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let v = await validate(validations.update, args.input);
        let { success } = v;
        if (!success) {
          throw new ApolloError("Validation error", statusCodes.BAD_REQUEST.number, { list: v.errors });
        }
        try {
          let updateModel = await model.update(args.input, requestedFields);
          pubsub.publish(`${camelCase(moduleName)}Updated`, {
            [`${camelCase(moduleName)}Updated`]: updateModel
          });
          logger.info(`Update ${moduleName}`, {
            [primaryKey]: updateModel[primaryKey]
          });
          return updateModel;
        } catch (e) {
          throw internalServerError(e);
        }
      },
      [`delete${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        let v = await validate(validations.delete, args.input);
        let { success } = v;
        if (!success) {
          throw new ApolloError("Validation error", statusCodes.BAD_REQUEST.number, { list: v.errors });
        }
        try {
          await model.delete(args.input);
          pubsub.publish(`${camelCase(moduleName)}Deleted`, {
            [`${camelCase(moduleName)}Deleted`]: args.input
          });
          logger.info(`Delete ${moduleName}`, {
            [primaryKey]: args.input[primaryKey]
          });
          return;
        } catch (e) {
          throw internalServerError(e);
        }
      }
    }
  };
}
