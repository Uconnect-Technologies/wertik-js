let {ApolloError} = require("apollo-server");
const { PubSub } = require('apollo-server');
const {camelCase} = require('lodash');

import validate from "./../validations/validate";
import internalServerError from "./../helpers/internalServerError";
import statusCodes from "./../helpers/statusCodes";
import getRequestedFieldsFromResolverInfo from "./../helpers/getRequestedFieldsFromResolverInfo"

const pubsub = new PubSub();

export default function (info: any) {
  
  let {moduleName,validations,model} = info;
  const moduleCrated = `${camelCase(moduleName)}`;
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
        try {
          return await model.paginate(args,requestedFields);
        } catch (e) {
          return internalServerError(e);
        }
      },
      [`view${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        let requestedFields = getRequestedFieldsFromResolverInfo(info)
        let v = await validate(validations.view,args);
        let {success} = v;
        if (!success) {
          throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
        }
        try {
          let view = await model.view(args,requestedFields);
          if (!view) {
            throw new ApolloError(`${moduleName} not found`,statusCodes.NOT_FOUND.number)
          }
          return view;
        } catch (e) {
          return internalServerError(e);
        }
      }
    },
    mutations: {
      [`updateBulk${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        return args.input.map( async (e: any) => {
          let v = await validate(validations.update,e);
          let {success} = v;
          if (!success) {
            throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
          }
          try {
            return await model.update(e,requestedFields);
          } catch (e) {
            return internalServerError(e);
          }
        });
      },
      [`deleteBulk${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        return args.input.map( async (item: any) => {
          let v = await validate(validations.delete,item);
          let {success} = v;
          if (!success) {
            throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
          }
          try {
            return await model.delete(item);
          } catch (e) {
            return internalServerError(e);
          }
        });
      },
      [`createBulk${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        return args.input.map( async (e: any) => {
          let v = await validate(validations.create,e);
          let {success} = v;
          if (!success) {
            throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
          }
          try {
            return await model.create(e,requestedFields);
          } catch (e) {
            return internalServerError(e);
          }  
        })
      },
      [`create${moduleName}`]: async (_:any, args:any, context:any,info: any) => {
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let v = await validate(validations.create,args.input);
        let {success} = v;
        if (!success) {
          throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
        }
        try {
          let createModel = await model.create(args.input,requestedFields);
          pubsub.publish(`${camelCase(moduleName)}Created`, { [`${camelCase(moduleName)}Created`]: createModel });
          return createModel;
        } catch (e) {
          return internalServerError(e);
        }
      },
      [`update${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        let requestedFields = getRequestedFieldsFromResolverInfo(info);
        let v = await validate(validations.update,args.input);
        let {success} = v;
        if (!success) {
          throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
        }
        try {
          let updateModel = await model.update(args.input,requestedFields);
          pubsub.publish(`${camelCase(moduleName)}Updated`, { [`${camelCase(moduleName)}Updated`]: updateModel });
          return updateModel;
        } catch (e) {
          return internalServerError(e);
        }
      },
      [`delete${moduleName}`]: async (_: any, args: any, context: any, info: any) => {
        let v = await validate(validations.delete,args.input);
        let {success} = v;
        if (!success) {
          throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
        }
        try {
          await model.delete(args.input);
          pubsub.publish(`${camelCase(moduleName)}Deleted`, { [`${camelCase(moduleName)}Deleted`]: args.input });
          return;
        } catch (e) {
          return internalServerError(e);
        }
      }
    }
  }
}