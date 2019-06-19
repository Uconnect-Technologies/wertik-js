"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let { buildSchema } = require("graphql");
const { ApolloServer } = require('apollo-server');
function default_1(rootDirectory, app, configuration) {
    console.log(process.env);
    //let allMutations = mutations(rootDirectory);
    //let allQueries=  queries(rootDirectory);
    //let allSchemas = schemas(rootDirectory);
    //let allResolvers = resolvers(rootDirectory);
    //let {validateAccessToken} = require(`${rootDirectory}/framework/predefinedModules/user/auth`).default;
    // let mainSchema  = `
    // 	${generalSchema}
    // 	${allSchemas}
    // 	type Mutation {
    // 		${allMutations}
    // 	}
    // 	type Query {
    // 		${allQueries}
    // 	}
    // 	schema {
    // 		query: Query
    // 		mutatiobn: Mutation
    // 	}
    // `;
    // let schema = buildSchema(mainSchema);
    // const server = new ApolloServer({ 
    // 	typeDefs: mainSchema, 
    // 	resolvers: allResolvers,
    // 	context: async (a: any) => {
    // 		await validateAccessToken(a.req);
    // 	}
    // });
    // server.listen(1209).then((a: any) => {
    //   console.log(`Server ready at ${a.url}`);
    // });
}
exports.default = default_1;
//# sourceMappingURL=index.js.map