export default `
	activateAccount(activationToken: String): User
	signup(email: String, password: String, confirmPassword: String,referer: String, name: String, isSuperUser: Boolean): User
	login(email: String, password: String): User
	refreshToken(refreshToken: String): User
	deleteUser(id: Int,_id: String): User
	changePassword(newPassword: String, oldPassword: String, id: Int, _id: String): User
	updateUser(id: Int, _id: String, name: String, age: Int, gender: String, email: String, isSuperUser: Boolean): User
	twoFactorLogin(email: String): User
	twoFactorLoginValidate(twoFactorCode: String): User
`;