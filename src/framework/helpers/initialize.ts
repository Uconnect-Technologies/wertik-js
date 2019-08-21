import { get } from "lodash";
import initializeData from "./initializeData";
import primaryKey from "./primaryKey";
export default async function(props = {}) {
  /*
    This function will be used to initialize some data to the database so the app can be use
  */
  let users = get(props, "users", initializeData.users);
  let roles = get(props, "roles", initializeData.roles);
  let userRoles = get(props, "userRoles", initializeData.userRoles);
  let permissions = get(props, "permissions", initializeData.permissions);
  let userPermissions = get(props, "userPermissions", initializeData.userPermissions);
  let rolePermissions = get(props, "rolePermissions", initializeData.rolePermissions);
}
