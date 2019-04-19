import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema.js"

export default `
	type Role {
		_id: String
		id: Int
		name: String
		successMessage: String
		successMessageType: String
		permissions: [RolePermission]
		created_by: User
		created_at: String
		updated_at: String
	}

	${getListByPaginationAndFiltersSchema("Role")}

	input RoleInput {
		_id: String
		id: Int
		name: String
	}
	
`;