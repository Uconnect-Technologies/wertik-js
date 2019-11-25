import Model2 from "./../model/model2"
export default function (dbTables) {
  let allTables = Object.keys(dbTables);
  let models2 = {};
  allTables.forEach(element => {
    models2[element] = Model2({
      tableName: element,
      dbTables: dbTables,
    });
  });
  return models2;
}