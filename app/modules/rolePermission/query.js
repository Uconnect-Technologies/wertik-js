export default `
  rolePermissionView(id: Int, _id: String): RolePermission
  listRolePermission(pagination: PaginationInput,filters: [FilterInput]): [RolePermission]
`