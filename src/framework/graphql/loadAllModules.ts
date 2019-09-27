/*
    This is all where GraphQL thing happens. This file loads all graphql schemas from the app.
*/

const {get} = require("lodash");
import generalSchema from "./generalSchema"
import {generateQueriesCrudSchema, generateListTypeForModule, generateMutationsCrudSchema, generateCrudResolvers} from "./crudGenerator";
let modulesSchema = ``;
let modulesQuerySchema = ``;
let modulesMutationSchema = ``;
let modules = process.env.builtinModules.split(",");
let response = () => {
    return {message: "Welcome to Wertik",version: "1.0 Beta"};
}
let schemaMap = `
    type Response {
        message: String
        version: String
    }
    type SuccessReponse {
        message: String
    }
    [generalSchema__replace]
    [modulesSchema__replace]
    type Mutation {
        response: Response 
        [mutation__replace]
    }
    type Query {
        response: Response
        [query__replace]
    }
    schema {
        query: Query
        mutation: Mutation
    }
`;
let appMutations = {};
let appQueries = {};

modules.forEach(element => {
    let module = require(`./../builtinModules/${element}/index`).default;
    // require information
    let graphql = module.graphql;
    let moduleName = module.name;
    let schema = graphql.schema;
    let currentGenerateQuery = get(graphql,'crud.query.generate',true);
    let currentGenerateQueryOperations = get(graphql,'crud.queries.operations',"*");
    let currentGenerateMutation = get(graphql,'crud.mutation.generate',true);
    let currentGenerateMutationOperations = get(graphql,'crud.mutation.operations',"*");
    let currentMutationSchema = get(graphql,'mutation.schema','');
    let currentMutationResolvers = get(graphql,'mutation.resolvers',{});
    let currentQuerySchema = get(graphql,'query.schema','');
    let currentQueryResolvers = get(graphql,'query.resolvers',{});
    let currentModuleCrudResolvers = generateCrudResolvers(moduleName);
    let currentModuleListSchema = (currentGenerateQuery || currentGenerateMutation) ? generateListTypeForModule(moduleName) : '';
    // require information
    // crud
    if (currentGenerateQuery) {
        modulesQuerySchema = modulesQuerySchema + generateQueriesCrudSchema(moduleName);
        appQueries = {...appQueries, ...currentModuleCrudResolvers.queries};
    }
    if (currentGenerateMutation) {
        modulesMutationSchema = modulesMutationSchema + generateMutationsCrudSchema(moduleName);
        appMutations = {...appMutations,...currentModuleCrudResolvers.mutations}
    }
    // crud
    modulesSchema = modulesSchema + schema;
    modulesSchema = modulesSchema + currentModuleListSchema;
    modulesQuerySchema = modulesQuerySchema + currentQuerySchema;
    modulesMutationSchema = modulesMutationSchema + currentMutationSchema;
    appQueries = {...appQueries, ...currentQueryResolvers};
    appMutations = {...appMutations, ...currentMutationResolvers};
});

schemaMap = schemaMap.replace("[generalSchema__replace]",generalSchema);
schemaMap = schemaMap.replace("[modulesSchema__replace]",modulesSchema);
schemaMap = schemaMap.replace("[mutation__replace]",modulesMutationSchema);
schemaMap = schemaMap.replace("[query__replace]",modulesQuerySchema);

export default {
    schema: schemaMap,
    resolvers: {
        Mutation: {
            ...appMutations,
            response: response
        },
        Query: {
            ...appQueries,
            response: response
        }
    }
}