import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
} from "graphql";
import {get} from "lodash";

import schemaResponse from "@framework/schema/schemaResponse.js";

const ForgetPasswordSchema = new GraphQLObjectType({
	name: "ForgetPasswordSchema",
	description: "ForgetPasswordSchema...",
	fields() {
		return {
			...schemaResponse,
			email: {
				type: GraphQLString,
				resolve(model) {
					return get(model,'email','');	
				}
			},
			token: {
				type: GraphQLString,
				resolve(model) {
					return get(model,'token','');
				}
			}
		}
	}
});

export default ForgetPasswordSchema;