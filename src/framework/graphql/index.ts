const {ApolloServer} = require("apollo-server");
import loadAllModules from "./loadAllModules";
export default function () {
    let graphqlModules = loadAllModules();
    console.log("Setting up graphql");
}