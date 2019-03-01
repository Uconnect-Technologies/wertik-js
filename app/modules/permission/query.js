export default `

  permissionView(id: Int, action: String,_id: String): Permission
  listPermission(pagination: PaginationInput,filters: [FilterInput]): [Permission]
`