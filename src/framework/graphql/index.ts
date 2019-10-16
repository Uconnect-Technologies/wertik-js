let {ApolloServer} = require("apollo-server");
let {get} = require("lodash");
let loadAllModules = require("./loadAllModules").default;

export default function (expressApp,configuration,dbTables,models,allEmailTemplates,sendEmail) {
    const port = get(configuration,'ports.graphql',4000);
    const modules = loadAllModules(configuration);  
    const context = get(configuration,'context', {});
    let apollo = new ApolloServer({
        typeDefs: modules.schema,
        resolvers: modules.resolvers,
        subscriptions: {
            path: '/subscriptions'
        },
        context:  {
            dbTables,
            models,
            sendEmail: sendEmail,
            allEmailTemplates: allEmailTemplates,
            ...context
        }
    });
    apollo.listen(port).then(({url,subscriptionsUrl ,subscriptionsPath}) => {
        console.log("GraphQL server started at " + url);
        console.log("GraphQL subscriptions started at " + subscriptionsUrl);
    });
}