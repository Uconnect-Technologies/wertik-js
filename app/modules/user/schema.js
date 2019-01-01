import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
} from "graphql";
import {get} from "lodash";

const UserSchema = new GraphQLObjectType({
  name: "User schema",
  description: "User schema for graphql",
  fields() {
    return {
      email: {
        type: GraphQLString,
        resolve(model) {
          return model.email
        }
      }
    }
  }
})