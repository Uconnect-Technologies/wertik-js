const sequelize = require("sequelize");

// mysql helpers

export const convertFieldsIntoSequelizeFields = (fields, relationships) => {
  if (relationships) {
    let relataionshipKeys = Object.keys(relationships).filter((c) => c);
    relataionshipKeys.forEach((relataionshipKeyName) => {
      let relationshipItem = relationships[relataionshipKeyName];
      fields[relationshipItem.graphqlName] = { type: "string" };
    });
    
  }
  let k = Object.keys(fields);
  k.forEach((element) => {
    const t = fields[element].type;
    fields[element].type = sequelize[t.toUpperCase()];
  });
  return fields;
};

export const deleteModel = () => {};

export const paginateModel = () => {};

export const updateModel = () => {};

export const viewModel = () => {};
