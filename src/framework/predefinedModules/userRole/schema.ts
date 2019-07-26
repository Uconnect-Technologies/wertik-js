import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema"
import primaryKey from "./../../../framework/helpers/primaryKey"
import { primaryKeyType } from "./../../../framework/helpers/primaryKey"

export default `
	type UserRole {
		${primaryKey}: ${primaryKeyType}
		name: String
		user: User
		role: Role
	}
	${getListByPaginationAndFiltersSchema("UserRole")}
	input UserRoleInput {
		_id: String
		id: Int
		user: ${primaryKeyType}
		role: ${primaryKeyType}
	}
`;