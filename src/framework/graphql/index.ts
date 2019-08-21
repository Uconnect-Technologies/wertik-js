const { ApolloServer, ApolloError } = require("apollo-server");
const { get } = require("lodash");

import mutations from "./loadAllMutations";
import queries from "./loadAllQueries";
import resolvers from "./loadAllResolvers";
import subscriptions from "./loadAllSubscriptions";
import schemas from "./loadAllSchemas";
import generalSchema from "./../helpers/generalSchema";
import validateAccessToken from "./../security/validateAccessToken";
import logger from "./../helpers/logger";
import listUserPermissions from "../security/listUserPermissions";
import primaryKey from "../helpers/primaryKey";
import isActionAllowed from "../security/isActionAllowed";
let gql = require("graphql-tag");

export default function(rootDirectory: string, app: any) {
  let appMutations = mutations(rootDirectory);
  let appQueries = queries(rootDirectory);
  let appSchema = schemas(rootDirectory);
  let appResolvers = resolvers(rootDirectory);
  let appSubscriptions = subscriptions(rootDirectory);
  let mainSchema = `
		${generalSchema}
		${appSchema}
		type Subscription {
			${appSubscriptions}
		}
		type Mutation {
			${appMutations}
		}
		type Query {
			${appQueries}
		}
		schema {
			query: Query
			mutation: Mutation
			subscription: Subscription
		}
  `;
  const server = new ApolloServer({
    typeDefs: mainSchema,
    resolvers: appResolvers,
    formatError: e => {
      logger.error(`Something went wrong`, {
        error: e
      });
      return e;
    },
    context: async (graphqlCall: any) => {
      let parsed = gql`
        ${graphqlCall.req.body.query}
      `;
      let queryName = get(parsed, "definitions[0].selectionSet.selections[0].name.value", "");
      let authorization: any = await validateAccessToken(graphqlCall);
      let user = get(authorization, "user");
      let permissions = await listUserPermissions({
        [primaryKey]: get(user, primaryKey)
      });
      let isAllowed = queryName == "__schema" ? true : await isActionAllowed(permissions, queryName);
      if (!isAllowed) {
        throw new ApolloError("You are not allowed to do this action", 401, {});
      }
      return {
        authorization: authorization,
        permissions: permissions
      };
    }
  });
  server.listen(1209).then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`);
    console.log(`Subscriptions ready at ${subscriptionsUrl}`);
  });
}
