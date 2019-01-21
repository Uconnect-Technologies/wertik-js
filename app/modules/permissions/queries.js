import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
} from "graphql";
import permissionSchema from "./schema.js";
import permissionController from "./controller.js";
import queryMutationArgument from "@framework/schema/queryMutationArgument.js";

export default {
	listPermission: {
		type: new GraphQLList(permissionSchema),
		args: {
			...queryMutationArgument('page','number'),
			...queryMutationArgument('limit','number')
		},
		async resolve(_,args) {
			return await permissionController.listPermission(_,args);
		}
	},
	viewPermission: {
		type: permissionSchema,
		args: {
			...queryMutationArgument('id','number'),
		},
		async resolve(_, args) {
			return await permissionController.viewPermission(_,args);
		}
	}
}