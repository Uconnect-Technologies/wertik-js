export default `
  userRole(id: Int, action: String,_id: String): UserRole
  listUserRole(page: Int, limit: Int): [UserRole]
`