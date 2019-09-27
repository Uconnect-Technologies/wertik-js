import {generateError} from "./../helpers/index"

export const generateQueriesCrudSchema = (moduleName: String) => {
    return `
        view${moduleName}(id: Int, action: String,_id: String): ${moduleName}
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
            [`create${moduleName}`]: async (_:any, args:any, context:any) => {
                return await context.models[moduleName].create(args.input);
            },
            [`delete${moduleName}`]: async (_:any, args:any, context:any) => {
                
            },
            [`update${moduleName}`]: async (_:any, args:any, context:any) => {
                
            },
            [`deleteBulk${moduleName}`]: async (_:any, args:any, context:any) => {
                
            },
            [`createBulk${moduleName}`]: async (_:any, args:any, context:any) => {
                
            },
            [`updateBulk${moduleName}`]: async (_:any, args:any, context:any) => {
                
            }
        },
        queries: {
            [`view${moduleName}`]: async (_:any, args:any, context:any) => {
                try {
                    let view = await context.models[moduleName].view(args.input);
                    if (!view) {
                        throw generateError({message: `${moduleName} not found`});
                    }
                    return view;
                } catch (e) {
                    return generateError(e);
                }
            },
            [`list${moduleName}`]: async (_:any, args:any, context:any) => {
                try {
                    return await context.models[moduleName].paginate(args);
                } catch (e) {
                    return generateError(e);
                }
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