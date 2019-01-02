import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
} from "graphql";
import UserSchema from "./schema.js";
import UserController from "./controller.js";
import mutationArgument from "./../../../framework/schema/mutationArgument.js";

const UserQueries = {
	user: {
		type: UserSchema,
		args: {
			...mutationArgument('id','number')
		},
		async resolve(_, args) {
			return await UserController.user(_, args);
		}
	}
}

export default UserQueries;