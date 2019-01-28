export default `
	type UserRole {
		_id: String
		id: Int
		user: User
		role: Role
		successMessage: String
		successMessageType: String
		errors: [String]
		statusCode: String
		statusCodeNumber: Int
		created_at: String
		updated_at: String
	}
`;