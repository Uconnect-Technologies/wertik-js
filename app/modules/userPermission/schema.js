export default `
	type UserPermission {
		_id: String
		id: Int
		user: User
		permission: Permission
		successMessage: String
		successMessageType: String
		created_at: String
		updated_at: String
	}
`;