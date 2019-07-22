"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getListByPaginationAndFiltersSchema_1 = __importDefault(require("./../../../framework/graphql/getListByPaginationAndFiltersSchema"));
const getIdName_1 = __importDefault(require("./../../../framework/helpers/getIdName"));
const getIdName_2 = require("./../../../framework/helpers/getIdName");
let userFields = `
	${getIdName_1.default}: ${getIdName_2.getIdType}
	name: String
	age: Int
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
	gender: String
	referer: String
`;
exports.default = `
	type User {
		${userFields}
		profile: Profile
		assignedRoles: [UserRoleList]
		successMessage: String
		successMessageType: String
		created_at: String
		updated_at: String
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