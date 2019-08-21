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
        SELECT permissionTable.id        AS permission_id, 
          permissionTable.NAME           AS permission_name, 
          permissionTable.can            AS permission_can, 
          permissionTable.cant           AS permission_cant, 
          rolepermissionTable.id         AS rolepermission_id, 
          rolepermissionTable.role       AS rolepermission_role, 
          rolepermissionTable.permission AS rolepermission_permission, 
          rolepermissionTable.NAME       AS rolepermission_name, 
          userpermissionTable.id         AS userpermission_id, 
          userpermissionTable.USER       AS userpermission_user, 
          userpermissionTable.permission AS userpermission_permission, 
          roleTable.id                   AS role_id, 
          roleTable.NAME                 AS role_name, 
          userroleTable.id               AS userrole_id, 
          userroleTable.NAME             AS userrole_name, 
          userroleTable.USER             AS userrole_user, 
          userroleTable.role             AS userrole_role 
        FROM   permission AS permissionTable 
          LEFT JOIN rolepermission AS rolepermissionTable 
            ON permissionTable.id = rolepermissionTable.permission 
          LEFT JOIN userpermission AS userpermissionTable 
            ON permissionTable.id = userpermissionTable.permission 
          LEFT JOIN role AS roleTable 
            ON rolepermissionTable.role = roleTable.id 
          LEFT JOIN userrole AS userroleTable 
            ON userroleTable.id = rolepermissionTable.role 
        WHERE  userroleTable.USER = _________user_ID
          OR userpermissionTable.USER = _________user_ID 
    `;
    if (typeof id == "number") {
      sqlQuery = sqlQuery.replace(/_________user_ID/g, id + "");
      permissions = await database.query(sqlQuery, { type: database.QueryTypes.SELECT });
    }
  } else {
  }
  return permissions;
}
