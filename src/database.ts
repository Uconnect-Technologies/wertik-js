import { Sequelize } from 'sequelize'
import { databaseDefaultOptions } from './borrowed/options'
import get from 'lodash.get'
import { paginate } from './crud/index'
import { Store, WertikApp } from './types'
import { useDatabaseProps } from './types/database'

export const getAllRelationships = (dbName: string): string => {
  return `
    SELECT *
    FROM information_schema.KEY_COLUMN_USAGE
    WHERE CONSTRAINT_SCHEMA = '${dbName}'
      AND REFERENCED_TABLE_SCHEMA IS NOT NULL
      AND REFERENCED_TABLE_NAME IS NOT NULL
      AND REFERENCED_COLUMN_NAME IS NOT NULL
  `
}

export const useMysqlDatabase = function (obj: useDatabaseProps) {
  return async () => {
    try {
      const sequelize = new Sequelize(obj.name, obj.username, obj.password, {
        host: obj.host,
        dialect: 'mysql',
        logging: false,
        ...get(obj, 'options', {}),
        ...(databaseDefaultOptions as any).sql.dbInitializeOptions,
      })
      await sequelize.authenticate()
      console.log(`[DB] Succcessfully connected to database ${obj.name}`)
      ;(sequelize as any).relationships = await sequelize.query(
        getAllRelationships(obj.name)
      )
      return {
        credentials: obj,
        instance: sequelize,
      }
    } catch (e) {
      console.log(`[DB] Connecting failed to datbase ${obj.name}`)
      console.log(e.message)
    }
  }
}

/**
 * @deprecated use useMysqlDatabase, useDatabase is deprecated and will be removed in 3.5.0 version.
 */
export const useDatabase = useMysqlDatabase

export const applyRelationshipsFromStoreToDatabase = (
  store: Store,
  app: WertikApp
): void => {
  store.database.relationships.forEach((element: any) => {
    const currentTable = app.modules[element.currentModule].tableInstance
    const referencedTable = app.modules[element.referencedModule].tableInstance
    // element.type will be hasOne, hasMany, belongsTo or belongsToMany
    currentTable[element.type](referencedTable, element.options || {})
  })
}

export const applyRelationshipsFromStoreToGraphql = (
  store: Store,
  _app: WertikApp
): void => {
  store.database.relationships.forEach(
    (element: {
      type: string
      currentModule: string
      graphqlKey: string
      referencedModule: string
      options: any
    }) => {
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
          const currentModuleKey = element.options.foreignKey || 'id'

          if (!referencedModuleKey) {
            referencedModuleKey = 'id'
          }

          if (['hasOne', 'belongsTo'].includes(element.type)) {
            // eslint-disable-next-line
          return await tableInstance.findOne({
<<<<<<< HEAD
            where: {
              [currentModuleKey]: parent[referencedModuleKey],
            },
          })
        } else if (['hasMany', 'belongsToMany'].includes(element.type)) {
          return await paginate(
            {
=======
>>>>>>> 681bf23 (Fixing lint issues)
              where: {
                [currentModuleKey]: parent[referencedModuleKey],
              },
            })
          } else if (['hasMany', 'belongsToMany'].includes(element.type)) {
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
    }
  )
}
