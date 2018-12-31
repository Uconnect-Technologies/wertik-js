import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull
} from "graphql";
import ForgetPasswordSchema from "./schema.js";

console.log(ForgetPasswordSchema)

const ForgetPasswordMutations = {
	requestPasswordReset: {
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