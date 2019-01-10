import permissionSchema from "./schema.js";
import permissionController from "./controller.js";
import queryMutationArgument from "@framework/schema/queryMutationArgument.js";

export default {
	createPermission: {
		name: "Create permission",
		description: "Allows you to create a permission for a user",
		type: permissionSchema,
		args: {
			...queryMutationArgument('user','number'),
			...queryMutationArgument('action','string'),
		},
		async resolve(_,args) {
			return await permissionController.createPermission(_,args);
		}
	},
	deletePermission: {
		type: "Delete permission",
		description: "Allows you to delete a permission",
		type: permissionSchema,
		args: {
			...queryMutationArgument('id','number')
		},
		async resolve(_,args) {
			return await permissionController.deletePermission(_, args);
		}
	},
	updatePermission: {
		name: "Update permission",
		description: "Allows you to update a permission",
		type: permissionSchema,
		args: {
			...queryMutationArgument('id','number'),
			...queryMutationArgument('user','number'),
			...queryMutationArgument('function','string'),
		},
		async resolve(_,args) {
			return await permissionController.updatePermission(_,args);
		}
	}
}