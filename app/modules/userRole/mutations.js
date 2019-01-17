import UserRoleSchema from "./schema.js";
import UserRoleController from "./controller.js";
import queryMutationArgument from "@framework/schema/queryMutationArgument.js";

export default {
	createUserRole: {
		type: UserRoleSchema,
		name: "Create user role",
		description: "Creates a new user role",
		args: {
			...queryMutationArgument('user','number'),
			...queryMutationArgument('role','number'),
		},
		async resolve(_,args) {
			return await UserRoleController.createUserRole(_,args);
		}
	}
};