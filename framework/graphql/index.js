import mutations from "./loadAllMutations.js";
import queries from "./loadAllQueries.js";
import resolvers from "./loadAllResolvers";
import schemas from "./loadAllSchemas.js";
import {buildSchema} from "graphql";

import express_graphql from "express-graphql";
export default function (rootDirectory,app) {
	let allMutations = mutations(rootDirectory);
	let allQueries=  queries(rootDirectory);
	let allSchemas = schemas(rootDirectory);
	let allResolvers = resolvers(rootDirectory);
	let mainSchema  = `
		${allSchemas}
		type Mutation {
			${allMutations}
		}
		type Query {
			${allQueries}
		}
		schema {
			query: Query
			mutation: Mutation
		}
	`;
	let schema = buildSchema(mainSchema);
	app.use("/graphql", express_graphql({
		schema: schema,
		rootValue: allResolvers,
		graphiql: true
	}));
}