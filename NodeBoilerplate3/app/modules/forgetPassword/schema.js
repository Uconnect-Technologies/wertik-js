export default `
	type ForgetPassword {
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