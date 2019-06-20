let {ApolloError} = require("apollo-server");
const { PubSub } = require('apollo-server');
const {camelCase} = require('lodash');

import validate from "./../validations/validate";
import internalServerError from "./../helpers/internalServerError";
import statusCodes from "./../helpers/statusCodes";

const pubsub = new PubSub();

export default function (info: any) {
  let {moduleName,validations,model} = info;
  return {
    subscriptions: {
      [`${camelCase(moduleName)}Created`]: {
        subscribe: () => pubsub.asyncIterator([`${moduleName}Created`])
      },
      [`${camelCase(moduleName)}Updated`]: {
        subscribe: () => pubsub.asyncIterator([`${moduleName}Updated`])
      },
      [`${camelCase(moduleName)}Deleted`]: {
        subscribe: () => pubsub.asyncIterator([`${moduleName}Deleted`])
      }
    },
    queries: {
      [`list${moduleName}`]: async (_:any, args:any, context:any) => {
        try {
          return await model.paginate(args);
        } catch (e) {
          return internalServerError(e);
        }
      },
      [`view${moduleName}`]: async (_:any, args:any, context:any) => {
        let v = await validate(validations.view,args.input);
        let {success} = v;
        if (!success) {
          throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
        }
        try {
          let view = await model.view(args.input);
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
      [`updateBulk${moduleName}`]: async (_:any, args:any, context:any) => {
        return args.input.map( async (e: any) => {
          let v = await validate(validations.update,e);
          let {success} = v;
          if (!success) {
            throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
          }
          try {
            return await model.update(e);
          } catch (e) {
            return internalServerError(e);
          }
        });
      },
      [`deleteBulk${moduleName}`]: async (_:any, args:any, context:any) => {
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
      [`createBulk${moduleName}`]: async (_:any, args:any, context:any) => {
        return args.input.map( async (e: any) => {
          let v = await validate(validations.create,e);
          let {success} = v;
          if (!success) {
            throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
          }
          try {
            return await model.create(e);
          } catch (e) {
            return internalServerError(e);
          }  
        })
      },
      [`create${moduleName}`]: async (_:any, args:any, context:any) => {
        let v = await validate(validations.create,args.input);
        let {success} = v;
        if (!success) {
          throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
        }
        try {
          let createModel = await model.create(args.input);
          pubsub.publish(`${camelCase(moduleName)}Created`, { data: createModel });
          return createModel;
        } catch (e) {
          return internalServerError(e);
        }
      },
      [`update${moduleName}`]: async (_:any, args:any, context:any) => {
        let v = await validate(validations.update,args.input);
        let {success} = v;
        if (!success) {
          throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
        }
        try {
          let updateModel = await model.update(args.input);
          pubsub.publish(`${camelCase(moduleName)}Updated`, { data: updateModel });
          return updateModel;
        } catch (e) {
          return internalServerError(e);
        }
      },
      [`delete${moduleName}`]: async (_:any, args:any, context:any) => {
        let v = await validate(validations.delete,args.input);
        let {success} = v;
        if (!success) {
          throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
        }
        try {
          await model.delete(args.input);
          pubsub.publish(`${camelCase(moduleName)}Deleted`, { data: args.input });
          return;
        } catch (e) {
          return internalServerError(e);
        }
      }
    }
  }
}