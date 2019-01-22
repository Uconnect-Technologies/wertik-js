export default `
	type User {
		_id: String
		id: Int
		name: String
		age: Int
		username: String
		refreshToken: String
		accessToken: String
		isActivated: Boolean
		activationToken: String
		email: String
		password: String
		gender: String
		referer: String
		successMessage: String
		successMessageType: String
		errors: [String]
		statusCode: String
		statusCodeNumber: Int
		created_at: String
		updated_at: String
	}
`;