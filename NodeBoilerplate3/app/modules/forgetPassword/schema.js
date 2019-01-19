export default `
	type ForgetPassword {
    email: String
    token: String
		successMessage: String
		successMessageType: String
		errors: [String]
		statusCode: String
		statusCodeNumber: Int
	}
`;