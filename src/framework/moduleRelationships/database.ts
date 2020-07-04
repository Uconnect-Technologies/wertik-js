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
  // If moduel has relatioship
  if (relationships) {
    Object.keys(relationships).forEach((key) => {
      let currentModel = tables[module.name];
      let otherModel = tables[key];
      let relationshipInfo = relationships[key];
      if (relationshipInfo.type == "hasMany") {
        if (dbDialect === "postgres" || dbDialect === "mysql") {
          currentModel.hasMany(otherModel, {
            foreignKey: relationshipInfo.foreignKey,
          });
        }
      }else if (relationshipInfo.type == "hasOne") {
        if (dbDialect === "postgres" || dbDialect === "mysql") {
          currentModel.hasOne(otherModel, {
            foreignKey: relationshipInfo.foreignKey,
          });
        }
      }
    });
  }
};
