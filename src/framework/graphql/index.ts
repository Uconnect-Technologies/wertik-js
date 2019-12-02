let {ApolloServer} = require("apollo-server");
let {get} = require("lodash");
let loadAllModules = require("./loadAllModules").default;
import getUserWithAccessToken from "./../security/getUserWithAccessToken"
import getUserAllPermissions from "./../security/getUserAllPermissions"
import {IGraphQLInitialize} from "./../types/servers";


//expressApp,configuration,dbTables,models,emailTemplates,sendEmail,database,WertikEventEmitter

export default function (options: IGraphQLInitialize) {
    const {configuration,context,dbTables, models, sendEmail, emailTemplates,database, WertikEventEmitter} = options;
    const modules = loadAllModules(configuration);  
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
                emailTemplates: emailTemplates,
                permissions: permissions,
                ...context
            }
        }
    });
    if (configuration.forceStartGraphqlServer == true) {
        apollo.listen(configuration.ports.graphql).then(({url,subscriptionsUrl}) => {
            console.log("GraphQL server started at " + url);
            console.log("GraphQL subscriptions started at " + subscriptionsUrl);
        });
    }
    WertikEventEmitter.emit("GRAPHQL_READY");
    return apollo;
}