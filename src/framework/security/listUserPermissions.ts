import connection from "./../database/connection";
import primaryKey from "../helpers/primaryKey";
import { get } from "lodash";
export default async function(props) {
  let permissions = [];
  let { database } = connection;
  let { dialect } = process.env;
  let id = get(props, primaryKey, null);
  if (dialect.toLocaleLowerCase() == "mysql") {
    let sqlQuery = `
      SELECT  permissionTable.id AS permission_id,
              permissionTable.name AS permission_name,
              permissionTable.can AS permission_can,
              permissionTable.cant AS permission_cant,
              rolepermissionTable.id as rolepermission_id,
              rolepermissionTable.role as rolepermission_role,
              rolepermissionTable.permission as rolepermission_permission,
              rolepermissionTable.name as rolepermission_name,
              userpermissionTable.id as userpermission_id,
              userpermissionTable.user as userpermission_user,
              userpermissionTable.permission as userpermission_permission,
              roleTable.id as role_id,
              roleTable.name as role_name,
              userroleTable.id as userrole_id,
              userroleTable.name as userrole_name,
              userroleTable.user as userrole_user,
              userroleTable.role as userrole_role
              
      FROM permission AS permissionTable
      LEFT JOIN rolepermission AS rolepermissionTable
          on permissionTable.id = rolepermissionTable.permission
        LEFT JOIN userpermission AS userpermissionTable
          on permissionTable.id = userpermissionTable.permission
        LEFT JOIN role as roleTable 
          on rolepermissionTable.role = roleTable.id
        LEFT JOIN userrole as userroleTable
          on userroleTable.id = rolepermissionTable.role
            
      WHERE userroleTable.user = 1 or userpermissionTable.user = 1
    `;
    if (typeof id == "number") {
      sqlQuery = sqlQuery.replace(/___user_id/g, id + "");
      permissions = await database.query(sqlQuery);
    }
  } else {
  }
  return permissions;
}
