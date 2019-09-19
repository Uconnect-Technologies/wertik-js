const {get} = require("lodash");
let modules = process.env.builtinModules.split(",");
let appSchema = "";
let appMutations = {};
let appQueries = {};

modules.forEach(element => {
    let module = require(`./../builtinModules/${element}/index`).default;
    let name = module.name;
    let graphql = module.graphql;
    let schema = graphql.schema;
    let mutations = graphql.mutations;
    let queries = graphql.queries;
    let crud = graphql.crud;    

    console.log(appSchema)
});


export default {
    schema: ``,
    resolvers: {}
}