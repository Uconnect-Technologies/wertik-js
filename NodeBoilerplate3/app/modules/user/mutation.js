export default `
	activateAccount(id: Int): User
	signup(email: String, password: String, confirmPassword: String): User
	login(email: String, password: String): User
	refreshToken(refreshToken: String): User
	changePassword(newPassword: String, oldPassword: String, userID: Int): User
	updateProfile(userID: Int, name: String, age: Int, gender: String): User
`;