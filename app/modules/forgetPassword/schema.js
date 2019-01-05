import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
} from "graphql";
import {get} from "lodash";

import schemaResponse from "@framework/schema/schemaResponse.js";
import schemaAttribute from "@framework/schema/schemaAttribute.js";

export default new GraphQLObjectType({
	name: "ForgetPasswordSchema",
	description: "ForgetPasswordSchema...",
	fields() {
		return {
			...schemaResponse,
			...schemaAttribute('email','string'),
			...schemaAttribute('token','string'),
		}
	}
});