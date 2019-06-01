import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema.ts"

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
	${getListByPaginationAndFiltersSchema("Permission")}
	input PermissionInput {
		_id: String
		id: Int
		action: String
	}
`;