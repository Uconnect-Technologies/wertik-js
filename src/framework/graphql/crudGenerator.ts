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
        bulkUpdate${moduleName}(input: [${moduleName}Input]): [${moduleName}]
        bulkCreate${moduleName}(input: [${moduleName}Input]): [${moduleName}]
        bulkDelete${moduleName}(input: [${moduleName}Input]): [${moduleName}]
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
            [`bulkDelete${moduleName}`]: async (_:any, args:any, context:any,info: any) => {
                let requestedFields = getRequestedFieldsFromResolverInfo(info);
                return await context.models[moduleName].bulkDelete(args.input,requestedFields);
            },
            [`bulkCreate${moduleName}`]: async (_:any, args:any, context:any,info: any) => {
                let requestedFields = getRequestedFieldsFromResolverInfo(info);
                return await context.models[moduleName].bulkCreate(args.input,requestedFields);
            },
            [`bulkUpdate${moduleName}`]: async (_:any, args:any, context:any,info: any) => {
                let requestedFields = getRequestedFieldsFromResolverInfo(info);
                return await context.models[moduleName].bulkUpdate(args.input,requestedFields);
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