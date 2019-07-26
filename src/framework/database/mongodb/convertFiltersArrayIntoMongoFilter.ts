export default async function(filters: any) {
  let c: any = {};
  filters.forEach((a: any) => {
    c[a.column] = a.value;
  });
  return c;
}
