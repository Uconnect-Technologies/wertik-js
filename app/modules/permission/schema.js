export default `
	type Permission {
		_id: String
		id: Int
		action: String
		successMessage: String
		successMessageType: String
		created_by: User
		created_at: String
		updated_at: String
	}
	input PermissionInput {
		_id: String
		id: Int
		action: String
	}
`;