let {ApolloServer} = require("apollo-server");
let modules = require("./loadAllModules").default;

export default function (expressApp,configuration,models) {
    let apollo = new ApolloServer({
        typeDefs: modules.schema,
        resolvers: modules.resolvers,
        context: function () {
            // let loadTables = require("./../database/loadTables").default;
            // loadTables(configuration);
            return {
                models
            }
        }
    });
    apollo.listen().then(({url}) => {
        console.log("Server started at " + url);
    });
}