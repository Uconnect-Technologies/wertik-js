import Model from "./../model/model";
export default function(dbTables, configuration) {
  let allTables = Object.keys(dbTables);
  let models = {};
  allTables.forEach(element => {
    models[element] = Model({
      dbTables: dbTables,
      tableName: element,
      configuration: configuration
    });
  });
  return models;
}
