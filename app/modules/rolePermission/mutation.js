export default `
  createRolePermission(role: Int,permission: Int): RolePermission
  deleteRolePermission(id: Int,_id: String): RolePermission
  updateRolePermission(id: Int, role: Int,permission: Int,_id: String): RolePermission
`;
