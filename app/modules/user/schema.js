import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
} from "graphql";
import {get} from "lodash";
import schemaResponse from "@framework/schema/schemaResponse.js";
import schemaAttribute from "@framework/schema/schemaAttribute.js";

export default new GraphQLObjectType({
  name: "Userschema",
  description: "User schema for graphql",
  fields() {
    return {
      ...schemaResponse,
      ...schemaAttribute('username','string'),
      ...schemaAttribute('isActivated','string'),
      ...schemaAttribute('refreshToken','string'),
      ...schemaAttribute('activationToken','string'),
      ...schemaAttribute('email','string'),
      ...schemaAttribute('superUser','string'),
      ...schemaAttribute('name','string'),
      ...schemaAttribute('gender','string'),
      ...schemaAttribute('referer','string'),
      ...schemaAttribute('accessToken','string'),
    }
  }
});