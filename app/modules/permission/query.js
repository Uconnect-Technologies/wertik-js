export default `
  permission(id: Int, action: String,_id: String): Permission
  listPermission(page: Int, limit: Int): [Permission]
`