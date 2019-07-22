"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getListByPaginationAndFiltersSchema_1 = __importDefault(require("./../../../framework/graphql/getListByPaginationAndFiltersSchema"));
const getIdName_1 = __importDefault(require("./../../../framework/helpers/getIdName"));
const getIdName_2 = require("./../../../framework/helpers/getIdName");
exports.default = `
	type RolePermission {
		${getIdName_1.default}: ${getIdName_2.getIdType}
		permission: Permission,
		role: Role
		successMessage: String
		successMessageType: String
		statusCode: String
		statusCodeNumber: Int
		created_at: String
		updated_at: String
	}
	${getListByPaginationAndFiltersSchema_1.default("RolePermission")}
	input RolePermissionInput {
		${getIdName_1.default}: ${getIdName_2.getIdType}
		permission: ${getIdName_2.getIdType}
		role: ${getIdName_2.getIdType}
	}
`;
//# sourceMappingURL=schema.js.map