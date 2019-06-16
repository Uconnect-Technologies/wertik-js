"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getListByPaginationAndFiltersSchema_1 = __importDefault(require("./../../../framework/graphql/getListByPaginationAndFiltersSchema"));
exports.default = `
	type Role {
		_id: String
		id: Int
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