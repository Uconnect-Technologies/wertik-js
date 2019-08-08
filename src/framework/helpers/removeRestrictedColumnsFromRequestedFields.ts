export default async function(columns, restricedColumns) {
  restricedColumns.forEach(async element => {
    delete columns[element];
  });
  return columns;
}
