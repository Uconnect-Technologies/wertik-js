export default `
	type ForgetPassword {
		_id: String
		id: Int
		email: String
		token: String
		successMessage: String
		successMessageType: String
		errors: [String]
		statusCode: String
		statusCodeNumber: Int
		created_at: String
		updated_at: String
	}
`;