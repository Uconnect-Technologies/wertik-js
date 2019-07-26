"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getListByPaginationAndFiltersSchema_1 = __importDefault(require("./../../../framework/graphql/getListByPaginationAndFiltersSchema"));
const primaryKey_1 = __importDefault(require("./../../../framework/helpers/primaryKey"));
const primaryKey_2 = require("./../../../framework/helpers/primaryKey");
exports.default = `
	type UserRole {
		${primaryKey_1.default}: ${primaryKey_2.primaryKeyType}
		name: String
		user: User
		role: Role
	}
	${getListByPaginationAndFiltersSchema_1.default("UserRole")}
	input UserRoleInput {
		_id: String
		id: Int
		user: ${primaryKey_2.primaryKeyType}
		role: ${primaryKey_2.primaryKeyType}
	}
`;
//# sourceMappingURL=schema.js.map