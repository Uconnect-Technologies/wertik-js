import { Sequelize } from "sequelize";
import { databaseDefaultOptions } from "../framework/defaults/options";
import { get } from "lodash";
import { paginate } from "./crud/index";
import { Store } from "./types";
import { WertikApp } from "./types";
import { useDatabaseProps } from "./types/database";
import { errorMessage } from "../framework/logger/consoleMessages";

export const getAllMysqlRelationships = (dbName: String) => {
  return `
    SELECT *
    FROM information_schema.KEY_COLUMN_USAGE
    WHERE CONSTRAINT_SCHEMA = '${dbName}'
      AND REFERENCED_TABLE_SCHEMA IS NOT NULL
      AND REFERENCED_TABLE_NAME IS NOT NULL
      AND REFERENCED_COLUMN_NAME IS NOT NULL
  `;
};

export const getAllPostgresRelationships = (dbName: String) => {
  return `
    SELECT *
    FROM information_schema.KEY_COLUMN_USAGE
    WHERE CONSTRAINT_SCHEMA = '${dbName}'
      AND TABLE_SCHEMA IS NOT NULL
      AND TABLE_NAME IS NOT NULL
      AND COLUMN_NAME IS NOT NULL
  `;
};

/**
 *
 * @param obj
 * @returns
 * deprecated
 */

export const useDatabase = function (obj: useDatabaseProps) {
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
      getAllMysqlRelationships(obj.name)
    );
    console.log(`[DB] Succcessfully connected to mysql database ${obj.name}`);
    return {
      credentials: obj,
      instance: sequelize,
    };
  };
};

export const useMysqlDatabase = (obj: useDatabaseProps) => {
  return useDatabase(obj);
};

export const usePostgresDatabase = function (obj: useDatabaseProps) {
  return async () => {
    let sequelize = new Sequelize(obj.name, obj.username, obj.password, {
      host: obj.host,
      dialect: "postgres",
      logging: false,
      ...get(obj, "options", {}),
      ...databaseDefaultOptions.sql.dbInitializeOptions,
    });
    await sequelize.authenticate().catch((err) => {
      throw new errorMessage(err);
    });

    (sequelize as any).relationships = await sequelize.query(
      getAllPostgresRelationships(obj.name)
    );

    console.log(
      `[DB] Succcessfully connected to postgres database ${obj.name}`
    );
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
