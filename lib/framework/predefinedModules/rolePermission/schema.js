"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getListByPaginationAndFiltersSchema_1 = __importDefault(require("./../../../framework/graphql/getListByPaginationAndFiltersSchema"));
const { DIALECT } = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
    relationSchemaType = "String";
}
exports.default = `
	type RolePermission {
		_id: String
		id: Int
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
		_id: String
		id: Int
		permission: ${relationSchemaType}
		role: ${relationSchemaType}
	}
`;
//# sourceMappingURL=schema.js.map