let {ApolloServer} = require("apollo-server");
let {get} = require("lodash");
let loadAllModules = require("./loadAllModules").default;
let getUserWithAccessToken = require("./../security/getUserWithAccessToken").default;
let getUserAllPermissions = require("./../security/getUserAllPermissions").default

export default function (expressApp,configuration,dbTables,models,allEmailTemplates,sendEmail,database) {
    const port = get(configuration,'ports.graphql',4000);
    const modules = loadAllModules(configuration);  
    const context = get(configuration,'context', {});
    let apollo = new ApolloServer({
        typeDefs: modules.schema,
        resolvers: modules.resolvers,
        subscriptions: {
            path: '/subscriptions'
        },
        context: async ({req, res}) => {
            let user = await getUserWithAccessToken(models.User, get(req,'headers.authorization',''));
            let permissions = (user) ? await getUserAllPermissions(user.id,database) : [];
            return {
                user: user,
                dbTables,
                models,
                sendEmail: sendEmail,
                allEmailTemplates: allEmailTemplates,
                ...context,
                permissions: permissions
            }
        }
    });
    apollo.listen(port).then(({url,subscriptionsUrl}) => {
        console.log("GraphQL server started at " + url);
        console.log("GraphQL subscriptions started at " + subscriptionsUrl);
    });
    return apollo;
}