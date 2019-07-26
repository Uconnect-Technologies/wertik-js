import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema"
import primaryKey, { primaryKeyType } from "./../../../framework/helpers/primaryKey"

export default `
	type Permission {
		${primaryKey}: ${primaryKeyType}
		name: String
		can: String
		cant: String
		successMessage: String
		successMessageType: String
		created_by: User
	}
	${getListByPaginationAndFiltersSchema("Permission")}
	input PermissionInput {
		${primaryKey}: ${primaryKeyType}
		name: String
		can: String
		cant: String
	}
`;