export default async function(permissions, name) {
  let filter = permissions.filter(c => {
    console.log(c.permission_can);
    return c.permission_can.indexOf(name) > -1;
  });
  return filter.length > 0;
}
