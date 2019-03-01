import validate from "./../validations/validate.js";
import internalServerError from "./../helpers/internalServerError.js";
import {ApolloError} from "apollo-server";
import statusCodes from "./../helpers/statusCodes.js";

export default function ({moduleName,validations,model}) {
  return {
    queries: {
      [`list${moduleName}`]: async (_, args, g) => {
        try {
          return await model.paginate(args);
        } catch (e) {
          return internalServerError(e);
        }
      },
      [`view${moduleName}`]: async (_, args, g) => {
        let v = await validate(validations.view,args,{abortEarly: false});
        let {success} = v;
        if (!success) {
          throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
        }
        try {
          let view = await model.view(args);
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
      [`create${moduleName}`]: async (_, args, g) => {
        let v = await validate(validations.create,args,{abortEarly: false});
        let {success} = v;
        if (!success) {
          throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
        }
        try {
          return await model.create({name: args.name});
        } catch (e) {
          return internalServerError(e);
        }
      },
      [`update${moduleName}`]: async (_, args, g) => {
        let v = await validate(validations.update,args,{abortEarly: false});
        let {success} = v;
        if (!success) {
          throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
        }
        try {
          return await model.update(args);
        } catch (e) {
          return internalServerError(e);
        }
      },
      [`delete${moduleName}`]: async (_, args, g) => {
        let v = await validate(validations.delete,args,{abortEarly: false});
        let {success} = v;
        if (!success) {
          throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
        }
        try {
          return await model.delete(args);
        } catch (e) {
          return internalServerError(e);
        }
      }
    }
  }
}