import { Sequelize } from "sequelize";

export const getAllRelationships = () => {
  return `
    SELECT TABLE_NAME,
      COLUMN_NAME,
      REFERENCED_TABLE_NAME,
      REFERENCED_COLUMN_NAME
    FROM information_schema.KEY_COLUMN_USAGE
    WHERE CONSTRAINT_SCHEMA = 'jscontainer'
      AND REFERENCED_TABLE_SCHEMA IS NOT NULL
      AND REFERENCED_TABLE_NAME IS NOT NULL
      AND REFERENCED_COLUMN_NAME IS NOT NULL
  `;
};

export const useDatabase = async function (obj: any) {
  const sequelize = new Sequelize(obj.name, obj.username, obj.password, {
    host: obj.host,
    dialect: "mysql",
    logging: false,
  });
  try {
    await sequelize.authenticate();
    console.log(`[DB] Succcessfully connected to database ${obj.name}`);
  } catch (e) {
    throw new Error(`[DB] Error connecting to database ${obj.name}`);
  }
  return {
    instance: sequelize,
  };
};
