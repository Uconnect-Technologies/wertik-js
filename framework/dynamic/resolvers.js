import validate from "./../validations/validate.js";
import internalServerError from "./../helpers/internalServerError.js";
import {ApolloError} from "apollo-server";
import statusCodes from "./../helpers/statusCodes.js";

export default function ({moduleName,validations,model}) {
  return {
    queries: {
      [`list${moduleName}`]: async (_, args, g) => {
        try {
          return await model.paginate(args.input)
        } catch (e) {
          return internalServerError(e);
        }
      },
      [`view${moduleName}`]: async (_, args, g) => {
        let v = await validate(validations.view,args.input,{abortEarly: false});
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
      [`updateBulk${moduleName}`]: async (_, args, g) => {
        return args.input.map( async (e) => {
          let v = await validate(validations.update,e,{abortEarly: false});
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
      [`deleteBulk${moduleName}`]: async (_, args, g) => {
        return args.input.map( async (item) => {
          let v = await validate(validations.delete,item,{abortEarly: false});
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
      [`createBulk${moduleName}`]: async (_, args, g) => {
        return args.input.map( async (e) => {
          let v = await validate(validations.create,e,{abortEarly: false});
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
      [`create${moduleName}`]: async (_, args, g) => {
        let v = await validate(validations.create,args.input,{abortEarly: false});
        let {success} = v;
        if (!success) {
          throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
        }
        try {
          return await model.create({name: args.input.name});
        } catch (e) {
          return internalServerError(e);
        }
      },
      [`update${moduleName}`]: async (_, args, g) => {
        let v = await validate(validations.update,args.input,{abortEarly: false});
        let {success} = v;
        if (!success) {
          throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
        }
        try {
          return await model.update(args.input);
        } catch (e) {
          return internalServerError(e);
        }
      },
      [`delete${moduleName}`]: async (_, args, g) => {
        let v = await validate(validations.delete,args.input,{abortEarly: false});
        let {success} = v;
        if (!success) {
          throw new ApolloError("Validation error",statusCodes.BAD_REQUEST.number,{list: v.errors})
        }
        try {
          return await model.delete(args.input);
        } catch (e) {
          return internalServerError(e);
        }
      }
    }
  }
}