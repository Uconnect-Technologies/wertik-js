"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getListByPaginationAndFiltersSchema_1 = __importDefault(require("./../../../framework/graphql/getListByPaginationAndFiltersSchema"));
const getIdName_1 = __importDefault(require("./../../../framework/helpers/getIdName"));
const getIdName_2 = require("./../../../framework/helpers/getIdName");
exports.default = `
	type Role {
		${getIdName_1.default}: ${getIdName_2.getIdType}
		name: String
		successMessage: String
		successMessageType: String
		permissions: [RolePermissionList]
		created_by: User
		created_at: String
		updated_at: String
	}

	${getListByPaginationAndFiltersSchema_1.default("Role")}

	input RoleInput {
		_id: String
		id: Int
		name: String
	}
	
`;
//# sourceMappingURL=schema.js.map