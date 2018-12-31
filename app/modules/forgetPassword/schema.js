import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
} from "graphql";
import {get} from "lodash";

const ForgetPasswordSchema = new GraphQLObjectType({
	name: "ForgetPasswordSchema",
	description: "ForgetPasswordSchema...",
	fields() {
		return {
			email: {
				type: GraphQLString,
				resolve: (model) => get(model,'email','')
			}
		}
	}
});

export default ForgetPasswordSchema;