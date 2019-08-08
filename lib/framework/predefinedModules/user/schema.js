"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getListByPaginationAndFiltersSchema_1 = __importDefault(require("./../../../framework/graphql/getListByPaginationAndFiltersSchema"));
const primaryKey_1 = __importDefault(require("./../../../framework/helpers/primaryKey"));
const primaryKey_2 = require("./../../../framework/helpers/primaryKey");
let userFields = `
	${primaryKey_1.default}: ${primaryKey_2.primaryKeyType}
	name: String
	username: String
	refreshToken: String
	accessToken: String
	isActivated: Boolean
	activatedOn: String
	twoFactorCode: String
	isSuperUser: Boolean
	activationToken: String
	email: String
	password: String
	referer: String
`;
exports.default = `
	type User {
		${userFields}
		profile: Profile
		assignedRoles: UserRoleList
		assignedPermissions: UserPermissionList
	}
	${getListByPaginationAndFiltersSchema_1.default("User")}
	input UserInput {
		${userFields}
	}
	input UserSignupInput {
		email: String
		password: String
		confirmPassword: String
	}
`;
//# sourceMappingURL=schema.js.map