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
    let generateCrudMutations=  graphql.generateCrudMutations;
    let generateCrudQueries = graphql.generateCrudQueries;
});

