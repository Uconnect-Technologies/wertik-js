"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getListByPaginationAndFiltersSchema_1 = __importDefault(require("./../../../framework/graphql/getListByPaginationAndFiltersSchema"));
const primaryKey_1 = __importDefault(require("./../../../framework/helpers/primaryKey"));
const primaryKey_2 = require("./../../../framework/helpers/primaryKey");
exports.default = `
	type Profile {
		${primaryKey_1.default}: ${primaryKey_2.primaryKeyType}
		name: String
		user: User
		age: Int
		gender: String
		dob: Int
		description: String
		created_by: User
	}
	${getListByPaginationAndFiltersSchema_1.default("Profile")}
	input ProfileInput {
		${primaryKey_1.default}: ${primaryKey_2.primaryKeyType}
		user: ${primaryKey_2.primaryKeyType}
		description: String
	}
`;
//# sourceMappingURL=schema.js.map