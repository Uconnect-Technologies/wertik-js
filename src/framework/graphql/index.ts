let {ApolloServer} = require("apollo-server");
let loadAllModules = require("./loadAllModules").default;

export default function (expressApp,configuration,dbTables,models) {
    const modules = loadAllModules(configuration);  
    let apollo = new ApolloServer({
        typeDefs: modules.schema,
        resolvers: modules.resolvers,
        context:  {
            dbTables,
            models
        }
    });
    apollo.listen().then(({url}) => {
        console.log("Server started at " + url);
    });
}