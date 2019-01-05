import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
} from "graphql";
import ForgetPasswordSchema from "./schema.js";
import queryMutationArgument from "@/framework/schema/queryMutationArgument.js";
import ForgetPasswordController from "./controller.js";

const ForgetPasswordQueries = {
	forgetPassword: {
		type: ForgetPasswordSchema,
		args: {
			...queryMutationArgument('id','number')
		},
		async resolve(_,args) {
			return await ForgetPasswordController.forgetPasswordView(_,args);
		}
	}
}

export default ForgetPasswordQueries;