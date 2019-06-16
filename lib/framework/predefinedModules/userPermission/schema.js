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
	type UserPermission {
		_id: String
		id: Int
		user: User
		permission: Permission
		successMessage: String
		successMessageType: String
		created_at: String
		updated_at: String
	}
	${getListByPaginationAndFiltersSchema_1.default("UserPermission")}
	input UserPermissionInput {
		_id: String
		id: Int
		user: ${relationSchemaType}
		permission: ${relationSchemaType}
	}
`;
//# sourceMappingURL=schema.js.map