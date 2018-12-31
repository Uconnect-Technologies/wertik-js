import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
} from "graphql";
import ForgetPasswordSchema from "./schema.js";

const ForgetPasswordQueries = {
	forgetPassword: {
		type: ForgetPasswordSchema,
		args: {
			email: {
				type: GraphQLString,
			}
		},
		resolve() {
			return {
				email: "helo"
			}
		}
	}
}

export default ForgetPasswordQueries;