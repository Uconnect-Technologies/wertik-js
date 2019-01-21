import roleSchema from "./schema.js";
import roleController from "./controller.js";
import queryMutationArgument from "@framework/schema/queryMutationArgument.js";

export default {
	createRole: {
		name: "Create role",
		description: "Allows you to create a role for a user",
		type: roleSchema,
		args: {
			...queryMutationArgument('user','number'),
			...queryMutationArgument('type','string'),
		},
		async resolve(_,args) {
			return await roleController.createRole(_,args);
		}
	},
	deleteRole: {
		type: "Delete role",
		description: "Allows you to delete a role",
		type: roleSchema,
		args: {
			...queryMutationArgument('id','number')
		},
		async resolve(_,args) {
			return await roleController.deleteRole(_, args);
		}
	},
	updateRole: {
		name: "Update role",
		description: "Allows you to update a role",
		type: roleSchema,
		args: {
			...queryMutationArgument('id','number'),
			...queryMutationArgument('user','number'),
			...queryMutationArgument('type','string')
		},
		async resolve(_,args) {
			return await roleController.updateRole(_,args);
		}
	}
}