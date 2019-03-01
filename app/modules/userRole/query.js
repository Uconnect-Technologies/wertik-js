export default `
 userRoleView(id: Int, action: String,_id: String): UserRole
  listUserRole(pagination: PaginationInput,filters: [FilterInput]): [UserRole]
`