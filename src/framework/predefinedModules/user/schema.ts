import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema"
import getIdName from "./../../../framework/helpers/getIdName"
import { getIdType } from "./../../../framework/helpers/getIdName"

let userFields = `
	${getIdName}: ${getIdType}
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
		createdAt: String
		updatedAt: String
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