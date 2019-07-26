import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema"
import primaryKey from "./../../../framework/helpers/primaryKey"
import { primaryKeyType } from "./../../../framework/helpers/primaryKey"

let userFields = `
	${primaryKey}: ${primaryKeyType}
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
`
export default `
	type User {
		${userFields}
		profile: Profile
		assignedRoles: [UserRoleList]
		successMessage: String
		successMessageType: String
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