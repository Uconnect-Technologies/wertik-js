export default `
	userPermissionView(id: Int,_id: String): UserPermission
	listUserPermission(pagination: PaginationInput,filters: [FilterInput]): [UserPermission]
`;
