import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema";
import primaryKey, {
  primaryKeyType
} from "./../../../framework/helpers/primaryKey";

export default `
	type UserPermission {
		${primaryKey}: ${primaryKeyType}
		name: String
		permission: Permission,
		user: User
	}
	${getListByPaginationAndFiltersSchema("UserPermission")}
	input UserPermissionInput {
		${primaryKey}: ${primaryKeyType}
		permission: ${primaryKeyType}
		user: ${primaryKeyType}
	}
`;
