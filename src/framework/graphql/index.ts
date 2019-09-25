let {ApolloServer} = require("apollo-server");
let modules = require("./loadAllModules").default;

export default function (expressApp,configuration) {
    let apollo = new ApolloServer({
        typeDefs: modules.schema,
        resolvers: modules.resolvers
    });
    apollo.listen().then(({url}) => {
        console.log("Server started at " + url);
    });
}