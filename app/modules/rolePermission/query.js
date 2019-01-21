export default `
  rolePermission(id: Int, action: String): RolePermission
  listRolePermission(page: Int, limit: Int): [RolePermission]
`