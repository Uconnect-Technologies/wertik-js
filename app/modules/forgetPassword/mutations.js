import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull
} from "graphql";
import ForgetPasswordSchema from "./schema.js";


const ForgetPasswordMutations = {
	requestPasswordReset: {
		name: "Request password reset",
		description: "Allows user to reset their password",
		type: ForgetPasswordSchema,
		args: {
			email: {
				type: GraphQLString
			}
		},
		resolve() {
			return {
				email: "Hello"
			}
		}
	}
}

export default ForgetPasswordMutations;