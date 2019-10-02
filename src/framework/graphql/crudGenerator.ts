import {generateError} from "./../helpers/index"
import getRequestedFieldsFromResolverInfo from "./../helpers/getRequestedFieldsFromResolverInfo";

export const generateQueriesCrudSchema = (moduleName: String) => {
    return `
        view${moduleName}(id: Int): ${moduleName}
        list${moduleName}(pagination: PaginationInput, filters: [FilterInput]): ${moduleName}List
    `;
}

export const generateMutationsCrudSchema = (moduleName: String) => {
    return `
        create${moduleName}(input: ${moduleName}Input): ${moduleName}
        delete${moduleName}(input: ${moduleName}Input): ${moduleName}
        update${moduleName}(input: ${moduleName}Input): ${moduleName}
        updateBulk${moduleName}(input: [${moduleName}Input]): [${moduleName}]
        createBulk${moduleName}(input: [${moduleName}Input]): [${moduleName}]
        deleteBulk${moduleName}(input: [${moduleName}Input]): [${moduleName}]
    `;

}

export const generateCrudResolvers = (moduleName: any) => {
    return {
        mutations: {
            [`create${moduleName}`]: async (_:any, args:any, context:any,info: any) => {
                let requestedFields = getRequestedFieldsFromResolverInfo(info);
                return await context.models[moduleName].create(args.input,requestedFields);
            },
            [`delete${moduleName}`]: async (_:any, args:any, context:any,info: any) => {
                return await context.models[moduleName].delete(args.input);
            },
            [`update${moduleName}`]: async (_:any, args:any, context:any,info: any) => {
                let requestedFields = getRequestedFieldsFromResolverInfo(info);
                return await context.models[moduleName].update(args.input,requestedFields);
            },
            [`deleteBulk${moduleName}`]: async (_:any, args:any, context:any,info: any) => {
                let requestedFields = getRequestedFieldsFromResolverInfo(info);
                return await context.models[moduleName].deleteBulk(args.input,requestedFields);
            },
            [`createBulk${moduleName}`]: async (_:any, args:any, context:any,info: any) => {
                let requestedFields = getRequestedFieldsFromResolverInfo(info);
                return await context.models[moduleName].createBulk(args.input,requestedFields);
            },
            [`updateBulk${moduleName}`]: async (_:any, args:any, context:any,info: any) => {
                let requestedFields = getRequestedFieldsFromResolverInfo(info);
                return await context.models[moduleName].updateBulk$(args.input,requestedFields);
            }
        },
        queries: {
            [`view${moduleName}`]: async (_:any, args:any, context:any,info: any) => {
                let requestedFields = getRequestedFieldsFromResolverInfo(info);
                return await context.models[moduleName].view(args,requestedFields);
            },
            [`list${moduleName}`]: async (_:any, args:any, context:any,info: any) => {
                let requestedFields = getRequestedFieldsFromResolverInfo(info);
                return await context.models[moduleName].paginate(args,requestedFields);
            }
        }
    }
}

export const generateListTypeForModule = (moduleName: String) => {
    return `
        type ${moduleName}List {
            list: [${moduleName}]
            pagination: Pagination
            filters: [Filter]
        }
    `;
}