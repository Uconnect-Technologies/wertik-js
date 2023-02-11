import get from "lodash.get"
import { paginate } from "../crud/index"
import { Store } from "../types"
import { WertikApp } from "../types"

export const applyRelationshipsFromStoreToDatabase = async (
  store: Store,
  app: WertikApp
) => {
  store.database.relationships.forEach((element) => {
    const currentTable = app.modules[element.currentModule].tableInstance
    const referencedTable = app.modules[element.referencedModule].tableInstance
    // element.type will be hasOne, hasMany, belongsTo or belongsToMany
    currentTable[element.type](referencedTable, element.options || {})
  })
}

export const applyRelationshipsFromStoreToGraphql = async (
  store: Store,
  _app: WertikApp
) => {
  store.database.relationships.forEach((element) => {
    const oldResolvers = get(
      store,
      `graphql.resolvers.${element.currentModule}`,
      {}
    )

    store.graphql.resolvers[element.currentModule] = {
      ...oldResolvers,
      [element.graphqlKey]: async (parent, _args, context) => {
        const tableInstance =
          context.wertik.modules[element.referencedModule].tableInstance
        let referencedModuleKey =
          element.options.sourceKey || element.options.targetKey
        let currentModuleKey = element.options.foreignKey || "id"

        if (!referencedModuleKey) {
          referencedModuleKey = "id"
        }

        if (["hasOne", "belongsTo"].includes(element.type)) {
          return await tableInstance.findOne({
            where: {
              [currentModuleKey]: parent[referencedModuleKey],
            },
          })
        } else if (["hasMany", "belongsToMany"]) {
          return await paginate(
            {
              where: {
                [currentModuleKey]: parent[referencedModuleKey],
              },
            },
            tableInstance
          )
        }
      },
    }
  })
}
