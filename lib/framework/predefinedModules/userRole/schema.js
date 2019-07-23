"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getListByPaginationAndFiltersSchema_1 = __importDefault(require("./../../../framework/graphql/getListByPaginationAndFiltersSchema"));
const { dialect } = process.env;
let relationSchemaType = "Int";
if (dialect == "MONGO_DB") {
    relationSchemaType = "String";
}
exports.default = `
	type UserRole {
		_id: String
		id: Int
		user: User
		role: Role
		successMessage: String
		successMessageType: String
		createdAt: String
		updatedAt: String
	}
	${getListByPaginationAndFiltersSchema_1.default("UserRole")}
	input UserRoleInput {
		_id: String
		id: Int
		user: ${relationSchemaType}
		role: ${relationSchemaType}
	}
`;
//# sourceMappingURL=schema.js.map