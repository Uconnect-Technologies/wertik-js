"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consoleMessages_1 = require("./../logger/consoleMessages");
const lodash_1 = require("lodash");
const lodash_2 = require("lodash");
const options_1 = require("../defaults/options");
function default_1(configuration, servers) {
    const startServers = lodash_1.get(configuration, "startServers", null);
    if (lodash_2.isFunction(startServers)) {
        startServers(configuration, servers);
    }
    else {
        const { graphql, restApi, graphqlVoyager, httpServer } = servers;
        const expressAppPort = lodash_1.get(configuration, "port", options_1.defaultPort);
        const showWertik404Page = lodash_1.get(configuration, "restApi.showWertik404Page", true);
        const restApi404Handler = lodash_1.get(configuration, "restApi.restApi404Handler", function (req, res) {
            res.status(404).json({
                message: "Not found",
                data: {
                    message: "Request page didn't found",
                },
            });
        });
        const restApiBeforeStart = lodash_1.get(configuration, "restApi.beforeStart", function () { });
        const graphqlPath = lodash_1.get(configuration, "graphql.path", "/graphql");
        const graphqlVoyagerPath = lodash_1.get(configuration, "graphql.graphqlVoyagerPath", "/graphql-voyager");
        const disableGraphqlVoyager = lodash_1.get(configuration, "graphql.disableGraphqlVoyager", false);
        const disableGraphql = lodash_1.get(configuration, "graphql.disable", false);
        const disableSockets = lodash_1.get(configuration, "sockets.disable", false);
        if (disableGraphqlVoyager === false) {
            restApi.get(graphqlVoyagerPath, (req, res) => res.send(graphqlVoyager));
        }
        if (disableGraphql === false) {
            graphql.applyMiddleware({ app: restApi, path: graphqlPath });
            graphql.installSubscriptionHandlers(httpServer);
        }
        restApiBeforeStart({ express: restApi });
        if (showWertik404Page) {
            restApi.get("*", restApi404Handler);
        }
        httpServer.listen(expressAppPort, () => {
            if (disableSockets === false) {
                consoleMessages_1.successMessage(`Socket.IO server running at`, `http://localhost:${expressAppPort}`);
            }
            consoleMessages_1.successMessage(`Rest API server started at`, `http://localhost:${expressAppPort}`);
            if (disableGraphqlVoyager === false) {
                consoleMessages_1.successMessage(`GraphQL Voyager running at`, `http://localhost:${expressAppPort}${graphqlVoyagerPath}`);
            }
            if (disableGraphql === false) {
                consoleMessages_1.successMessage("GraphQL Server started at", `http://localhost:${expressAppPort}${graphql.graphqlPath}`);
                consoleMessages_1.successMessage("GraphQL Subscriptions are running at", `ws://localhost:${expressAppPort}${graphql.subscriptionsPath}`);
            }
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=startServers.js.map