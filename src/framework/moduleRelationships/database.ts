import { get } from "lodash";
import { IConfigurationCustomModule } from "../types/configuration";

export const applyRelationshipSql = (
  module: IConfigurationCustomModule,
  tables: {
    [key: string]: any;
  }
) => {
  let relationships = get(module, "database.relationships", null);
  if (relationships) {
    const oneToOne = get(relationships, "oneToOne", {});
    const oneToMany = get(relationships, "oneToMany", {});
    const belongsTo = get(relationships, "belongsTo", {});
    const currentModel = tables[module.name];
    Object.keys(oneToMany).forEach((key) => {
      const foreignModel = tables[key]
      const relationshipInfo = oneToMany[key];
      if (relationshipInfo.constructor === Array) {
        relationshipInfo.forEach(relationshipInfoItem => {
          currentModel.hasMany(foreignModel, {
            as: relationshipInfoItem.graphqlName,
            foreignKey: relationshipInfoItem.foreignKey,
            sourceKey: relationshipInfoItem.relationColumn,
            ...get(relationshipInfoItem,'options',{})
          });
        });
      } else {
        currentModel.hasMany(foreignModel, {
          as: relationshipInfo.graphqlName,
          foreignKey: relationshipInfo.foreignKey,
          sourceKey: relationshipInfo.relationColumn,
          ...get(relationshipInfo,'options',{})
        });
      }
    });
    Object.keys(oneToOne).forEach((key) => {
      const foreignModel = tables[key]
      const relationshipInfo = oneToOne[key];
      if (relationshipInfo.constructor === Array) {
        relationshipInfo.forEach(relationshipInfoItem => {
          currentModel.belongsTo(foreignModel, {
            as: relationshipInfoItem.graphqlName,
            foreignKey: relationshipInfoItem.foreignKey,
            sourceKey: relationshipInfoItem.relationColumn,
            ...get(relationshipInfoItem,'options',{})
          });
        });
      } else {
        currentModel.belongsTo(foreignModel, {
          as: relationshipInfo.graphqlName,
          foreignKey: relationshipInfo.foreignKey,
          sourceKey: relationshipInfo.relationColumn,
          ...get(relationshipInfo,'options',{})
        });
      }
    });
  }
}
