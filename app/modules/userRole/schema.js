import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
} from "graphql";
import {get} from "lodash";

import schemaResponse from "@framework/schema/schemaResponse.js";
import schemaAttribute from "@framework/schema/schemaAttribute.js";

export default new GraphQLObjectType({
	name: "UserRoleSchema",
	description: "UserRoleSchema...",
	fields() {
		return {
			...schemaResponse,
			...schemaAttribute('user','number'),
			...schemaAttribute('role','number'),
			...schemaAttribute('status','boolean'),
			...schemaAttribute('type','string'),
		}
	}
});