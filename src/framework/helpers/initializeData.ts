export default {
  users: [
    {
      name: "master",
      username: "master",
      is_activated: true,
      is_super_user: true,
      email: "master@gmail.com",
      password: "password"
    }
  ],
  roles: [
    {
      name: "Administrator",
      has_full_rights: true,
      default_permissions: ""
    }
  ],
  userRoles: [],
  permissions: [],
  userPermissions: [],
  rolePermissions: []
};
