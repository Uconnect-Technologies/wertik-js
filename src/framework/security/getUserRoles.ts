export default async function (userId, database) {
  let sqlQuery = `SELECT  r.*, ur.id as ur_id, 
      ur.name as ur_name, 
      ur.created_at as ur_created_at, 
      ur.updated_at as ur_updated_at, 
      ur.deleted_at as ur_deleted_at,
      ur.role as ur_role,
      ur.user as ur_user
      
    from user_role as ur 
    left JOIN role as r on r.id = ur.role 
    where ur.user = _________user_ID`;
  sqlQuery = sqlQuery.replace(/_________user_ID/g, userId + "");
  const roles = await database.query(sqlQuery, {
    type: database.QueryTypes.SELECT,
  });
  return roles;
}
