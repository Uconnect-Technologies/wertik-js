export default `
	type ForgetPassword {
    email: String
    token: String
    user: Int
		successMessage: String
		successMessageType: String
		errors: [String]
		statusCode: String
		statusCodeNumber: Int
	}
`;