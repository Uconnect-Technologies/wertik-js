import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
} from "graphql";
import ForgetPasswordSchema from "./schema.js";
import queryMutationArgument from "@/framework/schema/queryMutationArgument.js";
import ForgetPasswordController from "./controller.js";

export default {
	forgetPassword: {
		type: ForgetPasswordSchema,
		name: "Fetch ForgetPassword Item",
		description: "fetches foget passsword Item according to forgetPassword.id",
		args: {
			...queryMutationArgument('id','number')
		},
		async resolve(_,args) {
			return await ForgetPasswordController.forgetPasswordView(_,args);
		}
	}
}