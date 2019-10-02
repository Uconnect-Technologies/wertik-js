import Model from "./../model/model"
export default function (dbTables) {
  let allTables = Object.keys(dbTables);
  let models = {};
  allTables.forEach(element => {
    models[element] = new Model({
      model: dbTables[element],
      tableName: element
    });
  });
  return models;
}