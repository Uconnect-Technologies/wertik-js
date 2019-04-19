export default `
	twoFactorLogin(input: UserInput): User
	twoFactorLoginValidate(input: UserInput): User
	loginWithAccessToken(input: UserInput): User
	activateAccount(input: UserInput): User
	signup(input: UserSignupInput): User
	login(input: UserInput): User
	refreshToken(input: UserInput): User  
`;
