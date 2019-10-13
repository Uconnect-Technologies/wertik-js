let {ApolloServer} = require("apollo-server");
let {get} = require("lodash");
let loadAllModules = require("./loadAllModules").default;

export default function (expressApp,configuration,dbTables,models) {
    const modules = loadAllModules(configuration);  
    const context = get(configuration,'context', {});
    let apollo = new ApolloServer({
        typeDefs: modules.schema,
        resolvers: modules.resolvers,
        context:  {
            dbTables,
            models,
            ...context
        }
    });
    apollo.listen().then(({url}) => {
        console.log("Server started at " + url);
    });
}