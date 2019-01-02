import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
} from "graphql";
import {get} from "lodash";
import schemaResponse from "@framework/schema/schemaResponse.js";

const UserSchema = new GraphQLObjectType({
  name: "Userschema",
  description: "User schema for graphql",
  fields() {
    return {
      ...schemaResponse,
      username: {
        type: GraphQLString,
        resolve(model) {
          return model.username;
        }
      },
      token: {
        type: GraphQLString,
        resolve(model) {
          return model.token;
        }
      },
      isActivated: {
        type: GraphQLString,
        resolve(model) {
          return model.isActivated;
        }
      },
      activationToken: {
        type: GraphQLString,
        resolve(model) {
          return model.activationToken;
        }
      },
      email: {
        type: GraphQLString,
        resolve(model) {
          return model.email;
        }
      },
      password: {
        type: GraphQLString,
        resolve(model) {
          return model.password;
        }
      },
      name: {
        type: GraphQLString,
        resolve(model) {
          return model.name;
        }
      },
      gender: {
        type: GraphQLString,
        resolve(model) {
          return model.gender;
        }
      },
      referer: {
        type: GraphQLString,
        resolve(model) {
          return model.referer;
        }
      },
      // authentication
      token: {
        type: GraphQLString,
        resolve(model) {
          return get(model,'token','');
        }
      }
    }
  }
});

export default UserSchema;