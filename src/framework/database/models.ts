import Model from "./../model/model"
export default function (dbTables) {
  let allTables = Object.keys(dbTables);
  let models2 = {};
  allTables.forEach(element => {
    models2[element] = Model({
      tableName: element,
      dbTables: dbTables,
    });
  });
  return models2;
}