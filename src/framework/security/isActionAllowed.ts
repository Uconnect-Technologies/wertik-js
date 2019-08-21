export default async function(permissions, name) {
  let filter = permissions.filter(c => {
    return c.permission_can.indexOf(name) > -1;
  });
  return filter.length > 0;
}
