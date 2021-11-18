import { Sequelize } from "sequelize";
import { databaseDefaultOptions } from "../framework/defaults/options";
import { get } from "lodash";
import { paginate } from "./crud/index";
import { Store, UseDatabaseProps } from "./types/types.v2";
import { WertikApp } from "./types/types.v2";

export const getAllRelationships = (dbName: String) => {
  return `
    SELECT *
    FROM information_schema.KEY_COLUMN_USAGE
    WHERE CONSTRAINT_SCHEMA = '${dbName}'
      AND REFERENCED_TABLE_SCHEMA IS NOT NULL
      AND REFERENCED_TABLE_NAME IS NOT NULL
      AND REFERENCED_COLUMN_NAME IS NOT NULL
  `;
};

export const useDatabase = function (obj: UseDatabaseProps) {
  return async () => {
    let sequelize = new Sequelize(obj.name, obj.username, obj.password, {
      host: obj.host,
      dialect: "mysql",
      logging: false,
      ...get(obj, "options", {}),
      ...(databaseDefaultOptions as any).sql.dbInitializeOptions,
    });
    await sequelize.authenticate().catch((err) => {
      throw new Error(err);
    });
    (sequelize as any).relationships = await sequelize.query(
      getAllRelationships(obj.name)
    );
    console.log(`[DB] Succcessfully connected to database ${obj.name}`);
    return {
      credentials: obj,
      instance: sequelize,
    };
  };
};

export const applyRelationshipsFromStoreToDatabase = async (
  store: Store,
  app: WertikApp
) => {
  store.database.relationships.forEach((element) => {
    const currentTable = app.modules[element.currentModule].tableInstance;
    const referencedTable = app.modules[element.referencedModule].tableInstance;
    // element.type willbe hasOne, hasMany, belongsTo or belongsToMany
    currentTable[element.type](referencedTable, element.options || {});
  });
};

export const applyRelationshipsFromStoreToGraphql = async (
  store: Store,
  _app: WertikApp
) => {
  store.database.relationships.forEach((element) => {
    const oldResolvers = get(
      store,
      `graphql.resolvers.${element.currentModule}`,
      {}
    );

    store.graphql.resolvers[element.currentModule] = {
      ...oldResolvers,
      [element.graphqlKey]: async (parent, args, context) => {
        const tableInstance =
          context.wertik.modules[element.referencedModule].tableInstance;
        let referencedModuleKey =
          element.options.sourceKey || element.options.targetKey;
        let currentModuleKey = element.options.foreignKey || "id";

        if (!referencedModuleKey) {
          referencedModuleKey = "id";
        }

        if (["hasOne", "belongsTo"].includes(element.type)) {
          return await tableInstance.findOne({
            where: {
              [currentModuleKey]: parent[referencedModuleKey],
            },
          });
        } else if (["hasMany", "belongsToMany"]) {
          return await paginate(
            {
              where: {
                [currentModuleKey]: parent[referencedModuleKey],
              },
            },
            tableInstance
          );
        }
      },
    };
  });
};
