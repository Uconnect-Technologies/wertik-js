let {ApolloServer} = require("apollo-server");
let modules = require("./loadAllModules").default;

export default function (expressApp,configuration,dbTables,models) {
    let apollo = new ApolloServer({
        typeDefs: modules.schema,
        resolvers: modules.resolvers,
        context: function () {
            return {
                dbTables,
                models
            }
        }
    });
    apollo.listen().then(({url}) => {
        console.log("Server started at " + url);
    });
}