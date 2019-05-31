import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema.js"

let userFields = `
	_id: String
	id: Int
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
		assignedPermissions: [UserPermissionList]
		assignedRoles: [UserRoleList]
		successMessage: String
		successMessageType: String
		created_at: String
		updated_at: String
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