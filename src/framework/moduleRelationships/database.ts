import { get } from "lodash"
import { IConfigurationCustomModule } from "../types/configuration"

export const applyRelationshipSql = (
  module: IConfigurationCustomModule,
  tables: {
    [key: string]: any
  }
) => {
  let relationships = get(module, "database.relationships", null)
  if (relationships) {
    const oneToOne = get(relationships, "oneToOne", {})
    const oneToMany = get(relationships, "oneToMany", {})
    const belongsTo = get(relationships, "belongsTo", {})
    const currentModel = tables[module.name]

    Object.keys(belongsTo).forEach((key) => {
      const foreignModel = tables[key]
      const relationshipInfo = belongsTo[key]
      if (relationshipInfo.constructor === Array) {
        relationshipInfo.forEach((relationshipInfoItem) => {
          currentModel.belongsTo(foreignModel, {
            as: relationshipInfoItem.as,
            foreignKey: relationshipInfoItem.foreignKey,
            sourceKey: relationshipInfoItem.sourceKey,
            ...get(relationshipInfoItem, "options", {}),
          })
        })
      } else {
        currentModel.belongsTo(foreignModel, {
          as: relationshipInfo.as,
          foreignKey: relationshipInfo.foreignKey,
          sourceKey: relationshipInfo.sourceKey,
          ...get(relationshipInfo, "options", {}),
        })
      }
    })

    Object.keys(oneToMany).forEach((key) => {
      const foreignModel = tables[key]
      const relationshipInfo = oneToMany[key]
      if (relationshipInfo.constructor === Array) {
        relationshipInfo.forEach((relationshipInfoItem) => {
          currentModel.hasMany(foreignModel, {
            as: relationshipInfoItem.as,
            foreignKey: relationshipInfoItem.foreignKey,
            sourceKey: relationshipInfoItem.sourceKey,
            ...get(relationshipInfoItem, "options", {}),
          })
        })
      } else {
        currentModel.hasMany(foreignModel, {
          as: relationshipInfo.as,
          foreignKey: relationshipInfo.foreignKey,
          sourceKey: relationshipInfo.sourceKey,
          ...get(relationshipInfo, "options", {}),
        })
      }
    })

    Object.keys(oneToOne).forEach((key) => {
      const foreignModel = tables[key]
      const relationshipInfo = oneToOne[key]
      if (relationshipInfo.constructor === Array) {
        relationshipInfo.forEach((relationshipInfoItem) => {
          currentModel.hasOne(foreignModel, {
            as: relationshipInfoItem.as,
            foreignKey: relationshipInfoItem.foreignKey,
            sourceKey: relationshipInfoItem.sourceKey,
            ...get(relationshipInfoItem, "options", {}),
          })
        })
      } else {
        currentModel.hasOne(foreignModel, {
          as: relationshipInfo.as,
          foreignKey: relationshipInfo.foreignKey,
          sourceKey: relationshipInfo.sourceKey,
          ...get(relationshipInfo, "options", {}),
        })
      }
    })
  }
}
