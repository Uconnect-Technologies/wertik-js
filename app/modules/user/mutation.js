const {DIALECT} = process.env;
let relationSchemaType = "Int";
if (DIALECT == "MONGO_DB") {
	relationSchemaType = "String";
}
export default `
	activateAccount(input: UserInput): User
	signup(input: UserInput): User
	login(input: UserInput): User
	refreshToken(input: UserInput): User
	deleteUser(id: Int,_id: String): User
	changePassword(input: UserInput): User
	updateUser(input: UserInput): User
	twoFactorLogin(email: String): User
	twoFactorLoginValidate(input: UserInput): User
	loginWithAccessToken(input: UserInput): User
`;