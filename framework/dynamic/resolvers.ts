import validate from "./../validations/validate";
import internalServerError from "./../helpers/internalServerError";
import {ApolloError} from "apollo-server";
import statusCodes from "./../helpers/statusCodes";

export default function (info: any) {
  let {moduleName,validations,model} = info;
  return {
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
          return await model.create(args.input);
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
          return await model.update(args.input);
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
          return await model.delete(args.input);
        } catch (e) {
          return internalServerError(e);
        }
      }
    }
  }
}