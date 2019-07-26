import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema"
import primaryKey from "./../../../framework/helpers/primaryKey"
import { primaryKeyType } from "./../../../framework/helpers/primaryKey"

let userFields = `
	${primaryKey}: ${primaryKeyType}
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
`
export default `
	type User {
		${userFields}
		profile: Profile
		assignedRoles: [UserRoleList]
	}
	${getListByPaginationAndFiltersSchema("User")}
	input UserInput {
		${userFields}
	}
	input UserSignupInput {
		email: String
		password: String
		confirmPassword: String
	}
`;