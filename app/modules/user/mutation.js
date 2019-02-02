export default `
	activateAccount(activationToken: String): User
	signup(email: String, password: String, confirmPassword: String,referer: String, name: String): User
	login(email: String, password: String): User
	refreshToken(refreshToken: String): User
	changePassword(newPassword: String, oldPassword: String, id: Int, _id: String): User
	updateProfile(id: Int, _id: String, name: String, age: Int, gender: String): User
	twoFactorLogin(email: String): User
	twoFactorLoginValidate(twoFactorCode: String): User
`;