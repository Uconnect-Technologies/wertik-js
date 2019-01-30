export default `
  createUserPermission(permission: Int,user: Int): UserPermission
  deleteUserPermission(id: Int,_id: String): UserPermission
  updateUserPermission(id: Int, user: Int,permission: Int,_id: String): UserPermission
`;
