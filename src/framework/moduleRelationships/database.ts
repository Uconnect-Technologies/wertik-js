import { get } from "lodash";
import { IConfigurationCustomModule } from "../types/configuration";

export const applyRelationship = (
  module: IConfigurationCustomModule,
  tables: {
    [key: string]: any;
  }
) => {

  let dbDialect = process.env.dbDialect;
  let relationships = get(module, "database.relationships", null);

  const processRelationship = (obj: any) => {
    const { key, type, relationshipInfo } = obj;
    const foreignModel = tables[key];
    const currentModel = tables[module.name];
    if (type === "oneToMany") {
      currentModel.hasMany(foreignModel, {
        foreignKey: relationshipInfo.foreignKey,
      });
    }else {
      currentModel.hasOne(foreignModel, {
        as: relationshipInfo.relationColumn,
        foreignKey: relationshipInfo.foreignKey,
      });
    }
  };

  // If module has relatioship
  if (relationships) {
    const oneToOne = get(relationships, "oneToOne", {});
    const oneToMany = get(relationships, "oneToMany", {});
    Object.keys(oneToMany).forEach((key) => {
      processRelationship({
        key: key,
        relationshipInfo: oneToMany[key],
        type: "oneToMany",
      });
    });
  }
};

// Object.keys(relationships).forEach((key) => {
//   let currentModel = tables[module.name];
//   let otherModel = tables[key];
//   let relationshipInfo = relationships[key];
//   if (relationshipInfo.type == "hasMany") {
//     if (dbDialect === "postgres" || dbDialect === "mysql") {
//       currentModel.hasMany(otherModel, {
//         foreignKey: relationshipInfo.foreignKey,
//       });
//     }
//   } else if (relationshipInfo.type == "hasOne") {
//     if (dbDialect === "postgres" || dbDialect === "mysql") {
//       currentModel.hasOne(otherModel, {
//         foreignKey: relationshipInfo.foreignKey,
//       });
//     }
//   }
// });
